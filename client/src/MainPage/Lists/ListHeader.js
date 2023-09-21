import { useLocation, useNavigate } from "react-router-dom";

function ListHeader({ setExpand, expand, list, handleXClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      <span onClick={() => setExpand(!expand)} className='task-name hover-pointer'>{list.name} </span>
      {expand ?
        <span
            onClick={() => navigate(`/collaborators/${list.id}`)}
            state={{ background: location }}
            className='hover-pointer'>
              - collaborators
        </span> : null}
      {handleXClick ? <span onClick={handleXClick} className='float-right hover-pointer'>X</span> : null}
    </div>
  );
}

export default ListHeader;
