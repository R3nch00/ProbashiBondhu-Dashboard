export interface DashboardStats {
  allEnrolledPolicies: number;
  totalPolicies: number;
  draftPolicies: number;
  selfEnroll: number;
  agentEnroll: number;
  collectedPremium: number;
  partnerServiceFee: number;
  submittedClaims: number;
  settledClaims: number;
  claimAmountPaid: number;
  pendingClaims: number;
  regrettedClaims: number;
}

export interface PolicyRow {
  id: string;
  policyId: string;
  holderName: string;
  phone: string;
  openDate: string;
  duration: string;
  status: "enrolled" | "draft";
}

export interface AgentRow {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
}

export interface ClaimRow {
  id: string;
  policyId: string;
  holderName: string;
  claimType: string;
  submittedDate: string;
  amount: number;
  status: "submitted" | "settled" | "pending" | "regretted";
}
