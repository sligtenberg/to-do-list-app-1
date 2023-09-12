import { useContext, useState } from "react";
import { UserContext } from "../Context/user";

function NewList() {
  const [newList, setNewList] = useState({
    name: '',
    tasks: [{description: 'blank', completed: false}]
  })

  const { user, setUser } = useContext(UserContext)

  // handleListSubmit is called when the new list form is submitted
  function handleListSubmit(e) {
    e.preventDefault()
    fetch('/lists', { // send the newList object in a post request to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newList)
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new list on the frontend
        rspns.json().then(newUserList => {
          console.log(newUserList)
          setUser({...user, user_lists: [...user.user_lists, newUserList]})
        })
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <form onSubmit={handleListSubmit}>
      <h3>Name:</h3>
      <input
        autoFocus
        placeholder="name"
        value={newList.name}
        onChange={e => setNewList({...newList, name: e.target.value})}/>
      {/* <h3>Tasks:</h3>
      <input placeholder='task' value={newList.tasks[0]} onChange={e => setNewList({...newList, tasks: e.target.value})}/> */}
      <input type='submit' value='create list'/>
    </form>
  );
}

export default NewList;
