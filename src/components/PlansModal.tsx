import React from "react";

export default function PlansModal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  return (
    <div
      className={`plans-modal-backdrop${open ? " open" : ""}`}
      onClick={onClose}
      tabIndex={-1}
    >
      <div
        className={`plans-modal-content${open ? " open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            background: "transparent",
            color: "#fff",
            fontSize: 32,
            border: "none",
            cursor: "pointer",
            zIndex: 2,
          }}
          aria-label="Cerrar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}