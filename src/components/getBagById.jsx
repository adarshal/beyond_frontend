import  { useState } from 'react';
import axios from 'axios'; // Assuming axios for backend calls

const GetBagById = () => {
  const [bagId, setBagId] = useState('');
  const [bagInfo, setBagInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setBagId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/v1/baggage/${bagId}`);
      setBagInfo(response.data.baggage);
      console.log(bagInfo)
      setError(null);
    } catch (error) {
      console.error('Error fetching bag information:', error);
      setError('Error retrieving bag information. Please check the ID and try again.');
    }
  };

  return (
    <div className="get-bag-by-id">
      <h2>Get Bag Information by ID</h2>
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
        <button type="submit">Get Bag Info</button>
      </form>

      {bagInfo && (
        <div className="bag-info">
          <h3>Bag Details</h3>
          <p>ID: {bagInfo._id}</p>
          <p>checkIn Time: {bagInfo.checkInTime}</p>
          
          <p>Current Location: {bagInfo.currentLocation}</p>
          <p>Expected Path: {bagInfo.expectedPath?.join(', ')}</p>
          {/* Add other relevant bag information fields here */}
          <p>Flight Information:</p>
          <ul>
            <li>Airline: {bagInfo.flightInformation?.airline}</li>
            <li>Flight Number: {bagInfo.flightInformation?.flightNumber}</li>
            <li>Origin: {bagInfo.flightInformation?.origin}</li>
            <li>Destination: {bagInfo.flightInformation?.destination}</li>
          </ul>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GetBagById;
