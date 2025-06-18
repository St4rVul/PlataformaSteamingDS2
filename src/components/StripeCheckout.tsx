import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm, { CheckoutFormProps } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface StripeCheckoutProps extends CheckoutFormProps {}

export default function StripeCheckout({
  amount,
  planName,
  onBack,
}: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} planName={planName} onBack={onBack} />
    </Elements>
  );
}
