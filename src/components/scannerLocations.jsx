import  { useState } from 'react';
import axios from 'axios'; // Assuming axios for backend calls
import PropTypes from 'prop-types';

const ScannerLocations = ({ scannerLocation }) => {
    ScannerLocations.propTypes = {
        scannerLocation: PropTypes.string.isRequired,
      };
  const [baggageId, setBaggageId] = useState('');

  const handleChange = (event) => {
    setBaggageId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!baggageId) {
      return alert('Please enter a baggage ID'); // Handle missing baggage ID
    }

    try {
      const updateData={
        id: baggageId,
        scannedLocation: scannerLocation,
      }
      const response = await axios.put(`http://localhost:8000/v1/baggage/updatelocation`,updateData);
      console.log('Baggage location updated:', response.data);

      // Handle successful update (e.g., display success message, redirect)
    } catch (error) {
      console.error('Error updating baggage location:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="scanner-locations">
      <h2>Update Baggage Location</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="baggageId">Baggage ID:</label>
        <input
          type="text"
          id="baggageId"
          name="baggageId"
          value={baggageId}
          onChange={handleChange}
          required
        />
        <label htmlFor="scannedLocation">Scanned Location (Pre-filled):</label>
        <input
          type="text"
          id="scannedLocation"
          name="scannedLocation"
          value={scannerLocation}
          disabled // Disable input for pre-filled location
        />
        <button type="submit">Update Location</button>
      </form>
    </div>
  );
};

export default ScannerLocations;
