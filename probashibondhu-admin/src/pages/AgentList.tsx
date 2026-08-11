import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { agentRows } from "../data/agents";

export function AgentList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return agentRows;

    return agentRows.filter(
      (r) =>
        r.agentName.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.phone.includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExcelDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Agent Name,Role,Phone Number,Email,Status"]
        .concat(
          filtered.map(
            (r) => `${r.agentName},${r.role},${r.phone},${r.email},${r.status}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "agent_list.csv";
    link.click();
  };

  return (
    <div className="space-y-5 p-6">
      {/* Search */}
      <div className="flex overflow-hidden rounded-xl border border-[#e10078] bg-white shadow-sm">
        <div className="bg-[#e10078] px-10 py-2.5 text-xl font-medium text-white">
          Search for
        </div>

        <div className="flex flex-1 items-center justify-between px-4">
          <input
            type="text"
            placeholder="Type in Agent Name, Role, Phone Number etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none text-base outline-none"
          />

          <Search size={24} className="cursor-pointer text-[#e10078]" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-400 text-white">
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Agent Name
                </th>

                <th className="border border-gray-300 px-5 py-3.5 font-semibold">Role</th>

                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Phone Number
                </th>

                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Email
                </th>

                <th className="border border-gray-300 px-5 py-3.5 text-center font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {paged.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="border border-gray-200 px-5 py-3.5">{row.agentName}</td>

                  <td className="border border-gray-200 px-5 py-3.5">{row.role}</td>

                  <td className="border border-gray-200 px-5 py-3.5">{row.phone}</td>

                  <td className="border border-gray-200 px-5 py-3.5">{row.email}</td>

                  <td className="border border-gray-200 px-5 py-3.5 text-center">
                    <span
                      className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${
                        row.status === "Active" ? "bg-green-600" : "bg-red-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-400">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination + Download */}
        <div className="border-t border-gray-300 px-5 py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex w-full items-center gap-2 text-sm">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-md border border-[#e10078] bg-white px-2.5 py-1.5 text-sm"
              >
                {[10, 25, 50].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <span>Entries per page</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-md bg-[#e10078] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold ${
                    p === page
                      ? "border-[#e10078] bg-[#e10078] text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-md bg-[#e10078] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={handleExcelDownload}
                className="flex items-center gap-2 rounded-full bg-[#e10078] px-5 py-3 text-sm font-semibold text-white"
              >
                <Download size={16} />
                Download Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
