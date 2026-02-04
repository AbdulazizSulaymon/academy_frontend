export type LeadData = Record<string, any> & {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  extraPhones?: string[];
};

export interface LeadStatus {
  id: string;
  title?: string | null;
  color?: string | null;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartnerUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  photo?: string | null;
  phone?: string | null;
}

export interface Partner {
  id: string;
  userId: string;
  referralCode?: string | null;
  isActive?: boolean;
  user?: PartnerUser | null;
}

export interface Lead {
  id: string;
  title?: string | null;
  leadStatusId?: string | null;
  leadStatus?: LeadStatus | null;
  data: LeadData;
  order: number;
  innerOrder: number;
  comment?: string | null;
  nextCallDate?: string | null;
  location?: string | null;
  statusUpdatedAt?: string | null;
  partnerId?: string | null;
  partner?: Partner | null;
  specialists?: Partner[];
  createdAt: string;
  updatedAt: string;
}

