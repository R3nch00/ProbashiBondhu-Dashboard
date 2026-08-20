import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";

import { EnrolledPolicies } from "./pages/EnrolledPolicies";
import { DraftPolicies } from "./pages/DraftPolicies";
import { SubmittedClaims } from "./pages/SubmittedClaims";
import { SettledClaims } from "./pages/SettledClaims";
import { PendingClaims } from "./pages/PendingClaims";
import { RegrettedClaims } from "./pages/RegrettedClaims";

import { AgentList } from "./pages/AgentList";
import { CreateAgent } from "./pages/CreateAgent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports/enrolled-policies" element={<EnrolledPolicies />} />
          <Route path="reports/draft-policies" element={<DraftPolicies />} />
          <Route path="reports/submitted-claims" element={<SubmittedClaims />} />
          <Route path="reports/settled-claims" element={<SettledClaims />} />
          <Route path="reports/pending-claims" element={<PendingClaims />} />
          <Route path="reports/regretted-claims" element={<RegrettedClaims />} />

          <Route path="admin/agent-list" element={<AgentList />} />
          <Route path="admin/create-agent" element={<CreateAgent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
