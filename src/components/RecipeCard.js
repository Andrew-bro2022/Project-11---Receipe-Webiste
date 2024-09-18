import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  const handleViewDetails = () => {
    const url = `/recipe/${recipe.id}`;
    window.open(url, '_blank'); // Opens the details page in a new tab
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Button variant="primary" className="mt-2" onClick={handleViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;

