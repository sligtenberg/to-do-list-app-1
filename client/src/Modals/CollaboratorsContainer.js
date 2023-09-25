import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/user";
import Collaborator from "./Collaborator";

function CollaboratorsContainer() {
  const navigate = useNavigate()
  const modalRef = useRef()
  const { id } = useParams()
  const { user, addNewCollaborator } = useContext(UserContext)
  const userList = user.user_lists.find(userList => userList.list.id === parseInt(id))

  //const owner = true // toggle for dev purposes
   const owner = userList.owner // toggle for dev purposes

  const collaborators = userList.list.user_lists.map(collaborator =>
    <Collaborator key={collaborator.id} collaborator={collaborator} ownedByCurrentUser={owner}/>)

    const blankCollaborator = {
      username: '',
      list_id: userList.list.id,
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
      onClick={e => e.target === modalRef.current ? navigate(-1) : null}>
      <div className='modal'>
        <h4>{userList.list.name} collaborators</h4>
        <form onSubmit={createNewCollaborator}><table><tbody>
          <tr><td>owner</td></tr>
          {collaborators}
          {owner ? <tr>
            <td><input
              type='checkbox'
              name='owner'
              value={newCollaborator.owner}
              checked={newCollaborator.owner}
              onChange={newCollaboratorOwnerToggle}
              /></td>
            <td><input
              placeholder='username'
              name='username'
              value={newCollaborator.username}
              onChange={newCollaboratorUsernameChange}
              /></td>
            <td><input type='submit' value='add collaborator'/></td>
          </tr> : null}
        </tbody></table></form>
      </div>
    </div>
  );
}

export default CollaboratorsContainer;
