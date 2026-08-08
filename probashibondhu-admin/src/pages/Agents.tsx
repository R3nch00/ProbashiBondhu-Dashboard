import { useMemo, useState } from "react";
import { Plus, Download } from "lucide-react";
import { SearchInput } from "../components/ui/SearchInput";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { agentRows } from "../data/mock";

export function Agents() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agentRows;
    return agentRows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5 p-6">
      {/* Search & Action Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl flex-1">
          <SearchInput
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Type in agent name, role, phone number etc"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            <Plus size={16} />
            Create Agent
          </button>
          <button className="hidden items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 sm:flex">
            <Download size={16} />
            Download Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-ink-600 text-white">
                <th className="px-5 py-3.5 font-semibold">Agent Name</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
                <th className="px-5 py-3.5 font-semibold">Phone Number</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-t border-ink-100 ${
                    i % 2 === 1 ? "bg-ink-50" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 font-medium text-ink-900">
                    {row.name}
                  </td>
                  <td className="px-5 py-3.5 text-ink-700">{row.role}</td>
                  <td className="px-5 py-3.5 font-num text-ink-700">
                    {row.phone}
                  </td>
                  <td className="px-5 py-3.5 font-num text-ink-700">
                    {row.email}
                  </td>
                  <td className="px-5 py-3.5">
                    {row.status === "active" ? (
                      <Badge tone="green">Active</Badge>
                    ) : (
                      <Badge tone="slate">Inactive</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-ink-100 px-5 py-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-ink-200 bg-white px-2 py-1.5 font-num text-sm text-ink-700"
              >
                {[10, 25, 50].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span>Entries per page</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-full font-num text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-brand-500 text-white"
                      : "border border-ink-200 text-ink-600 hover:bg-ink-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Agent Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New Agent"
      >
        <CreateAgentForm onDone={() => setCreateOpen(false)} />
      </Modal>
    </div>
  );
}

function CreateAgentForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onDone();
      }}
      className="space-y-4"
    >
      <Field label="Agent Name *">
        <input required className="input" placeholder="Full name" />
      </Field>
      <Field label="Role *">
        <select required className="input" defaultValue="">
          <option value="" disabled>
            Select role
          </option>
          <option>Senior Agent</option>
          <option>Agent</option>
          <option>Team Lead</option>
          <option>Junior Agent</option>
        </select>
      </Field>
      <Field label="Phone Number *">
        <input
          required
          className="input font-num"
          placeholder="01XXXXXXXXX"
        />
      </Field>
      <Field label="Email *">
        <input
          required
          type="email"
          className="input font-num"
          placeholder="agent@probashibondhu.com"
        />
      </Field>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onDone}
          className="flex-1 rounded-full border border-ink-200 py-3 text-sm font-semibold text-ink-600 hover:bg-ink-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-full bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-600">
        {label}
      </span>
      {children}
    </label>
  );
}
