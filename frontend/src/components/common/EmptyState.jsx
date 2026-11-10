import { FiCoffee } from "react-icons/fi";

export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><FiCoffee aria-hidden="true" /></span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}
