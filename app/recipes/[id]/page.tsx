// app/recipedetails/[id]/page.tsx

import Image from "next/image"; // Använd next/image för optimering
// Ingen import för YouTube specifik hantering behövs längre

// Definiera ett interface för den fullständiga receptdatan från lookup-endpoint
interface DetailedMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null; // Vi behåller denna i interfacet ifall du använder den någon annanstans, men den renderas inte
  // Ingredienser och mått (API:et returnerar upp till 20 par)
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

// Interface för API-svaret från lookup-endpoint
interface LookupResponse {
  meals: DetailedMeal[] | null;
}

// Serverkomponent för receptets detaljsida
export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const mealId = params.id; // Hämta ID:t från URL:ens parametrar

  let meal: DetailedMeal | null = null;
  let error: string | null = null;

  try {
    // Gör API-anropet för att hämta fullständiga detaljer för receptet
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    if (!response.ok) {
      throw new Error(
        `Kunde inte hämta recept: HTTP status ${response.status}`
      );
    }

    const data: LookupResponse = await response.json();

    if (data.meals && data.meals.length > 0) {
      meal = data.meals[0]; // Detalj-lookup returnerar en array med ett element eller null
    } else {
      error = "Recipe not found.";
    }
  } catch (e: any) {
    console.error("Error when fetching recipe details:", e);
    error = `An error pccured when trying to fetch the recipe details: ${e.message}`;
  }

  // Hantera fellägen eller om receptet inte hittades
  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Om meal är null här trots att error inte är satt, något oväntat hände.
  if (!meal) {
    return (
      <div className="container mt-5 text-center">
        <p>Could not find any recipe information.</p>
      </div>
    );
  }

  // Bygg listan över ingredienser och mått
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(
        `${measure ? measure.trim() + " " : ""}${ingredient.trim()}`
      );
    }
  }

  return (
    <div className="container mt-5 p-5 bg-white">
      <div className="row">
        <div className="col-md-6">
          {/* Använd next/image för bättre prestanda */}
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={500} // Ange bredd och höjd för Image-komponenten
            height={500}
            layout="responsive" // Gör bilden responsiv
            objectFit="cover"
            className="rounded shadow mb-3"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-6">{meal.strMeal}</h1>

          <h2 className="mt-4">Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-4">Instructions</h2>
          <p className="text-dark">{meal.strInstructions}</p>

          {meal.strSource && (
            <div className="mt-4">
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
