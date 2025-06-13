import React from "react";

export default function PlansModal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="plans-modal-backdrop">
      <div className="plans-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}