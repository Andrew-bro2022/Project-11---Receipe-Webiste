import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from URL parameters
  const [recipe, setRecipe] = useState(null);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: apiKey,
          },
        });
        setRecipe(res.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id, apiKey]);

  if (!recipe) return <div>Loading...</div>;

  // Split the instructions by periods or new lines (based on the format from the API)
  const formattedInstructions = recipe.instructions
    ? recipe.instructions.split(/\. |\n/).filter(Boolean) // Filter out any empty strings
    : [];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {/* Recipe Card */}
          <Card className="shadow">
            <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
            <Card.Body>
              <Card.Title className="text-center mb-4">{recipe.title}</Card.Title>

              {/* Health Information */}
              <Row className="mb-3">
                <Col>
                  <h5>Health Information</h5>
                  {recipe.vegan && <Badge bg="success" className="me-2">Vegan</Badge>}
                  {recipe.vegetarian && <Badge bg="info" className="me-2">Vegetarian</Badge>}
                  {recipe.dairyFree && <Badge bg="warning" className="me-2">Dairy-Free</Badge>}
                  {recipe.glutenFree && <Badge bg="danger" className="me-2">Gluten-Free</Badge>}
                </Col>
              </Row>

              {/* Ingredients List */}
              <Row className="mb-4">
                <Col>
                  <h5>Ingredients</h5>
                  <ListGroup variant="flush">
                    {recipe.extendedIngredients.map((ingredient) => (
                      <ListGroup.Item key={ingredient.id}>
                        - {ingredient.name}: {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>

              {/* Instructions */}
              <Row>
                <Col>
                  <h5>Instructions</h5>
                  <ol style={{ paddingLeft: '1.5rem' }}>
                    {formattedInstructions.map((step, index) => (
                      <li key={index} className="mb-2" style={{ listStyleType: 'decimal' }}>
                        {step}.
                      </li>
                    ))}
                  </ol>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

// const RecipeDetail = () => {
//   const { id } = useParams(); // Get recipe ID from URL parameters
//   const [recipe, setRecipe] = useState(null);
//   const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
//         params: {
//           apiKey: apiKey,
//         },
//       });
//       setRecipe(res.data);
//     };

//     fetchRecipe();
//   }, [id, apiKey]);

//   if (!recipe) return <div>Loading...</div>;

//   // Split the instructions by periods or new lines (based on the format from the API)
//   const formattedInstructions = recipe.instructions
//     ? recipe.instructions.split(/\. |\n/).filter(Boolean) // Filter out any empty strings
//     : [];

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={10} lg={8}>
//           {/* Recipe Card */}
//           <Card className="shadow">
//             <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
//             <Card.Body>
//               <Card.Title className="text-center mb-4">{recipe.title}</Card.Title>

//               {/* Health Information */}
//               <Row className="mb-3">
//                 <Col>
//                   <h5>Health Information</h5>
//                   {recipe.vegan && <Badge bg="success" className="me-2">Vegan</Badge>}
//                   {recipe.vegetarian && <Badge bg="info" className="me-2">Vegetarian</Badge>}
//                   {recipe.dairyFree && <Badge bg="warning" className="me-2">Dairy-Free</Badge>}
//                   {recipe.glutenFree && <Badge bg="danger" className="me-2">Gluten-Free</Badge>}
//                 </Col>
//               </Row>

//               {/* Ingredients List */}
//               <Row className="mb-4">
//                 <Col>
//                   <h5>Ingredients</h5>
//                   <ListGroup variant="flush">
//                     {recipe.extendedIngredients.map((ingredient) => (
//                       <ListGroup.Item key={ingredient.id}>
//                         {ingredient.originalString} - {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort}
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//               </Col>
//               </Row>

//               {/* Instructions */}
//               <Row>
//                 <Col>
//                   <h5>Instructions</h5>
//                   <ol style={{ paddingLeft: '1.5rem' }}>
//                     {formattedInstructions.map((step, index) => (
//                       <li key={index} className="mb-2" style={{ listStyleType: 'decimal' }}>
//                         {step}.
//                       </li>
//                     ))}
//                   </ol>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RecipeDetail;

