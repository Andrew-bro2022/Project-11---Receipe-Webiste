import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { Form, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

const Home = () => {
  const [query, setQuery] = useState(''); // Stores the search query input by the user
  const [recipes, setRecipes] = useState([]); // Stores the search results
  const [cuisine, setCuisine] = useState(''); // Stores the selected cuisine for filtering
  const [page, setPage] = useState(1); // Tracks the current page for pagination
  const [totalResults, setTotalResults] = useState(0); // Stores the total results for pagination control

  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  // Supported Cuisines list
  const supportedCuisines = [
    'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];

  // Function to handle the search action when the user presses the button or enter key
  const handleSearch = async () => {
    // Make an API call to Spoonacular with both the search query and selected cuisine
    const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: apiKey,
        query: query || '',      // User's input query (if any)
        cuisine: cuisine || '',  // Selected cuisine (if any)
        number: 5,               // Limit results to 5 per page
        offset: (page - 1) * 5,  // Pagination offset (adjust based on page number)
      },
    });

    // Store the API results
    setRecipes(res.data.results);
    setTotalResults(res.data.totalResults);
  };

  // Effect hook to trigger search whenever the page, query, or cuisine changes
  useEffect(() => {
    handleSearch();
  }, [page, cuisine]);

  // Handle the Enter key to trigger search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default form submission behavior
      setPage(1); // Reset to page 1 on new search
      handleSearch();
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Recipe Website</h1>

      {/* Form for searching recipes */}
      <Form className="mb-4">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-2">
            <Form.Control
              type="text"
              placeholder="Search for a recipe..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
            />
          </Col>

          {/* Dropdown to select a cuisine to filter by */}
          <Col xs={12} md={3} className="mb-2">
            <Form.Select value={cuisine} onChange={(e) => { setCuisine(e.target.value); setPage(1); }}>
              <option value="">All Cuisines</option> {/* Default option to not filter by cuisine */}
              {supportedCuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Search button */}
          <Col xs={12} md={3} className="mb-2 text-center">
            <Button variant="primary" onClick={() => { setPage(1); handleSearch(); }}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Display search results in two rows */}
      <Row className="mb-4">
        {/* First 3 results in the first row */}
        {recipes.slice(0, 3).map((recipe) => (
          <Col xs={12} md={4} key={recipe.id} className="mb-4">
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        {/* Remaining 2 results in the second row */}
        {recipes.slice(3, 5).map((recipe) => (
          <Col xs={12} md={4} key={recipe.id} className="mb-4">
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
        {/* Empty space to keep alignment with the first row */}
        {recipes.length > 3 && recipes.length <= 5 && (
          <Col xs={12} md={4} className="mb-4"></Col>
        )}
      </Row>

      {/* Pagination controls */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Pagination.Prev>
        <Pagination.Next
          disabled={page * 5 >= totalResults} // Disable if we have no more results to show
          onClick={() => setPage(page + 1)}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </Container>
  );
};

export default Home;


