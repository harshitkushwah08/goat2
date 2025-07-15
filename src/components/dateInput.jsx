import { useState, useEffect } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const DateRangePickerButton = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2026, 2, 31),
      key: "selection",
    },
  ]);
  const [tempRange, setTempRange] = useState(range); // temporary range while editing

  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (showPicker && update) update();
  }, [showPicker, update]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs.reference.current &&
        !refs.reference.current.contains(event.target) &&
        refs.floating.current &&
        !refs.floating.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker, refs]);

  const handleApply = () => {
    setRange(tempRange);
    setShowPicker(false);
  };

  const handleClear = () => {
    const cleared = [
      { startDate: new Date(), endDate: new Date(), key: "selection" },
    ];
    setTempRange(cleared);
    setRange(cleared);
    setShowPicker(false);
  };

  return (
    <div className="inline-block">
      <button
        ref={refs.setReference}
        onClick={() => {
          setTempRange(range); // set temp when opening
          setShowPicker((prev) => !prev);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-boldWhite border border-bodyGray-400 rounded-md shadow-sm hover:bg-bodyGray-100 active:scale-98 transition"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-sm">
          {format(range[0].startDate, "dd/MM/yyyy")} → {format(range[0].endDate, "dd/MM/yyyy")}
        </span>
      </button>

      {showPicker && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="mt-2 border-2 rounded-md border-primary-200 bg-boldWhite shadow-lg z-50"
        >
          <DateRange
            editableDateInputs
            onChange={(item) => setTempRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={tempRange}
            rangeColors={["#22c55e"]}
          />
          <div className="flex justify-end gap-2 px-4 py-2 border-t border-bodyGray-200 bg-bodyGray-50">
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
