import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, Math.min(page - 3, totalPages - 5)),
    Math.max(0, Math.min(page - 3, totalPages - 5)) + 5
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-100 px-1 pt-4 sm:flex-row">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-ink-200 bg-white px-2 py-1.5 font-num text-ink-700 focus:border-brand-400 focus:outline-none"
        >
          {[10, 25, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span>
          of {totalItems} entries
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 text-ink-500 disabled:opacity-40 hover:bg-ink-50"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-8 items-center gap-1 rounded-lg border border-ink-200 px-2.5 text-sm text-ink-600 disabled:opacity-40 hover:bg-ink-50"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg font-num text-sm font-semibold transition-colors ${
              p === page
                ? "bg-brand-500 text-white"
                : "text-ink-600 hover:bg-ink-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-8 items-center gap-1 rounded-lg border border-ink-200 px-2.5 text-sm text-ink-600 disabled:opacity-40 hover:bg-ink-50"
        >
          Next <ChevronRight size={14} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 text-ink-500 disabled:opacity-40 hover:bg-ink-50"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}
