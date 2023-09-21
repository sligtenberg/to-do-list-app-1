import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // called in NewList.js
  function addNewUserList(newUserList) {
    setUser({...user, user_lists: [...user.user_lists, newUserList]})
  }

  // called in Collaborators.js
  function addNewCollaborator(newCollaborator) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, user_lists: [...userList.list.user_lists, newCollaborator]}}
    })})
  }

  // called in List.js
  function addNewTaskToList(newTask, listId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: userList.list.id === listId ?
        {...userList.list, tasks: [...userList.list.tasks, newTask]} :
        userList.list}
    })})
  }

  // called in List.js
  function deleteUserList(userListId) {
    setUser({...user, user_lists: user.user_lists.filter(userList => userList.id !== userListId)})
  }

  // called in Task.js
  function updateTaskInState(updatedTask) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: userList.list.tasks
        .map(task => task.id === updatedTask.id ? updatedTask : task)}}
    })})
  }

  // called in Task.js
  function removeTaskFromState(taskId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: userList.list.tasks
        .filter(task => task.id !== taskId)}}
    })})
  }

  function updateUserList(updatedUserList) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, user_lists: userList.list.user_lists
        .map(userList => userList.id === updatedUserList.id ? updatedUserList : userList)}}
    })})
  }

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
      addNewTaskToList,
      deleteUserList,
      updateTaskInState,
      removeTaskFromState,
      addNewCollaborator,
      updateUserList,
      deleteCollaborator }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }
