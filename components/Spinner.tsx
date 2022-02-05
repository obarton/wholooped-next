import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <div style={{
      height: "40vh",
      display: "flex", 
      justifyContent: "center",
      alignItems: "center"
      }}>
      <CircularProgress color="inherit"/>
    </div>
  )
};

export default Spinner;
