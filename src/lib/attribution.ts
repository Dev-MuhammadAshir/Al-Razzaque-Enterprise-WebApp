import { AttributionData } from '../types';

const ATTRIBUTION_STORAGE_KEY = "al_razzaque_attribution_data";

export function captureInitialAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || undefined;
    const utmMedium = urlParams.get("utm_medium") || undefined;
    const utmCampaign = urlParams.get("utm_campaign") || undefined;
    const utmContent = urlParams.get("utm_content") || undefined;
    const utmTerm = urlParams.get("utm_term") || undefined;
    const referrer = document.referrer ? new URL(document.referrer).hostname : "Direct";

    let detectedSource = utmSource;
    if (!detectedSource) {
      if (document.referrer.includes("google.")) detectedSource = "Organic Search (Google)";
      else if (document.referrer.includes("instagram.")) detectedSource = "Instagram";
      else if (document.referrer.includes("facebook.")) detectedSource = "Facebook";
      else if (document.referrer.includes("whatsapp")) detectedSource = "WhatsApp";
      else if (document.referrer) detectedSource = `Referral (${referrer})`;
      else detectedSource = "Direct / Bookmark";
    }

    const attribution: AttributionData = {
      utm_source: detectedSource,
      utm_medium: utmMedium || (urlParams.get("gclid") ? "cpc" : "none"),
      utm_campaign: utmCampaign || (urlParams.get("gclid") ? "google_ads" : undefined),
      utm_content: utmContent,
      utm_term: utmTerm,
      referrer: document.referrer || "Direct",
      landing_page: window.location.pathname
    };

    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return { utm_source: "Direct" };
  }
}

export const captureAttributionFromUrl = captureInitialAttribution;

export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const data = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return data ? JSON.parse(data) : captureInitialAttribution();
  } catch {
    return {};
  }
}
