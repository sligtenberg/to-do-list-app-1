import { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";

function NewList() {
  const navigate = useNavigate()
  const modalRef = useRef()
  const [newListName, setNewListName] = useState('')
  const { addNewUserList } = useContext(UserContext)

  // handleListSubmit is called when the new list form is submitted
  function handleNewListSubmit(e) {
    e.preventDefault()
    fetch('/lists', { // send the newListName object in a post request to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: newListName})
    }).then(rspns => {
      if (rspns.ok) {
        rspns.json().then(addNewUserList) // add new user_list (including the new list) to user state
        navigate(-1) // close the modal and navigate back to the lists page
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div
      className="modalDiv"
      ref={modalRef}
      onClick={e => e.target === modalRef.current ? navigate(-1) : null}>
      <form onSubmit={handleNewListSubmit} className="modal">
        <h4>New List</h4>
        <input
          autoFocus
          placeholder="name"
          value={newListName.name}
          onChange={e => setNewListName(e.target.value)}/>
        <input type='submit' value='create list' className='float-right'/>
      </form>
    </div>
  );
}

export default NewList;
