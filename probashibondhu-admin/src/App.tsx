import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Reports } from "./pages/Reports";
import { Agents } from "./pages/Agents";
import { AgentList } from "./pages/AgentList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/enrolled-policies" element={<Reports />} />
          <Route path="reports/draft-policies" element={<Reports />} />
          <Route path="reports/submitted-claims" element={<Reports />} />
          <Route path="reports/settled-claims" element={<Reports />} />
          <Route path="reports/pending-claims" element={<Reports />} />
          <Route path="reports/regretted-claims" element={<Reports />} />
          <Route path="agents" element={<Agents />} />
          <Route path="/admin/agent-list" element={<AgentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
