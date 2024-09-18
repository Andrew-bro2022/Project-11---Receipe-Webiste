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



// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css'; 

// const RecipeCard = ({ recipe }) => {
//   return (
//     <Card className="h-100">
//       <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
//       <Card.Body>
//         <Card.Title>{recipe.title}</Card.Title>
//         <Link to={`/recipe/${recipe.id}`}>
//           <Button variant="primary" className="mt-2">View Details</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );
// };

// export default RecipeCard;



// import React from 'react';
// import { Link } from 'react-router-dom';

// const RecipeCard = ({ recipe }) => {
//   return (
//     <div className="recipe-card">
//       <img src={recipe.image} alt={recipe.title} />
//       <h3>{recipe.title}</h3>
//       <Link to={`/recipe/${recipe.id}`}>View Details</Link>
//     </div>
//   );
// };

// export default RecipeCard;
