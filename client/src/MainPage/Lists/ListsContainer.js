import { useContext } from "react";
import { UserContext } from "../../Context/user";
import UserList from "./UserList";

function ListsContainer() {
  const { user } = useContext(UserContext)
  const userLists = user.user_lists.map(userList => <UserList key={userList.id} userList={userList}/>)

  return userLists;
}

export default ListsContainer;
