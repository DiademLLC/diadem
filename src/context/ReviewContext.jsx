import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviewContext = () => {
  return useContext(ReviewContext);
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const response = await fetch('https://diadem-backend.vercel.app/api/review');
            // const response = await fetch('http://localhost:3000/api/review');
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            // console.log('data:', data)
            setReviews(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchReviews();
    // console.log('menuItems:', menuItems)
}, []);


  return (
    <ReviewContext.Provider value={{ reviews }}>
      {children}
    </ReviewContext.Provider>
  );
};
