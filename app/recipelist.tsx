"use client";

import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Define a TypeScript interface for the meal object structure
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Add other properties if the API endpoint returned them and you needed them
  // e.g., strArea?: string;
  // e.g., strCategory?: string;
}

function RecipeList() {
  // Use the Meal interface to type the meals state
  const [meals, setMeals] = useState<Meal[]>([]); // Tell TypeScript this is an array of Meal objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Explicitly type error state

  useEffect(() => {
    const fetchJapaneseMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: { meals: Meal[] | null } = await response.json(); // Type the expected response structure
        // The API returns an object with a 'meals' array
        setMeals(data.meals || []); // Set the meals state
      } catch (error: any) {
        // Catch error as 'any' or a more specific type if you know it
        console.error("Fetching Japanese meals failed:", error);
        // You might want to check if error.message exists
        setError(error.message || "An unexpected error occurred"); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchJapaneseMeals();
  }, []);

  if (loading) {
    return <p>Loading Japanese dishes...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!meals || meals.length === 0) {
    return <p>No Japanese dishes found.</p>;
  }

  return (
    <Row xs={2} sm={2} md={3} lg={4} className="g-4">
      {/* TypeScript now knows 'meal' is of type 'Meal' */}
      {meals.map((meal) => (
        <Col key={meal.idMeal}>
          <Card>
            <Card.Img
              variant="top"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <Card.Body>
              <Card.Title className="fs-5 fs-md-6">{meal.strMeal}</Card.Title>
              {/* Add other details if needed */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default RecipeList;
