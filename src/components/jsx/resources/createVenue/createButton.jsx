import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { shallow } from "zustand/shallow";
import CreateVenue from ".";
import useUser from "../../store/user";

/**
 * Creates create venue button
 * @returns {HTMLElement} create venue button
 */
function CreateButton() {
  const [open, setOpen] = useState(false);

  const { venueManager } = useUser(
    (state) => ({
      venueManager: state.venueManager,
    }),
    shallow
  );

  return (
    <div>
      <div className="d-flex justify-content-end mt-3 me-2 me-md-3 me-xxl-5">
        { venueManager ? 
          <Button className={venueManager? "d-block btn-sm":"d-none"} onClick={() => setOpen(!open)} aria-controls="collapse" aria-expanded={open}>
            Create venue
          </Button>:<></>
        }
      </div>
      <Collapse in={open}>
        <div id="collapse">
          <CreateVenue />
        </div>
      </Collapse>
    </div>
  );
}

export default CreateButton;