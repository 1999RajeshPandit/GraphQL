import { useState } from "react";
import "./App.css";
import { gql, useQuery, useMutation } from "@apollo/client";

const query = gql`
  query FetchAllTodos {
    getTodos {
      id
      title
      user {
        name
        email
      }
    }
  }
`;

const addTodo = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const deleteTodo = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);
  const [title, setTitle] = useState("");
  const [addTodoMutation] = useMutation(addTodo, {
    refetchQueries: [{ query }],
  });

  const [deleteTodoMutation] = useMutation(deleteTodo, {
    refetchQueries: [{ query }],
  });

  async function addTodoAPI() {
    if (!title) {
      return;
    }

    try {
      await addTodoMutation({
        variables: {
          title,
          completed: false,
          user_id: 1,
          id: data.getTodos.length + 1,
        },
      });
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  function deleteTodoAPI(id) {
    try {
      deleteTodoMutation({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className="App">
      <h1>TODOS APP</h1>
      <hr />
      <div className="addTodo">
        <input
          style={{
            background: "white",
            padding: "10px 20px",
            border: "0.5px solid grey",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          type="text"
          placeholder="Add Todo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          style={{
            background: "green",
            color: "white",
            padding: "11px 20px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={addTodoAPI}
        >
          ADD
        </button>
      </div>
      {/* <hr /> */}
      <p
        style={{
          color: "tomato",
          fontWeight: "bold",
        }}
      >
        Total count : {data ? data.getTodos.length : 0}
      </p>
      {loading
        ? "Loading..."
        : data.getTodos.map((todo) => (
            <div key={todo.id} className="box">
              <h5>{todo.title}</h5>
              <p>{todo.user.name}</p>
              <p>{todo.user.email}</p>
              <p>
                <button
                  style={{
                    backgroundColor: "tomato",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    width: "90px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteTodoAPI(todo.id)}
                >
                  Delete
                </button>
              </p>
            </div>
          ))}
    </div>
  );
}

export default App;
