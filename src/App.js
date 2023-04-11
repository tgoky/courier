import React, { useState } from 'react';
import trackingData from './trackingInfo.json'; // Import tracking data from JSON file
import './App.css'; // Import CSS file for styling
import courier1 from  '../src/assets/img/courier3.png';


const App = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchTrackingInfo = async (deliveryCode) => {
    try {
      // Find the delivery data with matching tracking code
      const data = trackingData.find(item => item.trackingCode === deliveryCode);
      if (data) {
        setTrackingInfo(data);
      } else {
        setError('Delivery not found. Please check the tracking code.');
      }
    } catch (error) {
      setError('Failed to fetch tracking information. Please try again later.');
    }
  };

  const handleTrack = async (deliveryCode) => {
    setTrackingInfo(null);
    setError(null);
    await fetchTrackingInfo(deliveryCode);
  };


  const DeliveryInfo = () => {
    return (
      <div className="delivery-info-container">
        <div className="courier-container">
          <img src={courier1} alt="Courier 1" className="courier-image" />
          <p className="courier-text">The best courier in the world. Ship now the best</p>
        </div>
      </div>
    );
  };


  

  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </nav>
      </header>
      <h1>Track Your Deliveries</h1>
      <TrackingForm onTrack={handleTrack} />
      {error && <p className="error">{error}</p>}
      {trackingInfo && (
        <TrackingInfo
          status={trackingInfo.status}
          estimatedDeliveryTime={trackingInfo.estimatedDeliveryTime}
          location={trackingInfo.location}
        />
      )}
      <div className="delivery-info-container">
        <DeliveryInfo />
      </div>
    </div>
  );
};




const TrackingForm = ({ onTrack }) => {
  const [deliveryCode, setDeliveryCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deliveryCode.trim() === '') {
      return;
    }
    onTrack(deliveryCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Delivery Code"
        value={deliveryCode}
        onChange={(e) => setDeliveryCode(e.target.value)}
      />
      <button type="submit">Track</button>
    </form>
  );
};

const TrackingInfo = ({ status, estimatedDeliveryTime, location }) => {
  return (
    <div>
      <h2>Tracking Information</h2>
      <p>Status: {status}</p>
      <p>Estimated Delivery Time: {estimatedDeliveryTime}</p>
      <p>Location: {location}</p>
    </div>
  );
};

export default App;


