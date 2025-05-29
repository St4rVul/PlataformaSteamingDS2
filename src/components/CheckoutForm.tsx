import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm() {
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
      // 1. Crear Payment Intent en el backend
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Monto en centavos (ej: $10.00 USD)
      });

      if (!response.ok) {
        throw new Error('Error al crear el intento de pago');
      }

      const { clientSecret } = await response.json();

      // 2. Confirmar el pago con Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            // Aquí puedes agregar datos del cliente si los tienes
            name: 'Nombre del cliente',
          },
        },
      });

      if (error) {
        throw error;
      }

      // 3. Pago exitoso
      alert('Pago realizado con éxito!');
      
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
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
        className={loading ? 'processing' : ''}
      >
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
}