import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      console.log('Sending request with:', parsedInput);
      const res = await axios.post('https://bajaj-ra2111029010002-backend.onrender.com/bfhl', parsedInput);  // Update the URL here
      console.log('Received response:', res.data);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid JSON or API error');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    const filteredResponse = {};
    if (selectedOptions.includes('Numbers')) filteredResponse.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = alphabets;
    if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = highest_alphabet;
    
    return (
      <Box mt={2}>
        <Typography variant="h6">Response:</Typography>
        <List>
          {selectedOptions.includes('Numbers') && (
            <ListItem>
              <ListItemText primary="Numbers" secondary={numbers.join(', ')} />
            </ListItem>
          )}
          {selectedOptions.includes('Alphabets') && (
            <ListItem>
              <ListItemText primary="Alphabets" secondary={alphabets.join(', ')} />
            </ListItem>
          )}
          {selectedOptions.includes('Highest alphabet') && (
            <ListItem>
              <ListItemText primary="Highest Alphabet" secondary={highest_alphabet.join(', ')} />
            </ListItem>
          )}
        </List>
      </Box>
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        BFHL Frontend
      </Typography>
      <TextField
        label="Enter JSON"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"data":["A","1","B","2","C"]}'
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Options</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleOptionChange}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="Numbers">
              <Checkbox checked={selectedOptions.includes('Numbers')} />
              <ListItemText primary="Numbers" />
            </MenuItem>
            <MenuItem value="Alphabets">
              <Checkbox checked={selectedOptions.includes('Alphabets')} />
              <ListItemText primary="Alphabets" />
            </MenuItem>
            <MenuItem value="Highest alphabet">
              <Checkbox checked={selectedOptions.includes('Highest alphabet')} />
              <ListItemText primary="Highest alphabet" />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {renderResponse()}
    </Container>
  );
}

export default App;
