import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { API_URL } from '../config/api';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function BasicRating() {
    const [value, setValue] = useState(null);

  useEffect(() => {
    async function fetchRating() {
      try {
        const response = await axios.get(API_URL); 
        const apiRating = response.data.volumeInfo.rating;
        console.log(response.data);

        setValue(apiRating);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    }

    fetchRating();
  }, []); // Empty dependency array ensures this runs only on mount

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
    </Box>
  );
}
