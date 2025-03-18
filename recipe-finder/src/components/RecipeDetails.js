// client/src/components/RecipeDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5050/recipes/${id}`).then((res) => {
      setRecipe(res.data);
    });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetails;