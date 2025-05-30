import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Reemplaza con tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51RRdh2IMveI3OI3GeLoNiOFiOwIZ99lvnEakENl189C9xOsfhDzKN7NPuYTyhrrJfOE4aLWr7iRruxp7eQkHgF7c00au1rPL8x");

const Account: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18181c] text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>
      <div className="w-full max-w-md bg-[#23232b] rounded-xl shadow-lg p-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Account;