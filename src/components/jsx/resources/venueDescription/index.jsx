/**
 * Creates venue description element
 * @param {String} description 
 * @returns {HTMLElement} formatted venue description element
 */
function VenueDescription(description) {
  return <div className="text-break my-2">{description}</div>
}

export default VenueDescription;