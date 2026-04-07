import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/CVOverlay.css";

interface CVOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVOverlay = ({ isOpen, onClose }: CVOverlayProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="cv-overlay-backdrop" onClick={onClose}>
      <div
        className="cv-overlay-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cv-overlay-close"
          onClick={onClose}
          aria-label="Close CV overlay"
        >
          ✕
        </button>
        <iframe
          className="cv-overlay-iframe"
          src="/CV-Shubh.pdf"
          title="CV - Shubh Somani"
        />
      </div>
    </div>,
    document.body
  );
};

export default CVOverlay;
