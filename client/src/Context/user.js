import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // called in NewList.js
  function addNewUserList(newUserList) {
    setUser({...user, user_lists: [...user.user_lists, newUserList]})
  }

  // called in List.js
  function addNewTaskToList(newTask) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: [...userList.list.tasks, newTask]}}
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

  function removeTaskFromState(taskId) {
    setUser({...user, user_lists: user.user_lists.map(userList => {
      return {...userList, list: {...userList.list, tasks: userList.list.tasks
        .filter(task => task.id !== taskId)}}
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
      removeTaskFromState }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }
