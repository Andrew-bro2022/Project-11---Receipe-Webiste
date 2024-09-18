import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Footer from './components/Footer'; // Import the footer

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </main>
        <Footer /> {/* Add footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;

