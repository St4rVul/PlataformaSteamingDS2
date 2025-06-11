import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

const plans = [
  { name: 'Básico', price: 12500, description: 'Calidad SD, 1 pantalla' },
  { name: 'Estándar', price: 18000, description: 'Calidad HD, 2 pantallas' },
  { name: 'Premium', price: 23000, description: 'Calidad 4K, 4 pantallas' },
];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<null | typeof plans[0]>(null);

  return (
    <div className="subscription-section">
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
                <button onClick={() => setSelectedPlan(plan)} className="subscribe-btn">
                  Suscribirse
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CheckoutForm amount={selectedPlan.price} planName={selectedPlan.name} onBack={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}