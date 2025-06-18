import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

// Definir tipo para el plan
type Plan = {
  name: string;
  price: number;
  description: string;
};

// Definir props del componente
interface SubscriptionSectionProps {
  onShowCheckoutForm: (isShowing: boolean) => void;
}

export default function SubscriptionSection({
  onShowCheckoutForm,
}: SubscriptionSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    { name: "Básico", price: 12500, description: "Calidad SD, 1 pantalla" },
    { name: "Estándar", price: 18000, description: "Calidad HD, 2 pantallas" },
    { name: "Premium", price: 23000, description: "Calidad 4K, 4 pantallas" },
  ];

  useEffect(() => {
    onShowCheckoutForm(!!selectedPlan);
  }, [selectedPlan, onShowCheckoutForm]);

  return (
    <div className="subscription-section">
      {!selectedPlan ? (
        <div className="plans-container">
          <h2 className="subscription-title">Elige tu plan de suscripción</h2>
          <div className="plans-list">
            {plans.map((plan) => (
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
