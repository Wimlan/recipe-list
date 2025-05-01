"use client";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function Recommended() {
  return (
    <>
      <h4 className="text-center mb-4">Something Salty</h4>
      <Container className="responsive-flex mt-0">
        <img className="recommended-img" src="okonomiyaki.jpg" />
        <div className="p-4 gap-2">
          <h2>Okonomiyaki</h2>
          <p>By Marie Kitsunebi</p>
          <Button
            target="_blank"
            href="https://jobsinjapan.com/japan-faq/how-to-make-okonomiyaki-easy-street-food-at-home/"
          >
            See the recipe
          </Button>
        </div>
      </Container>

      <h4 className="text-center mb-4">Something Sweet</h4>
      <Container className="responsive-flex mt-0">
        <img className="recommended-img" src="sweet-potatoes.jpg" />
        <div className="p-4 gap-2">
          <h2>Sweet Potato</h2>
          <p>By Yuto Omura</p>
          <Button
            target="_blank"
            href="https://sudachirecipes.com/japanese-sweet-potato/"
          >
            See the recipe
          </Button>
        </div>
      </Container>

      <h4 className="text-center mb-4">Something Sour</h4>
      <Container className="responsive-flex mt-0">
        <img className="recommended-img" src="subuta.jpg" />
        <div className="p-4 gap-2">
          <h2>Subuta</h2>
          <p>By Japanese Cooking 101</p>
          <Button
            target="_blank"
            href="https://www.japanesecooking101.com/subuta-sweet-and-sour-pork-recipe/"
          >
            See the recipe
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Recommended;
