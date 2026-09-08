import { InquiryLead, BusinessType } from '../types';
import { trackEvent } from './analytics';
import { getStoredAttribution } from './attribution';

const LEADS_STORAGE_KEY = 'al_razzaque_leads_vault';
const LAST_SUBMISSION_TIME_KEY = 'al_razzaque_last_lead_time';

export interface LeadSubmissionInput {
  name: string;
  businessName: string;
  businessType: BusinessType;
  phone: string;
  city: string;
  productSlug: string;
  productName: string;
  packSize: string;
  estimatedQuantity: string;
  message: string;
  honeypot?: string; // spam protection
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadForm(input: LeadSubmissionInput): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot spam test
  if (input.honeypot) {
    errors.honeypot = 'Automated submission detected.';
    return { isValid: false, errors };
  }

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please provide your full contact name (min 2 characters).';
  }

  if (!input.businessName || input.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your business, shop, or mart name.';
  }

  if (!input.phone || input.phone.trim().replace(/[^0-9]/g, '').length < 8) {
    errors.phone = 'Please provide a valid phone or WhatsApp number (min 8 digits).';
  }

  if (!input.city || input.city.trim().length < 2) {
    errors.city = 'Please indicate your city or commercial delivery location.';
  }

  if (!input.productSlug) {
    errors.productSlug = 'Please select the wheat product you are interested in.';
  }

  if (!input.estimatedQuantity || input.estimatedQuantity.trim().length === 0) {
    errors.estimatedQuantity = 'Please specify an estimated volume or quantity (e.g. 50 bags, 2 tons).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export async function submitInquiryLead(input: LeadSubmissionInput): Promise<{
  success: boolean;
  lead?: InquiryLead;
  error?: string;
}> {
  // 1. Client validation
  const validation = validateLeadForm(input);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return { success: false, error: firstError };
  }

  // 2. Duplicate submission prevention (60 seconds per device)
  if (typeof window !== 'undefined') {
    const lastSub = sessionStorage.getItem(LAST_SUBMISSION_TIME_KEY);
    const now = Date.now();
    if (lastSub && now - parseInt(lastSub, 10) < 15000) {
      return {
        success: false,
        error: 'A duplicate inquiry was recently received. Please wait 15 seconds or message via WhatsApp directly.'
      };
    }
  }

  const attribution = getStoredAttribution();

  const newLead: InquiryLead = {
    id: 'LEAD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    createdAt: new Date().toISOString(),
    name: input.name.trim(),
    businessName: input.businessName.trim(),
    businessType: input.businessType,
    phone: input.phone.trim(),
    city: input.city.trim(),
    productSlug: input.productSlug,
    productName: input.productName,
    packSize: input.packSize || 'Any / Standard',
    estimatedQuantity: input.estimatedQuantity.trim(),
    message: input.message ? input.message.trim() : '',
    attribution,
    status: 'new'
  };

  // 3. Persist to Lead Vault (localStorage)
  try {
    if (typeof window !== 'undefined') {
      const existing = getStoredLeads();
      existing.unshift(newLead);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing));
      sessionStorage.setItem(LAST_SUBMISSION_TIME_KEY, Date.now().toString());
      window.dispatchEvent(new CustomEvent('al-razzaque-lead-saved', { detail: newLead }));
    }
  } catch (err) {
    console.error('Lead storage warning:', err);
  }

  // 4. Fire Primary Conversion Event
  trackEvent('submit_bulk_inquiry', {
    product: newLead.productSlug,
    customer_type: newLead.businessType,
    pack_size: newLead.packSize,
    quantity: newLead.estimatedQuantity,
    city: newLead.city
  });

  return { success: true, lead: newLead };
}

export function getStoredLeads(): InquiryLead[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(LEADS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function updateLeadStatus(id: string, status: InquiryLead['status']): void {
  if (typeof window === 'undefined') return;
  const leads = getStoredLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event('al-razzaque-lead-updated'));
  }
}

export function clearStoredLeads(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEADS_STORAGE_KEY);
  window.dispatchEvent(new Event('al-razzaque-lead-updated'));
}

export function exportLeadsAsCSV(): string {
  const leads = getStoredLeads();
  if (leads.length === 0) return '';

  const headers = ['Lead ID', 'Created At', 'Name', 'Business Name', 'Type', 'Phone', 'City', 'Product', 'Pack Size', 'Quantity', 'Status', 'Source', 'Campaign'];
  const rows = leads.map((l) => [
    l.id,
    l.createdAt,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.businessName.replace(/"/g, '""')}"`,
    l.businessType,
    `"${l.phone}"`,
    `"${l.city.replace(/"/g, '""')}"`,
    `"${l.productName.replace(/"/g, '""')}"`,
    `"${l.packSize}"`,
    `"${l.estimatedQuantity.replace(/"/g, '""')}"`,
    l.status,
    `"${l.attribution?.utm_source || 'Direct'}"`,
    `"${l.attribution?.utm_campaign || ''}"`
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
