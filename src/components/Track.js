import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import Food from './FoodList';
import Header from './Header';

function Track() {
  const { loggedUser } = useContext(UserContext); // Extract loggedUser from context
  const [trackedFoods, setTrackedFoods] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [food, setFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tracked foods from db.json
  useEffect(() => {
    fetch('http://localhost:8000/track')
      .then((response) => response.json())
      .then((data) => setTrackedFoods(data))
      .catch((error) => console.error('Error fetching tracked foods:', error));
  }, []);

  // Search for food items
  const searchFood = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    
    if (query.length !== 0) {
      fetch(`http://localhost:8000/foods?q=${query}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${loggedUser.token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
          setFoodItems([]);
        });
    } else {
      setFoodItems([]);
    }
  };

  return (
    <div className="track-container">
      <Header />
      <nav className="navbar">
        <Link to="/logout" className="nav-link">Premium Subscription </Link>
      </nav>
      
      <section className="search-section">
        <input
          className="search-inp"
          type="search"
          placeholder="Search Food Item"
          value={searchTerm}
          onChange={searchFood}
        />
        {foodItems.length !== 0 && (
          <div className="search-results">
            {foodItems.map((item) => (
              <p
                className="item"
                onClick={() => setFood(item)}
                key={item._id}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </section>

      <section className="tracked-foods">
        <h2>Tracked Foods</h2>
        {trackedFoods.length > 0 ? (
          <ul className="food-list">
            {trackedFoods.map((food) => (
            //   <li key={food.id} className="food-item">
            //     <img src={food.image} alt={food.name} className="food-image" />
            //     <div className="food-info">
            
                <li key={food.id} className="food-item">
            <img src={food.imageUrl} alt={food.name} className="food-image" />
            <h3>{food.name}</h3>
            <p>{food.calories} Kcal</p>
                  <h3>{food.name}</h3>
                  <p>{food.healthBenefits}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No tracked foods yet. Start tracking your favorite foods!</p>
        )}
      </section>

      {food && <Food food={food} />}
    </div>
  );
}

export default Track;
