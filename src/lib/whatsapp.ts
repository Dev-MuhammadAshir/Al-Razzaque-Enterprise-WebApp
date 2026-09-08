import { getBusinessConfig } from '../data/business';

interface WhatsAppOptions {
  message?: string;
  productName?: string;
  packSize?: string;
  quantity?: string;
  businessType?: string;
  leadContext?: string;
}

export interface WhatsAppResult {
  isConfigured: boolean;
  phone: string;
  url: string;
  formattedDisplay: string;
  rawMessage: string;
}

export function getWhatsAppAction(options: WhatsAppOptions = {}): WhatsAppResult {
  const business = getBusinessConfig();
  const phone = (business.whatsapp || "").replace(/[^0-9]/g, "");
  const isConfigured = Boolean(phone && phone.length >= 8);

  let messageText = options.message || business.defaultWhatsAppMessage;

  if (options.productName) {
    messageText = `Hello Al Razzaque Enterprise, I am inquiring about *${options.productName}*`;
    if (options.packSize) {
      messageText += ` (Pack size: ${options.packSize})`;
    }
    if (options.quantity) {
      messageText += ` for an estimated quantity of *${options.quantity}*`;
    }
    if (options.businessType) {
      messageText += `. My business type is *${options.businessType}*`;
    }
    messageText += `. Please share availability, current wholesale rates, and delivery details.`;
  }

  const encodedMessage = encodeURIComponent(messageText);
  const url = isConfigured ? `https://wa.me/${phone}?text=${encodedMessage}` : "#whatsapp-unconfigured";

  return {
    isConfigured,
    phone: business.whatsapp,
    url,
    formattedDisplay: business.whatsapp || "WhatsApp Pending Setup",
    rawMessage: messageText
  };
}

export function getPhoneAction() {
  const business = getBusinessConfig();
  const phone = (business.phone || "").replace(/[^0-9+]/g, "");
  const isConfigured = Boolean(phone && phone.length >= 7);

  return {
    isConfigured,
    phone: business.phone,
    url: isConfigured ? `tel:${phone}` : "#phone-unconfigured",
    formattedDisplay: business.phone || "Phone Pending Setup"
  };
}
