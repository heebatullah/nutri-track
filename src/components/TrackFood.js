import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function TrackFood() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const loggedData = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8000/foods/${id}`)
      .then((response) => response.json())
      .then((data) => setFood(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, [id]);

  function trackFoodItem() {
    const trackedItem = {
      userId: loggedData.loggedUser.userid,
      foodId: food.id,
      details: {
        protein: (food.protein * quantity) / 100,
        carbohydrates: (food.carbohydrates * quantity) / 100,
        fat: (food.fat * quantity) / 100,
        fiber: (food.fiber * quantity) / 100,
        calories: (food.calories * quantity) / 100,
      },
      quantity,
    };

    fetch("http://localhost:8000/track", {
      method: "POST",
      body: JSON.stringify(trackedItem),
      headers: {
        "Authorization": `Bearer ${loggedData.loggedUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tracked:", data);
        // Redirect to /track or show a success message
      })
      .catch((error) => console.error("Error tracking food:", error));
  }

  return (
    <div>
      {food ? (
        <>
          <h3>{food.name}</h3>
          <img src={food.imageUrl} alt={food.name} />
          <p>{food.calories} Kcal per 100g</p>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity in grams"
          />
          <button onClick={trackFoodItem}>Track Food</button>
        </>
      ) : (
        <p>Loading food details...</p>
      )}
    </div>
  );
}

export default TrackFood;

