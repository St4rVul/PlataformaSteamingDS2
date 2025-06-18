// src/components/ProfileSelection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSelection.css";

const ProfileSelection: React.FC = () => {
  const navigate = useNavigate();
  const profiles = [
    { id: 1, name: "Marqueza", avatar: "/images/profile1.png" },
    { id: 2, name: "Cossio", avatar: "/images/profile2.png" },
    { id: 3, name: "Rueda", avatar: "/images/profile3.png" },
  ];

  const handleProfileSelect = (profileId: number) => {
    // Guardar perfil seleccionado y redirigir al home
    localStorage.setItem("selectedProfile", profileId.toString());
    navigate("/home");
  };

  return (
    <div className="profile-selection-container">
      <h1>¿Quién está viendo ahora?</h1>
      <div className="profiles-grid">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => handleProfileSelect(profile.id)}
          >
            <img src={profile.avatar} alt={profile.name} />
            <span>{profile.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelection;
