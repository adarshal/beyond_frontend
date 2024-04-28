import {} from 'react'
import ScannerLocations from './scannerLocations';

const Scanners = () => {
    const locations=['A','B','C','D'];

    return (
      <>
        <div className="scanner">
        <div className="location-list">
          {locations.map((location,ind) => (
            <ScannerLocations key={ind} scannerLocation={location} />
          ))}
        </div>
  
      </div>
      </>
    )
}

export default Scanners;
