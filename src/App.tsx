import React, { useState, useEffect, ChangeEvent } from "react";
import TodoList from "./components/TodoList";
import Top from "./components/Top";
import { categories, priorities } from "./data";

interface Todo {
  id: string;
  title: string;
  priority: string;
  category: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState<{ title: string; priority: string; category: string }>({
    title: "",
    priority: "all",
    category: "all",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...todoValue, completed: false })
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data = await response.json();

      setTodos(prevTodos => [...prevTodos, data]);
      setTodoValue({
        title: "",
        priority: "all",
        category: "all",
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async (id: string, updatedTodo: Todo) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
      });

      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }

      fetchTodos();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
      if (confirmDelete) {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }

        fetchTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) throw new Error("Todo not found");

      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
      });

      if (!response.ok) {
        throw new Error("Failed to toggle todo");
      }

      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTodoValue(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  return (
    <div className="container mx-auto">
      <Top
        todoValue={todoValue}
        handleChange={handleChange}
        addTodo={addTodo}
        priorities={priorities}
        categories={categories}
      />
      <TodoList todos={todos} fetchTodos={fetchTodos} deleteTodo={deleteTodo} editTodo={editTodo} categories={categories} priorities={priorities} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
