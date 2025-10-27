import "@components/common/Select.css";
import { useState, useRef, useEffect } from "react";

const Select = ({ name, value, options, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleSelect = (optValue) => {
    onChange({ target: { name, value: optValue } });
    setIsOpen(false);
  };

  // 셀렉트 외부 클릭 시 닫히게
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`CustomSelect ${className} ${isOpen ? "open" : ""}`}
    >
      <button
        type="button"
        className={`select-display ${value ? "selected" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption.label}
      </button>

      {isOpen && (
        <ul className="select-options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`_${opt.value} ${opt.value === value ? "active" : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
