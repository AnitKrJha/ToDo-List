function Header({ total, pending }) {
  return (
    <div className="container-fluid bg-dark text-light d-flex justify-content-between align-items-center">
      <h1 className="display-2 flex-grow-1">TODO-APP</h1>
      <div className="d-flex flex-column align-items-center justify-content-center">
      <p className="flex-grow-2 lead">TOTAL TASKS={total}</p>
      <p className="flex-grow-2 lead">PENDING TASKS={pending}</p>
      </div>
    </div>
  );
}

export default Header;
