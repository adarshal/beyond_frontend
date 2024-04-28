import  { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios for backend calls

const Dashboard = () => {
  const [locationStats, setLocationStats] = useState([]);
  const [redAlertBags, setRedAlertBags] = useState([]);
  const [orangeAlertBags, setOrangeAlertBags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const locationResponse = await axios.get('http://localhost:8000/v1/stats/getLocationStats');
        setLocationStats(locationResponse.data.locationStats);

        const redAlertResponse = await axios.get('http://localhost:8000/v1/stats/red-alert-bags');
        setRedAlertBags(redAlertResponse.data.redAlertBags);

        const orangeAlertResponse = await axios.get('http://localhost:8000/v1/stats/orange-alert-bags');
        setOrangeAlertBags(orangeAlertResponse.data.orangeAlertBags);
        setError(null)
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Error loading dashboard data. Please try again later.');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Baggage Tracking Dashboard</h1>

      {error && <p className="error">{error}</p>}

      <h2>Location Stats</h2>
      <table className="location-stats">
        <thead>
          <tr>
            <th>Location</th>
            <th>Number of Bags</th>
          </tr>
        </thead>
        <tbody>
          {locationStats.map((stat) => (
            <tr key={stat._id}>
              <td>{stat._id}</td>
              <td>{stat.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Red Alert Bags</h2>
      <ul className="red-alert-bags">
        {redAlertBags.map((bag) => (
          <li key={bag._id}>
          <b>Bag ID:</b> {bag._id} (Unexpected Location)
          <br />
          <b>Current Location:</b> {bag.currentLocation}
          <br />
          <b>Expected Path:</b> {bag.expectedPath.join(', ')}
        </li>
        ))}
      </ul>

      <h2>Orange Alert Bags ids only  for missed or unorderd checkin bags</h2>
      <ul className="orange-alert-bags">
        {orangeAlertBags.map((bag) => (
         <li key={bag._id}>
         <b>Bag ID:</b> {bag._id} (Missed Location)
         <br />
         <b>Missed checkpoint Location:</b> {bag.missedCheckpoints}
         <br />
         
       </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
