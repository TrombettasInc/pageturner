import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { API_URL } from '../config/api';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function BasicRating() {
    const [value, setValue] = useState(3);

    useEffect(() => {
        async function fetchRating() {
          try {
            const response = await axios.get(API_URL);
            console.log('API Response:', response.data);  // Check the entire response structure
      
            const apiRating = response.data.volumeInfo?.rating ?? null;
      
            if (apiRating !== null && typeof apiRating === 'number') {
              setValue(apiRating);
              console.log('Valid Rating Fetched:', apiRating);
            } else {
              console.warn('Fetched an invalid or missing rating:', apiRating);
            }
          } catch (error) {
            console.error('Error fetching rating:', error);
          }
        }
      
        fetchRating();
      }, []);
      

  // Function to handle when rating is changed
  const handleRatingChange = async (event, newValue) => {
    setValue(newValue);
    try {
      await axios.post(API_URL, { rating: newValue }); // Replace with your API endpoint
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <Box>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
      />
      {console.log('Displayed Rating:', value)}
    </Box>
  );
}
