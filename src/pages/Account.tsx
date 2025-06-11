import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionSection from "../components/SubscriptionSection";

// Reemplaza con tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51RRdh2IMveI3OI3GeLoNiOFiOwIZ99lvnEakENl189C9xOsfhDzKN7NPuYTyhrrJfOE4aLWr7iRruxp7eQkHgF7c00au1rPL8x");

const Account: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18181c] text-white px-4">
      <Elements stripe={stripePromise}>
        <SubscriptionSection />
      </Elements>
    </div>
  );
};

export default Account;