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

  const handleExcelDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Policy ID,Holder Name,Phone,Open Date,Duration"]
        .concat(
          filtered.map(
            (r) => `${r.policyId},${r.holderName},${r.phone},${r.openDate},${r.duration}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "enrolled_policies.csv";
    link.click();
  };

  return (
    <div className="space-y-5 p-6">
      {/* Table Section */}
      <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Policy ID
                </th>
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Policy Holder's Name
                </th>
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Phone Number
                </th>
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Policy Open Date
                </th>
                <th className="border border-gray-300 px-5 py-3.5 font-semibold">
                  Policy Duration
                </th>
                <th className="border border-gray-300 px-5 py-3.5 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paged.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="border border-gray-200 px-5 py-3.5">{row.policyId}</td>
                  <td className="border border-gray-200 px-5 py-3.5">{row.holderName}</td>
                  <td className="border border-gray-200 px-5 py-3.5">{row.phone}</td>
                  <td className="border border-gray-200 px-5 py-3.5">{row.openDate}</td>
                  <td className="border border-gray-200 px-5 py-3.5">{row.duration}</td>
                  <td className="border border-gray-200 px-5 py-3.5 text-right">
                    <button className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-1.5 text-sm font-semibold">
                      See Details <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-ink-400 px-5 py-10 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination + Excel Button */}
        <div className="border-t border-gray-300 px-5 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Show Entries (left aligned) */}
            <div className="text-ink-600 flex w-full items-center gap-2 text-sm">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="font-num text-ink-700 rounded-md border border-[#e10078] bg-white px-2.5 py-1.5 text-sm"
              >
                {[10, 25, 50].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span>Entries per page</span>
            </div>
            {/* Center Pagination */}
            <div className="flex items-center justify-center gap-3">
              {/* Previous Button */}
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-md bg-[#e10078] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold ${
                    p === page
                      ? "border-[#e10078] bg-[#e10078] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  } `}
                >
                  {p}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-md bg-[#e10078] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Download Excel (bottom-right) */}
            <div className="flex w-full justify-end">
              <button
                onClick={handleExcelDownload}
                className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
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
