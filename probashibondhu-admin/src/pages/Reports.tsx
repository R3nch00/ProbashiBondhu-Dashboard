import { useMemo, useState } from "react";
import { Download, Eye } from "lucide-react";
import { policyRows } from "../data/mock";

export function Reports() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return policyRows;
    return policyRows.filter(
      (r) =>
        r.policyId.toLowerCase().includes(q) ||
        r.holderName.toLowerCase().includes(q) ||
        r.phone.includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5 p-6">
      {/* Search Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl flex-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center rounded-full bg-brand-500 px-6 text-white font-semibold text-sm">
              Search for
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Type in Policy ID, Policy Holder's Name, NID number etc"
              className="w-full rounded-full border-2 border-brand-300 bg-white py-3 pl-40 pr-5 text-sm text-ink-700 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
            />
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
          <Download size={16} />
          Download Excel
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-ink-600 text-white">
                <th className="px-5 py-3.5 font-semibold">Policy ID</th>
                <th className="px-5 py-3.5 font-semibold">
                  Policy Holder's Name
                </th>
                <th className="px-5 py-3.5 font-semibold">Phone Number</th>
                <th className="px-5 py-3.5 font-semibold">Policy Open Date</th>
                <th className="px-5 py-3.5 font-semibold">Policy Duration</th>
                <th className="px-5 py-3.5 font-semibold text-right">Action</th>
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
                  <td className="px-5 py-3.5 font-num font-medium text-ink-900">
                    {row.policyId}
                  </td>
                  <td className="px-5 py-3.5 text-ink-700">
                    {row.holderName}
                  </td>
                  <td className="px-5 py-3.5 font-num text-ink-700">
                    {row.phone}
                  </td>
                  <td className="px-5 py-3.5 font-num text-ink-700">
                    {row.openDate}
                  </td>
                  <td className="px-5 py-3.5 text-ink-700">
                    {row.duration}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                      See Details <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-ink-400">
                    No data found
                  </td>
                </tr>
              )}
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
    </div>
  );
}
