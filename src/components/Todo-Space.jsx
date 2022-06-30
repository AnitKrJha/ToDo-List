import Header from "./header";
import { useState } from "react";
let id = 0;
function TodoSpace() {
  const [todos, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);

  function addTodo(e) {
    e.preventDefault();

    setTodo((oldTodo) => {
      setTask("");
      setTotal((oldTotal) => oldTotal + 1);
      setPending((oldPending) => oldPending + 1);
      return [...oldTodo, { task: task, id: id++, pending: true }];
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
      item.pending = !item.pending;
      console.log(todos);
      setPending((oldPending) => oldPending - 1);
    } else {
      e.target.innerText = "Pending";
      item.pending = !item.pending;
      console.log(todos);
      setPending((oldPending) => oldPending + 1);
    }
  }
  return (
    <>
      <Header total={total} pending={pending} />
      <form>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask((oldTask) => e.target.value)}
        />
        <button type="submit" onClick={addTodo}>
          Add Task
        </button>
      </form>
      <ol>
        {todos.map((todoItem) => {
          return (
            <div key={todoItem.id}>
              <li>
                {todoItem.task} ,{todoItem.id}
              </li>
              <button onClick={() => deleteTodo(todoItem)}>Delete</button>
              <button onClick={(e) => ToggleStatus(todoItem, e)}>
                Pending
              </button>
            </div>
          );
        })}
      </ol>
    </>
  );
}
export default TodoSpace;
