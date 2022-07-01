import Header from "./header";
import { useState } from "react";
let id = 0;
function TodoSpace() {
  const [todos, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);

  function addTodo(e) {

    function tomodiUpperCase(s){
      return s[0].toUpperCase()+s.slice(1);
    }
    e.preventDefault();

    setTodo((oldTodo) => {
      setTask("");
      setTotal((oldTotal) => oldTotal + 1);
      setPending((oldPending) => oldPending + 1);
      
      return [...oldTodo, { task: tomodiUpperCase(task), id: id++, pending: true }];
    });
  }
  function deleteTodo(z) {
    setTotal((oldTotal) => oldTotal - 1);
    setPending((oldPending) => {
      if (z.pending) return oldPending - 1;
      return oldPending;
    });
    setTodo((oldTodo) => {
      return oldTodo.filter((x) => x.id !== z.id);
    });
  }
  function ToggleStatus(item, e) {
    if (item.pending) {
      e.target.innerText = "Complete";
      e.target.classList.toggle("btn-danger");
      item.pending = !item.pending;
      console.log(todos);
      setPending((oldPending) => oldPending - 1);
    } else {
      e.target.classList.toggle("btn-danger");
      e.target.innerText = "Pending";
      item.pending = !item.pending;
      console.log(todos);
      setPending((oldPending) => oldPending + 1);
    }
  }
  return (
    <>
      <Header total={total} pending={pending} />
      <form className="container d-flex align-items-center justify-content-center mt-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask((oldTask) => e.target.value)}
          className="form-control flex-grow-0 w-75 mx-5"
        />
        <button type="submit" onClick={addTodo} className="btn btn-primary">
          Add Task
        </button>
      </form>
      <ol
        style={{
          width: "fit-content",
          margin: "auto",
          marginTop:'1em',
          minWidth: "min(1100px , 90%)",
          maxWidth: "95%",
          background: "rgba(12,23,23,.1)",
          padding: "1em",
          borderRadius: "10px",
        }}
      >
        {todos.map((todoItem, index) => {
          return (
            <div
              key={todoItem.id}
              className="container d-flex align-items-center justify-content-between bg-dark text-light mt-3 rounded-2 py"
            >
              <li className="d-flex align-items-center">
                <span className="mx-2 bg-light text-dark rounded-3 p-1 text-weight-bold lead">
                  <strong>{index + 1}</strong>
                </span>
                <span className="bg-light text-dark rounded-1 p-1 mx-3 font-italic">
                  {todoItem.task}
                </span>
              </li>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-primary  mx-2"
                  onClick={() => deleteTodo(todoItem)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-danger btn-success align-text-middle my-2 mx-2 "
                  onClick={(e) => ToggleStatus(todoItem, e)}
                >
                  Pending
                </button>
              </div>

            </div>
          );
        })}
      </ol>
    </>
  );
}
export default TodoSpace;
