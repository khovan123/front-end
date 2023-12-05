import "./TabButton.css";
export default function TabButton({ children, onSelected, isSelected }) {
  return (
    <li>
      <button
        className={isSelected ? "active" : undefined}
        onClick={onSelected}
      >
        {children}
      </button>
    </li>
  );
}
