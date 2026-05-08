export interface BillingInformation {
  tenant_id: string;
  status: string | null;
  plan_type: string | null;
  seats: number | null;
  billing_period: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
  payment_method_enabled: boolean;

  stripe_customer_id?: string | null;
  stripe_connect_account_id?: string | null;
  default_payment_method_brand?: string | null;
  default_payment_method_last4?: string | null;
  default_bank_name?: string | null;
  default_bank_last4?: string | null;
  payouts_enabled?: boolean;
  payments_enabled?: boolean;
}
