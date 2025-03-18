// client/src/components/AddRecipe.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5050/recipes", {
        name,
        ingredients,
        instructions,
      })
      .then(() => navigate("/"));
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;