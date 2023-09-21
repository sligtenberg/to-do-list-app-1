import { useContext, useRef, useState } from "react";
import { UserContext } from "../../Context/user";
import Collaborator from "./Collaborator";

function Collaboratores({ setShowCollaborators, userLists, list }) {
  const { addNewCollaborator } = useContext(UserContext)

  // close the modal when clicking outside the modal
  const modalRef = useRef()
  const closeModal = e => e.target === modalRef.current ? setShowCollaborators(false) : null

  const collaborators = userLists.map(userList =>
    <Collaborator key={userList.id} collaborator={userList} />)

  const blankCollaborator = {
    username: '',
    list_id: list.id,
    owner: false
  }
  
  // should the following be a collaborator component?
  const [newCollaborator, setNewCollaborator] = useState(blankCollaborator)

  // would be great to consolidate the following two functions
  const newCollaboratorUsernameChange = e =>
    setNewCollaborator({...newCollaborator, username: e.target.value})
  const newCollaboratorOwnerToggle = () =>
    setNewCollaborator({...newCollaborator, owner: !newCollaborator.owner})

  function createNewCollaborator(e) {
    e.preventDefault()
    fetch('/user_lists', { // send the newCollaborator object in a post request to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCollaborator)
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new user_list on the frontend
        rspns.json().then(addNewCollaborator)
        setNewCollaborator(blankCollaborator)
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div
      className="modalDiv"
      ref={modalRef}
      onClick={closeModal}>
        <div className="modal">
          <h4>{list.name} collaborators</h4>
          <form onSubmit={createNewCollaborator}><table><tbody>
            <tr><td>owner</td><td></td></tr>
            {collaborators}
            <tr>
              <td><input
                type='checkbox'
                name='owner'
                value={newCollaborator.owner}
                checked={newCollaborator.owner}
                onChange={newCollaboratorOwnerToggle}/></td>
              <td><input
                placeholder='username'
                name='username'
                value={newCollaborator.username}
                onChange={newCollaboratorUsernameChange}/></td>
              <td><input type='submit' value='add collaborator'/></td>  
            </tr>
          </tbody></table></form>
        </div>
    </div>
  );
}

export default Collaboratores;
