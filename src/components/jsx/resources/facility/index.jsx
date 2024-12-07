function Facility(facility) {
  return (
    <div className="my-2"> 
      <span className="facility me-1">{facility['breakfast'] ? "Breakfast":"No breakfast"}</span>
      <span className="facility me-1">{facility['parking'] ? "Parking":"No parking"}</span>
      <span className="facility me-1">{facility['pets'] ? "Pet friendly":"No Pets"}</span>
      <span className="facility me-1">{facility['wifi'] ? "Free Wifi":"No Wifi"}</span>
    </div>
  );
}

export default Facility;