
import {} from 'react';
import PropTypes from 'prop-types'
const BaggageCard = ({ baggage }) => {
  const { id, flightInformation, currentLocation, expectedPath, alertStatus } = baggage; // Assuming properties
  BaggageCard.propTypes = {
    baggage: PropTypes.shape({
      id: PropTypes.string.isRequired,
      flightInformation: PropTypes.shape({
        airline: PropTypes.string.isRequired,
        flightNumber: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
      }).isRequired,
      currentLocation: PropTypes.string.isRequired,
      expectedPath: PropTypes.arrayOf(PropTypes.string).isRequired,
      alertStatus: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="baggage-card">
      <h2>Baggage ID: {id}</h2>
      <p>Flight Information:</p>
      <ul>
        <li>Airline: {flightInformation.airline}</li>
        <li>Flight Number: {flightInformation.flightNumber}</li>
        <li>Origin: {flightInformation.origin}</li>
        <li>Destination: {flightInformation.destination}</li>
      </ul>
      <p>Current Location: {currentLocation}</p>
      <p>Expected Path: {expectedPath.join(', ')}</p>
      <p>Alert Status: {alertStatus}</p>
      {/* ... other content based on your needs */}
    </div>
  );
};

export default BaggageCard;
