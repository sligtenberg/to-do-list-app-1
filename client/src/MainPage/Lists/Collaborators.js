import { useRef } from "react";
import Collaborator from "./Collaborator";

function Collaboratores({ setShowCollaborators, userLists }) {
  // close the modal when clicking outside the modal
  const modalRef = useRef()

  const collaborators = userLists.map(userList => <Collaborator key={userList.id} userList={userList} />)

  return (
    <div
      className="modalDiv"
      ref={modalRef}
      onClick={e => e.target === modalRef.current ? setShowCollaborators(false) : null}>
        <div className="modal">
          <h4>Collaborators</h4>
          <table><tbody>
            <tr><td>owner</td><td></td></tr>
            {collaborators}
            <tr>
              <td><input type='checkbox'/></td>
              <td><input placeholder='username' /></td>
              <td><input type='submit' value='add collaborator'/></td></tr>
            </tbody></table>
        </div>
    </div>
  );
}

export default Collaboratores;
