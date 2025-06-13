import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const plans = [
  { name: "Básico", price: 12500, description: "Calidad SD, 1 pantalla" },
  { name: "Estándar", price: 18000, description: "Calidad HD, 2 pantallas" },
  { name: "Premium", price: 23000, description: "Calidad 4K, 4 pantallas" },
];

export default function SubscriptionSection({ onShowCheckoutForm }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (onShowCheckoutForm) onShowCheckoutForm(!!selectedPlan);
  }, [selectedPlan]);

  return (
    <div className="subscription-section">
      {/* Botón Volver al Home */}
      {!selectedPlan ? (
        <div className="plans-container">
          <h2 className="subscription-title">Elige tu plan de suscripción</h2>
          <div className="plans-list">
            {plans.map(plan => (
              <div key={plan.name} className="plan-card">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="plan-price">
                  ${plan.price.toLocaleString("es-CO")} COP
                </div>
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="subscribe-btn"
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CheckoutForm
          amount={selectedPlan.price}
          planName={selectedPlan.name}
          onBack={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}