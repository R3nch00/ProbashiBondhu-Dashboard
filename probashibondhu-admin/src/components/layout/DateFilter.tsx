import { Calendar } from "lucide-react";
import React, { useRef, useState } from "react";

export function DateFilter() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fromPickerRef = useRef<HTMLInputElement>(null);
  const toPickerRef = useRef<HTMLInputElement>(null);

  const handleDateInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "");
      if (input.length > 8) input = input.slice(0, 8);
      let formatted = "";
      if (input.length > 0) {
        let day = input.slice(0, 2);
        if (parseInt(day, 10) > 31) day = "31";
        formatted = day;
      }
      if (input.length >= 3) {
        let month = input.slice(2, 4);
        if (parseInt(month, 10) > 12) month = "12";
        formatted += "/" + month;
      }
      if (input.length >= 5) {
        const year = input.slice(4, 8);
        formatted += "/" + year;
      }
      setter(formatted);
    };

  const parseToNativeDate = (dateStr: string) => {
    if (dateStr.length !== 10) return "";
    const [day, month, year] = dateStr.split("/");
    if (day && month && year && year.length === 4) {
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const handlePickerChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!val) return;
      const [year, month, day] = val.split("-");
      if (year && year.length <= 4) {
        setter(`${day}/${month}/${year}`);
      }
    };

  const openCalendar = (ref: React.RefObject<HTMLInputElement | null>) => {
    const input = ref.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  };

  return (
    <div className="relative -top-3 flex justify-end bg-white px-8 py-3">
      <div className="flex items-center gap-3 rounded-md border border-gray-300 bg-[#f2f2f2] p-2 px-4 shadow-sm">
        {/* From Date */}
        <span className="text-base font-medium text-gray-800">From</span>
        <div className="relative flex items-center">
          <input
            id="from-date"
            type="text"
            inputMode="numeric"
            placeholder="DD/MM/YYYY"
            value={fromDate}
            onChange={handleDateInputChange(setFromDate)}
            maxLength={10}
            className="w-36 rounded border border-pink-300 bg-white py-1 pr-8 pl-3 text-center text-sm font-medium text-gray-700 focus:border-[#e10078] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => openCalendar(fromPickerRef)}
            className="absolute right-2 text-[#e10078]"
            aria-label="Open calendar"
          >
            <Calendar size={16} />
          </button>
          <input
            ref={fromPickerRef}
            type="date"
            max="9999-12-31"
            value={parseToNativeDate(fromDate)}
            onChange={handlePickerChange(setFromDate)}
            className="sr-only"
            tabIndex={-1}
          />
        </div>

        {/* To Date */}
        <span className="ml-2 text-base font-medium text-gray-800">To</span>
        <div className="relative flex items-center">
          <input
            id="to-date"
            type="text"
            inputMode="numeric"
            placeholder="DD/MM/YYYY"
            value={toDate}
            onChange={handleDateInputChange(setToDate)}
            maxLength={10}
            className="w-36 rounded border border-pink-300 bg-white py-1 pr-8 pl-3 text-center text-sm font-medium text-gray-700 focus:border-[#e10078] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => openCalendar(toPickerRef)}
            className="absolute right-2 text-[#e10078]"
            aria-label="Open calendar"
          >
            <Calendar size={16} />
          </button>
          <input
            ref={toPickerRef}
            type="date"
            max="9999-12-31"
            value={parseToNativeDate(toDate)}
            onChange={handlePickerChange(setToDate)}
            className="sr-only"
            tabIndex={-1}
          />
        </div>

        <button className="ml-2 rounded bg-[#e10078] px-5 py-1 text-sm font-semibold text-white hover:bg-pink-700">
          Filter
        </button>
      </div>
    </div>
  );
}
