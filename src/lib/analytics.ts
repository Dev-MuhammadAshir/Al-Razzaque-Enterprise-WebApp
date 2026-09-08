import { getStoredAttribution } from './attribution';

export type StandardAnalyticsEvent =
  | 'page_view'
  | 'view_product'
  | 'click_whatsapp'
  | 'click_phone'
  | 'start_bulk_inquiry'
  | 'submit_bulk_inquiry'
  | 'click_wholesale_cta';

export interface EventPayload {
  product?: string;
  page?: string;
  campaign_context?: string;
  customer_type?: string;
  pack_size?: string;
  quantity?: string;
  label?: string;
  is_primary_conversion?: boolean;
  [key: string]: any;
}

export interface TrackedLogEntry {
  id: string;
  timestamp: string;
  eventName: StandardAnalyticsEvent;
  payload: EventPayload;
  isPrimaryConversion: boolean;
}

// In-memory debug logs for the client analytics viewer
const analyticsLog: TrackedLogEntry[] = [];

// Primary conversions vs secondary engagement
const PRIMARY_CONVERSIONS: StandardAnalyticsEvent[] = [
  'submit_bulk_inquiry',
  'click_whatsapp',
  'click_phone'
];

export function trackEvent(eventName: StandardAnalyticsEvent, payload: EventPayload = {}): void {
  const isPrimary = PRIMARY_CONVERSIONS.includes(eventName);
  const attribution = getStoredAttribution();

  const enrichedPayload: EventPayload = {
    page: payload.page || (typeof window !== 'undefined' ? window.location.pathname : ''),
    timestamp: new Date().toISOString(),
    is_primary_conversion: isPrimary,
    ...attribution,
    ...payload
  };

  // 1. Dispatch to window.dataLayer for Google Tag Manager / GA4
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ...enrichedPayload
    });

    // 2. Dispatch to gtag if initialized
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, enrichedPayload);
    }

    // 3. Log to internal debug array
    const logEntry: TrackedLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      eventName,
      payload: enrichedPayload,
      isPrimaryConversion: isPrimary
    };
    analyticsLog.unshift(logEntry);
    if (analyticsLog.length > 50) analyticsLog.pop();

    // Trigger local event so debugger component can update in real-time
    window.dispatchEvent(new CustomEvent('al-razzaque-analytics-event', { detail: logEntry }));
  }

  // Developer console notice
  if (import.meta.env.DEV) {
    console.groupCollapsed(
      `%c[Analytics] ${isPrimary ? '🔥 PRIMARY CONVERSION' : '📊 Event'}: ${eventName}`,
      isPrimary ? 'color: #16a34a; font-weight: bold;' : 'color: #2563eb;'
    );
    console.log('Payload:', enrichedPayload);
    console.groupEnd();
  }
}

export function getAnalyticsLogs(): TrackedLogEntry[] {
  return [...analyticsLog];
}

export function clearAnalyticsLogs(): void {
  analyticsLog.length = 0;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('al-razzaque-analytics-cleared'));
  }
}
