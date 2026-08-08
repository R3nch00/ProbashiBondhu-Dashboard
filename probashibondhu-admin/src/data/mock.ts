import type { AgentRow, ClaimRow, DashboardStats, PolicyRow } from "../types";

export const dashboardStats: DashboardStats = {
  allEnrolledPolicies: 25,
  totalPolicies: 94,
  draftPolicies: 6,
  selfEnroll: 5,
  agentEnroll: 20,
  collectedPremium: 110000,
  partnerServiceFee: 25000,
  submittedClaims: 3,
  settledClaims: 1,
  claimAmountPaid: 30000,
  pendingClaims: 2,
  regrettedClaims: 0,
};

const names = [
  "মোঃ আশিক মিয়া",
  "নার্গিস বেগম",
  "রফিকুল ইসলাম",
  "সালমা আক্তার",
  "আব্দুল করিম",
  "রোজিনা খাতুন",
  "শাহাজাহান আলী",
  "তাসলিমা বেগম",
  "জহিরুল হক",
  "মিনারা খাতুন",
  "কামাল হোসেন",
  "ফরিদা ইয়াসমিন",
];

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

export const policyRows: PolicyRow[] = Array.from({ length: 25 }, (_, i) => {
  const day = pad((i % 28) + 1);
  const month = pad(((i * 3) % 12) + 1);
  return {
    id: `pol-${i + 1}`,
    policyId: `PB-2025-${1000 + i}`,
    holderName: names[i % names.length],
    phone: `01${7 + (i % 3)}${String(10000000 + i * 137).slice(0, 8)}`,
    openDate: `${day}/${month}/২০২৫`,
    duration: i % 3 === 0 ? "৫ বছর" : i % 3 === 1 ? "৩ বছর" : "১ বছর",
    status: i % 6 === 0 ? "draft" : "enrolled",
  };
});

const roles = ["সিনিয়র এজেন্ট", "এজেন্ট", "টিম লিড", "জুনিয়র এজেন্ট"];

export const agentRows: AgentRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: `agt-${i + 1}`,
  name: names[(i + 3) % names.length],
  role: roles[i % roles.length],
  phone: `01${9 - (i % 3)}${String(20000000 + i * 219).slice(0, 8)}`,
  email: `agent${i + 1}@probashibondhu.com`,
  status: i % 9 === 8 ? "inactive" : "active",
}));

const claimStatuses: ClaimRow["status"][] = [
  "submitted",
  "settled",
  "pending",
  "regretted",
];

export const claimRows: ClaimRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `clm-${i + 1}`,
  policyId: `PB-2025-${1000 + i}`,
  holderName: names[(i + 5) % names.length],
  claimType: i % 3 === 0 ? "মৃত্যু দাবি" : i % 3 === 1 ? "হাসপাতালে ভর্তি" : "প্রতিবন্ধী",
  submittedDate: `${pad((i % 28) + 1)}/১০/২০২৫`,
  amount: 200000,
  status: claimStatuses[i % claimStatuses.length],
}));
