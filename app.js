import { useState, useEffect } from "react";

const API_URL = "https://backend-courses.up.railway.app"; // Change ici avec ton URL Railway

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/recipes/`)
      .then(res => res.json())
      .then(data => setRecipes(Object.entries(data)));
  }, []);

  const addRecipe = async () => {
    await fetch(`${API_URL}/recipes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        ingredients: Object.fromEntries(
          ingredients.split(",").map(i => i.split(":").map(e => e.trim()))
        ),
      }),
    });
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Recettes</h1>
      <div>
        <input className="border p-2 m-2" placeholder="Nom de la recette" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 m-2" placeholder="Ingrédients (ex: Tomate:2, Oignon:1)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <button className="bg-blue-500 text-white p-2" onClick={addRecipe}>Ajouter</button>
      </div>
      <ul>
        {recipes.map(([name, ing]) => (
          <li key={name} className="p-2 border">{name}: {JSON.stringify(ing)}</li>
        ))}
      </ul>
    </div>
  );
}
