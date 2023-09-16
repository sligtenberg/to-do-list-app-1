import { useEffect, useRef, useState } from "react";

function Collaboratores({ setShowCollaborators, userLists }) {
  // close the modal when clicking outside the modal
  const modalRef = useRef()

  return (
    <div
      className="modalDiv"
      ref={modalRef}
      onClick={e => e.target === modalRef.current ? setShowCollaborators(false) : null}>
        <div className="modal">
          <h4>Owners</h4>
          <ul>
            <li></li>
          </ul>
        </div>
    </div>
  );
}

export default Collaboratores;
