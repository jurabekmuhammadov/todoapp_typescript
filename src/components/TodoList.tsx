import React, { useState } from "react";

interface Todo {
    id: string;
    title: string;
    priority: string;
    category: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    fetchTodos: () => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, updatedTodo: Todo) => void;
    categories: string[];
    priorities: string[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, fetchTodos, deleteTodo, editTodo, categories, priorities }) => {
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

    const handleEditStart = (todo: Todo) => {
        setEditingTodo(todo);
        setEditedTodo({ ...todo });
    };

    const handleEditCancel = () => {
        setEditingTodo(null);
        setEditedTodo(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTodo(prevTodo => ({
            ...prevTodo!,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editedTodo) {
            await editTodo(editedTodo.id, editedTodo);
            setEditingTodo(null);
            setEditedTodo(null);
            fetchTodos(); // Fetch updated todos
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {todos.map((todo) => (
                <div key={todo.id} className="bg-slate-400 flex justify-between items-center p-4 rounded-md">
                    {editingTodo && editingTodo.id === todo.id ? (
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={editedTodo?.title || ""}
                                onChange={handleChange}
                            />
                            <select
                                name="priority"
                                value={editedTodo?.priority || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select Priority</option>
                                {priorities.map((priority) => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                            <select
                                name="category"
                                value={editedTodo?.category || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleEditCancel}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <p>{todo.title}</p>
                            <div className="flex gap-3">
                                <span>{todo.completed ? "Completed" : "Pending"}</span>
                                <button className="bg-green-600 p-1 text-white capitalize" onClick={() => handleEditStart(todo)}>edit</button>
                                <button className="bg-red-600 p-1 text-white capitalize" onClick={() => deleteTodo(todo.id)}>delete</button>
                                <button className="bg-blue-600 p-1 text-white capitalize">{todo.completed ? "Mark as uncomplete" : "Mark as complete"}</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TodoList;
