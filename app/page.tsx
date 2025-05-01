import Recommended from "./recommended";
import RecipeList from "./recipelist";
import Container from "react-bootstrap/Container";

function Page() {
  return (
    <>
      <Container className="bg-white">
        <h2 className="text-right p-6 display-1">
          Japanese
          <br />
          Recipes
        </h2>
        <Recommended></Recommended>
        <RecipeList></RecipeList>
      </Container>
    </>
  );
}

export default Page;
