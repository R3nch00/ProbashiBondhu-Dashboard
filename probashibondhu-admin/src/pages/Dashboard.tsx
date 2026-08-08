import {
  ShieldCheck,
  FileText,
  MousePointerClick,
  UsersRound,
  Wallet,
  Handshake,
  ClipboardList,
  HeartHandshake,
  BadgeDollarSign,
  HourglassIcon,
  XCircle,
} from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { dashboardStats } from "../data/mock";

function bdt(n: number) {
  return `৳ ${n.toLocaleString("en-US")}`;
}

export function Dashboard() {
  const s = dashboardStats;

  return (
    <div className="space-y-8 p-6">
      {/* Policy Summary */}
      <section>
        <h2 className="text-ink-500 mb-4 text-sm font-bold tracking-wide uppercase">
          Policy Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="All Enrolled Policies"
            value={String(s.allEnrolledPolicies)}
            sub={`(Total ${s.totalPolicies})`}
            icon={ShieldCheck}
            accent="#16a34a"
            iconBg="#dcfce7"
            iconColor="#16a34a"
          />
          <StatCard
            label="Draft Policies"
            value={String(s.draftPolicies)}
            icon={FileText}
            accent="#d97706"
            iconBg="#fef3c7"
            iconColor="#d97706"
          />
          <StatCard
            label="Self-Enroll"
            value={String(s.selfEnroll)}
            icon={MousePointerClick}
            accent="#475569"
            iconBg="#f1f5f9"
            iconColor="#475569"
          />
          <StatCard
            label="Agent-Enroll"
            value={String(s.agentEnroll)}
            icon={UsersRound}
            accent="#4f46e5"
            iconBg="#e0e7ff"
            iconColor="#4f46e5"
          />
        </div>
      </section>

      {/* Financial Summary - Equal width cards */}
      <section>
        <h2 className="text-ink-500 mb-4 text-sm font-bold tracking-wide uppercase">
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Collected Premium"
            value={bdt(s.collectedPremium)}
            icon={Wallet}
            accent="#2563eb"
            iconBg="#dbeafe"
            iconColor="#2563eb"
          />
          <StatCard
            label="Partner Service Fee"
            value={bdt(s.partnerServiceFee)}
            icon={Handshake}
            accent="#a21caf"
            iconBg="#fae8ff"
            iconColor="#a21caf"
          />
        </div>
      </section>

      {/* Claims Summary - Equal width cards */}
      <section>
        <h2 className="text-ink-500 mb-4 text-sm font-bold tracking-wide uppercase">
          Claims Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Submitted Claims"
            value={String(s.submittedClaims)}
            icon={ClipboardList}
            accent="#57534e"
            iconBg="#f5f5f4"
            iconColor="#57534e"
          />
          <StatCard
            label="Settled Claims"
            value={String(s.settledClaims)}
            icon={HeartHandshake}
            accent="#0d9488"
            iconBg="#ccfbf1"
            iconColor="#0d9488"
          />
          <StatCard
            label="Claim Amount Paid"
            value={bdt(s.claimAmountPaid)}
            icon={BadgeDollarSign}
            accent="#1e3a5f"
            iconBg="#e0e7ef"
            iconColor="#1e3a5f"
          />
          <StatCard
            label="Pending Claims"
            value={String(s.pendingClaims)}
            icon={HourglassIcon}
            accent="#fb923c"
            iconBg="#ffedd5"
            iconColor="#ea580c"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Regretted Claims"
            value={String(s.regrettedClaims)}
            icon={XCircle}
            accent="#e11d48"
            iconBg="#ffe4e6"
            iconColor="#e11d48"
          />
        </div>
      </section>
    </div>
  );
}
