import React, { createContext, useContext } from 'react';
import type { BusinessAccount } from '../types.ts';
import MerchantVerificationBadge from './MerchantVerificationBadge.tsx';

export function isBusinessApproved(business?: BusinessAccount | null): boolean {
  if (!business) return false;
  return business.verificationStatus
    ? business.verificationStatus === 'approved'
    : !!business.verified;
}

const BusinessesContext = createContext<BusinessAccount[]>([]);

export function BusinessesProvider({
  businesses,
  children,
}: {
  businesses: BusinessAccount[];
  children: React.ReactNode;
}) {
  return <BusinessesContext.Provider value={businesses}>{children}</BusinessesContext.Provider>;
}

interface BusinessBadgeProps {
  businessId?: string;
  category: string;
  size?: 'xs' | 'sm' | 'md';
  unclaimedVerified?: boolean;
}

export function BusinessBadge({
  businessId,
  category,
  size = 'xs',
  unclaimedVerified = false,
}: BusinessBadgeProps) {
  const businesses = useContext(BusinessesContext);

  const show = businessId
    ? isBusinessApproved(businesses.find((b) => b.id === businessId))
    : unclaimedVerified;

  if (!show) return null;
  return <MerchantVerificationBadge category={category} size={size} />;
}
