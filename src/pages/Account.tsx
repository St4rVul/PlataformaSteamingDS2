/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PlansModal from "../components/PlansModal";
import SubscriptionSection from "../components/SubscriptionSection";

const defaultProfilePhoto = "/images/profile2.png";
const stripePromise = loadStripe("pk_test_51RRdh2IMveI3OI3GeLoNiOFiOwIZ99lvnEakENl189C9xOsfhDzKN7NPuYTyhrrJfOE4aLWr7iRruxp7eQkHgF7c00au1rPL8x");

const Account: React.FC = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(defaultProfilePhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [showingCheckoutForm, setShowingCheckoutForm] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfilePhoto(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const profileName = "Emilson"; // Cambia por el nombre real del perfil
  const currentPlan = null; // O el nombre del plan actual, por ejemplo: "Estándar"

  return (
    <div className="min-h-screen bg-[#18181c] text-white px-4" style={{ position: "relative" }}>
      {/* Avatar y datos de perfil */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 50,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 220,
        }}
      >
        {/* Solo el contenedor de la imagen tiene el hover */}
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 32,
            overflow: "hidden",
            background: "#23232a",
            boxShadow: "0 4px 24px rgba(49,130,206,0.10)",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={profilePhoto}
            alt="Foto de perfil"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "filter 0.2s",
            }}
          />
          {hover && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(30,41,59,0.65)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: 1,
                borderRadius: 32,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              Cambiar foto
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>
        {/* Nombre y botón debajo, fuera del hover */}
        <div
          style={{
            marginTop: 18,
            fontWeight: 700,
            fontSize: 22,
            color: "#fff",
            textAlign: "center",
            width: "100%",
            wordBreak: "break-word",
          }}
        >
          {profileName}
        </div>
        {!currentPlan && (
          <button
            className="subscribe-btn"
            style={{ marginTop: 12 }}
            onClick={() => setPlansOpen(true)}
          >
            Suscribirse
          </button>
        )}
        <PlansModal open={plansOpen} onClose={() => setPlansOpen(false)} wide={showingCheckoutForm}>
          <Elements stripe={stripePromise}>
            <SubscriptionSection onShowCheckoutForm={setShowingCheckoutForm} />
          </Elements>
        </PlansModal>
      </div>
      {/* Resto del contenido centrado */}
      
    </div>
  );
};

export default Account;