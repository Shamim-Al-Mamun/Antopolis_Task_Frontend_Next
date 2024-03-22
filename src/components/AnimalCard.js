import React from "react";

const AnimalCard = ({ animal }) => {
  return (
    <div className="animal-card">
      <img
        src={`http://localhost:3001/${animal.animal_image}`}
        alt={animal.animal_name}
      />
      <h6>{animal.animal_name}</h6>
    </div>
  );
};

export default AnimalCard;
