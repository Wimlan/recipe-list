import Recommended from "./recommended";
import RecipeList from "./recipelist";
import "bootstrap/dist/css/bootstrap.min.css"; // <-- This line should be here

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
  .then((res) => res.json())
  .then(console.log);

function Page() {
  return (
    <>
      <h1>hello</h1>
      <Recommended></Recommended>
      <RecipeList></RecipeList>
    </>
  );
}

export default Page;
