import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <span className="text-ink-400 pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <Search size={18} />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-ink-200 text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-brand-100 w-full rounded-full border bg-white py-3 pr-11 pl-5 text-sm focus:ring-4 focus:outline-none"
      />
    </div>
  );
}
