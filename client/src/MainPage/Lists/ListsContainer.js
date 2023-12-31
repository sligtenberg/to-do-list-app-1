import { useContext } from "react";
import { UserContext } from "../../Context/user";
import List from "./List";

function ListsContainer() {
  const { user } = useContext(UserContext)
  const lists = user.user_lists.map(userList => <List key={userList.id} userList={userList}/>)

  return lists;
}

export default ListsContainer;
