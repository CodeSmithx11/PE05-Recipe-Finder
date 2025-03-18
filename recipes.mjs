// backend/routes/recipes.mjs
import express from "express";
const router = express.Router();
import db from "../backend/db/conn.mjs";
const collection = db.collection("recipes");
import { ObjectId } from "mongodb";
router.get("/", async (req, res) => {
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
router.post("/", async (req, res) => {
  let newRecipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  };
  let result = await collection.insertOne(newRecipe);
  res.send(result).status(201);
});
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    },
  };
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});
export default router;