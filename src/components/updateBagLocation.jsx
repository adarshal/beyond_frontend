import  { useState } from 'react';
import axios from 'axios'; // Assuming axios for backend calls

const UpdateBagLocation = () => {
  const [bagId, setBagId] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [error, setError] = useState(null);


  const handleChange = (event) => {
    if (event.target.name === 'bagId') {
      setBagId(event.target.value);
    } else if (event.target.name === 'updatedLocation') {
      setUpdatedLocation(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bagId || !updatedLocation) {
      setError('Please enter a bag ID and the updated location');
      return;
    }

    try {
        const updateData={
            id: bagId,
            scannedLocation: updatedLocation,
          }
          console.log("Bag ID:", bagId);
console.log("Updated Location:", updatedLocation);

      const response = await axios.put('http://localhost:8000/v1/baggage/updatelocation',updateData);
      console.log('Bag location updated:', response.data);
      // Handle successful update (e.g., display success message, clear form)
      setError('location update success')
      setBagId('')
      setUpdatedLocation('')

    } catch (error) {
      console.error('Error updating bag location:', error);
      setError('Error updating location. Please try again.');
    }
  };

  return (
    <div className="update-bag-location">
      <h2>Update Bag Location</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bagId">Bag ID:</label>
        <input
          type="text"
          id="bagId"
          name="bagId"
          value={bagId}
          onChange={handleChange}
          required
        />
        <label htmlFor="updatedLocation">Updated Location:</label>
        <input
          type="text"
          id="updatedLocation"
          name="updatedLocation"
          value={updatedLocation}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Location</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateBagLocation;