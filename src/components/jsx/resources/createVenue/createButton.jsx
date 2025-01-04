import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { shallow } from "zustand/shallow";
import CreateVenue from ".";
import useUser from "../../store/user";

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
      <div className="d-flex justify-content-end mx-2 mt-3">
        <Button className={venueManager? "d-block":"d-none"} onClick={() => setOpen(!open)} aria-controls="collapse" aria-expanded={open}>
          Create venue
        </Button>
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