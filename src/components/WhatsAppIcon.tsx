import React from 'react';

interface WhatsAppIconProps {
  className?: string;
}

export function WhatsAppIcon({ className = '' }: WhatsAppIconProps) {
  return <img src="/whatsapp.png" alt="" aria-hidden="true" className={className} />;
}
