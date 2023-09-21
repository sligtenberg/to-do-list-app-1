function Instructions() {
  const openRepo = () => window.open('https://github.com/sligtenberg/to-do-list-app-1', "_blank", "noreferrer")
  return (
    <div>
      <h3>Welcome to Collaborative!</h3>
      <p>
        Use the Create New List button to get started with your first list.
        Once you have a list, click the name of the new list to add tasks.
        Tasks can be marked as completed by checking the box to the left.
        Click on the task name to edit it. Add as many tasks as you like.
        The 'X' on the right deletes lists and tasks.
        Click the name of the list again to hide the tasks.
      </p>
      <p>
        Lists can be shared with friends.
        When a list is expanded, click 'collaborators' in the list header.
        Add a collaborator by typing thier username in the text field.
        Check the owner box if you would like them to be an owner of the list.
        You can toggle ownership and remove other collaborators.
      </p>
      <p>
        Owners have full access to lists, meaning they can add, edit, and delete tasks and lists.
        Collaborators who are not owners may only read the lists.
        Owners of lists may add and remove other collaborators, and change their ownership status.
        Be careful not to accidentally remove yourself as an owner - you will need another owner to reinstate you as an owner.
      </p>
      <button onClick={openRepo}>Repo, readme, & instructions</button>
    </div>
  );
}

export default Instructions;
