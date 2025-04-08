import React from 'react'
import Gallery from '../../components/gallery/Gallery'
import { useParams } from 'react-router';

const HomePage = () => {
   // Retrieve category from the URL parameter

    // Extract categoryId from URL parameters

  return (
    <div>
      <Gallery  /> {/* Pass the categoryId to the Gallery component */}
    </div>
  );
}

export default HomePage
