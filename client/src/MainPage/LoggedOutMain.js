function LoggedOutMain() {
  const openRepo = () => window.open('https://github.com/sligtenberg/to-do-list-app-1', "_blank", "noreferrer")

  return (
    <div>
      <h3>Log in or sign up to collaborate!</h3>
      <button onClick={openRepo}>Repo, readme, & instructions</button>
    </div>
  );
}

export default LoggedOutMain;
