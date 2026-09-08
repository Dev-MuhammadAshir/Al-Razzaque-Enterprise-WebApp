import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Settings, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBusinessConfig } from '../data/business';
import { InquiryForm } from '../components/InquiryForm';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';

interface ContactViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenConfig }) => {
  const [business, setBusiness] = useState(getBusinessConfig());

  useEffect(() => {
    const handleConfigChange = () => setBusiness(getBusinessConfig());
    window.addEventListener('business-config-updated', handleConfigChange);
    return () => window.removeEventListener('business-config-updated', handleConfigChange);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us', url: '/contact' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Inquiry &amp; Sales Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
          Contact Al Razzaque Enterprise
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Reach our commercial sales desk for current wheat flour rates, order scheduling, and dispatch coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-6 text-sm text-stone-700">
            <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
              Direct Communication Channels
            </h2>

            {/* WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Official WhatsApp Desk
                </span>
                {business.whatsapp ? (
                  <span className="font-bold text-base text-stone-900">{business.whatsapp}</span>
                ) : (
                  <span className="text-xs text-stone-500 italic">Configuration placeholder</span>
                )}
                <div className="mt-2">
                  <WhatsAppButton
                    label="Message WhatsApp"
                    size="sm"
                    variant="primary"
                    onOpenConfig={onOpenConfig}
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Direct Phone Call
                </span>
                {business.phone ? (
                  <a href={`tel:${business.phone}`} className="font-bold text-base text-stone-900 hover:text-amber-700">
                    {business.phone}
                  </a>
                ) : (
                  <span className="text-xs text-stone-500 italic">Configuration placeholder</span>
                )}
                <div className="mt-2">
                  <PhoneButton label="Call Now" size="sm" variant="secondary" onOpenConfig={onOpenConfig} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-200 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Email Orders &amp; RFPs
                </span>
                {business.email ? (
                  <a href={`mailto:${business.email}`} className="font-semibold text-stone-900 hover:text-amber-700">
                    {business.email}
                  </a>
                ) : (
                  <span className="text-xs text-stone-500 italic">sales@alrazzaqueenterprise.com</span>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-200 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Commercial Dispatch Hub
                </span>
                <span className="text-stone-800 text-xs">
                  {business.address || "Commercial Grain Market / Wholesale Trading Hub"}
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
              <div className="w-9 h-9 rounded-lg bg-stone-200 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Operating &amp; Dispatch Hours
                </span>
                <span className="text-stone-800 text-xs block">
                  Monday – Saturday: 8:00 AM – 8:00 PM
                </span>
                <span className="text-stone-500 text-[11px]">
                  WhatsApp inquiries logged 24/7
                </span>
              </div>
            </div>
          </div>

          {/* Quick config access */}
          {onOpenConfig && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>Need to update verified contact details?</span>
              <button
                type="button"
                onClick={onOpenConfig}
                className="px-3 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700 flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Direct Lead Form */}
        <div className="lg:col-span-7">
          <InquiryForm
            title="Send Direct Trade Inquiry"
            subtitle="Fill out your requirements below. Our commercial sales manager will review your submission and provide quotation terms."
          />
        </div>
      </div>
    </div>
  );
};
