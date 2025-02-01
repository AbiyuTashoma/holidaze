/**
 * Creates venue name element
 * @param {String} name 
 * @returns {HTMLElement} formatted venue name element
 */
function VenueName(name) {
  return <div className="text-break fw-semibold fs-5">{name}</div>
}

export default VenueName;