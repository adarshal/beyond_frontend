import  { useState } from 'react';
import axios from 'axios'; // Assuming axios for backend calls

const CreateBaggage = () => {
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    origin: '',
    destination: '',
    expectedPath: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const expectedPath = formData.expectedPath.split(',').map((location) => location.trim()); // Split and trim expected path

      const baggageData = {
        flightInformation: {
          airline: formData.airline,
          flightNumber: formData.flightNumber,
          origin: formData.origin,
          destination: formData.destination,
        },
        expectedPath,
      };

      const response = await axios.post('http://localhost:8000/v1/baggage', baggageData); // 
      console.log('Baggage created successfully:', response.data);
      // Handle successful creation (, clear form, show success message)
      setSuccessMessage('Baggage created successfully');
      setErrorMessage('');

      setFormData({
        airline: '',
        flightNumber: '',
        origin: '',
        destination: '',
        expectedPath: ''
      });
    } catch (error) {
      console.error('Error creating baggage:', error);
      // Handle error ( display error message)
      setErrorMessage('Error creating baggage. Please try again.');
      setSuccessMessage('')
    }
  };

  return (
    <div className="create-baggage">
      <h2>Create New Baggage</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="airline">Airline:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="airline"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="flightNumber">Flight Number:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="origin">Origin:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="destination">Destination:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="expectedPath">Expected Path (comma-separated locations):</label>
              </td>
              <td>
                <input
                  type="text"
                  id="expectedPath"
                  name="expectedPath"
                  value={formData.expectedPath}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Create Baggage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default CreateBaggage;
