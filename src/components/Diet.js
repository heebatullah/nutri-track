import { useEffect, useState, useCallback } from "react";
import Header from './Header';

export default function Diet() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0
    });

    useEffect(() => {
        // Fetch all tracked foods
        fetch('https://nutri-track.onrender.com/track')
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Use useCallback to memoize the calculateTotal function
    const calculateTotal = useCallback(() => {
        let totalCopy = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0
        };

        items.forEach((item) => {
            if (item.foodId && item.details) {
                totalCopy.totalCalories += item.details.calories * item.quantity;
                totalCopy.totalProtein += item.details.protein * item.quantity;
                totalCopy.totalCarbs += item.details.carbohydrates * item.quantity;
                totalCopy.totalFats += item.details.fat * item.quantity;
                totalCopy.totalFiber += item.details.fiber * item.quantity;
            }
        });

        setTotal(totalCopy);
    }, [items]);

    // Now include calculateTotal in the dependency array
    useEffect(() => {
        calculateTotal();
    }, [items, calculateTotal]);

    return (
        <section className="container diet-container">
            <Header />

            <div className="items-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        item.foodId && item.details ? (
                            <div className="item" key={item._id}>
                                <h3>{item.foodId.name} ({item.details.calories * item.quantity} Kcal for {item.quantity}g)</h3>
                                <p>Protein: {item.details.protein * item.quantity}g, Carbs: {item.details.carbohydrates * item.quantity}g, Fats: {item.details.fat * item.quantity}g, Fiber: {item.details.fiber * item.quantity}g</p>
                            </div>
                        ) : (
                            <div className="item" key={item._id}>
                                <p>Item data is incomplete.</p>
                            </div>
                        )
                    ))
                ) : (
                    <p>No tracked foods available.</p>
                )}
            </div>

            <div className="total">
                <h3>Total Calories: {total.totalCalories} Kcal</h3>
                <p>Protein: {total.totalProtein}g, Carbs: {total.totalCarbs}g, Fats: {total.totalFats}g, Fiber: {total.totalFiber}g</p>
            </div>
        </section>
    );
}

