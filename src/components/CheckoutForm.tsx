import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import './CheckoutForm.css';

interface CheckoutFormProps {
  amount: number;
  planName: string;
  onBack?: () => void;
}

export default function CheckoutForm({ amount, planName, onBack }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el intento de pago');
      }

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Nombre del cliente',
          },
        },
      });

      if (error) {
        throw error;
      }

      alert('Pago realizado con éxito!');
      
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <div className="checkout-form-title">Pago con tarjeta</div>
      <div className="checkout-form-label">
        Suscripción: <b>{planName}</b> - <span>${amount.toLocaleString('es-CO')} COP</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="checkout-form-label">Datos de la tarjeta</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`checkout-form-button${loading ? ' processing' : ''}`}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
        {onBack && (
          <button type="button" className="checkout-form-button" style={{ marginTop: 8, background: '#444654' }} onClick={onBack}>
            Volver
          </button>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
}