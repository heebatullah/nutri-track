// import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrackFood = (food) => {
    fetch("http://localhost:8000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Food tracked:", data);
        // Optionally update state or provide user feedback here
      })
      .catch((error) => console.error("Error tracking food:", error));
  };

  return (
    <div>
      <h2>All Available Foods</h2>
      <input
        type="text"
        placeholder="Search Food Item"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="food-list">
        {filteredFoods.map((food) => (
          <div key={food.id} className="food-item">
            <img src={food.imageUrl} alt={food.name} className="food-image" />
            <h3>{food.name}</h3>
            <p>{food.calories} Kcal</p>
            <p>{food.healthBenefits}</p> {/* Display health benefits */}
            <button onClick={() => handleTrackFood(food)}>Track Food</button>
          </div>
        ))}
      </div>
{/*      
      <nav className="navbar">
        <Link to="/diet" className="nav-link">Diet</Link>
        <Link to="/foods" className="nav-link">Foods</Link>
        <Link to="/logout" className="nav-link">Logout</Link>
      </nav> */}
    </div>
  );
}

export default FoodList;
