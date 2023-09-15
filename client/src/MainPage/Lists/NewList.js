import { useContext, useRef, useState } from "react";
import { UserContext } from "../../Context/user";
import { useNavigate } from "react-router-dom";

function NewListName() {
  const [newListName, setNewListName] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  // close modal when clicking outside modal
  const modalRef = useRef()
  const closeModal = e => e.target === modalRef.current ? navigate(-1) : null

  // handleListSubmit is called when the new list form is submitted
  function handleListSubmit(e) {
    e.preventDefault()
    fetch('/lists', { // send the newListName object in a post request to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: newListName})
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new list on the frontend
        rspns.json().then(newUserList => setUser({...user, user_lists: [...user.user_lists, newUserList]}))
        navigate(-1)
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div className="modalDiv" ref={modalRef} onClick={closeModal}>
      <form onSubmit={handleListSubmit} className="modal">
        <h4>New List</h4>
        <input
          autoFocus
          placeholder="name"
          value={newListName.name}
          onChange={e => setNewListName(e.target.value)}/>
        <input type='submit' value='create list'/>
      </form>
    </div>
    
  );
}

export default NewListName;
