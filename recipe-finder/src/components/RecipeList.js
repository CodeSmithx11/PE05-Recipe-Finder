// client/src/components/RecipeDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './RecipeDetails.css'; //Import the css file.

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5050/recipes/${id}`).then((res) => {
      setRecipe(res.data);
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5050/recipes/${id}`).then(() => {
      navigate("/");
    });
  };

  const handleUpdate = () => {
    navigate(`/add?id=${id}`, { state: { recipe } });
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
      <button onClick={handleDelete}>Delete Recipe</button>
      <button onClick={handleUpdate}>Update Recipe</button>
    </div>
  );
}

export default RecipeDetails;