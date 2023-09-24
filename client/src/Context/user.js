import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // * DIRECT USERLIST ACTIONS *
  // DELETEUSERLIST - called in ListHeader.js
  // This function removes a user_list directly from the current user
  function deleteUserList(userListId) {
    setUser({...user, user_lists: user.user_lists.filter(userList => userList.id !== userListId)})
  }

  // NEW USERLIST - called in NewList.js
  // when a new list is created, the backened creates and returns a new userlist, including the new list
  function addNewUserList(newUserList) {
    setUser({...user, user_lists: [...user.user_lists, newUserList]})
  }

  // * LIST ACTIONS *

  // DELETE LIST - called in ListHeader.js
  function deleteList(listId) {
    setUser({...user, user_lists: user.user_lists.filter(userList => userList.list.id !== listId)})
  }

  // * TASK ACTIONS *

  //  NEW TASK - called in List.js
  function addNewTaskToList(newTask, listId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: userList.list.id === listId ?
        {...userList.list, tasks: [...userList.list.tasks, newTask]} :
        userList.list}
    })})
  }

  // UPDATE TASK - called in Task.js
  function updateTaskInState(updatedTask) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: userList.list.tasks
        .map(task => task.id === updatedTask.id ? updatedTask : task)}}
    })})
  }

  // DELETE TASK - called in Task.js
  function removeTaskFromState(taskId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: userList.list.tasks
        .filter(task => task.id !== taskId)}}
    })})
  }

  // * USERLIST ACTIONS * 
  // called in Collaborators.js
  function addNewCollaborator(newCollaborator) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, user_lists: [...userList.list.user_lists, newCollaborator]}}
    })})
  }

  // UPDATE USERLIST - called in collaborator
  function updateCollaborator(updatedUserList) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, user_lists: userList.list.user_lists
        .map(userList => userList.id === updatedUserList.id ? updatedUserList : userList)}}
    })})
  }

  // DELETE USERLIST - called in collaborator
  function deleteCollaborator(collaboratorId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, user_lists: userList.list.user_lists
        .filter(userList => userList.id !== collaboratorId)}}
    })})
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      addNewUserList,
      deleteUserList,
      addNewTaskToList,
      deleteList,
      updateTaskInState,
      removeTaskFromState,
      addNewCollaborator,
      updateCollaborator,
      deleteCollaborator }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }
