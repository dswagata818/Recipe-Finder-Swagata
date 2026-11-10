import { FiAlertCircle } from "react-icons/fi";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="notice notice-error" role="alert">
      <FiAlertCircle aria-hidden="true" />
      <span>{message}</span>
      {onRetry && (
        <button className="text-button" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
