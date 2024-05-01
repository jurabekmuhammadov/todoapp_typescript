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
    toggleTodo: (id: string) => void,
    categories: string[];
    priorities: string[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, fetchTodos, deleteTodo, editTodo, categories, priorities, toggleTodo }) => {
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
            fetchTodos();
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {todos.map((todo) => (
                <div key={todo.id} className="bg-slate-400 flex justify-between items-center p-4 rounded-md">
                    {editingTodo && editingTodo.id === todo.id ? (
                        <form onSubmit={handleEditSubmit}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={editedTodo?.title || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={editedTodo?.priority || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Priority</option>
                                    {priorities.map((priority) => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 mb-4">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={editedTodo?.category || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="p-2 mx-2 bg-blue-600">Save</button>
                            <button type="button" className="p-2 mx-2 bg-red-600" onClick={handleEditCancel}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <p>{todo.title}</p>
                            <div className="flex gap-3">
                                <span>{todo.completed ? "Completed" : "Pending"}</span>
                                <button className="bg-green-600 p-1 text-white capitalize" onClick={() => handleEditStart(todo)}>edit</button>
                                <button className="bg-red-600 p-1 text-white capitalize" onClick={() => deleteTodo(todo.id)}>delete</button>
                                <button className="bg-blue-600 p-1 text-white capitalize" onClick={() => toggleTodo(todo.id)}>{todo.completed ? "Mark as uncomplete" : "Mark as complete"}</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TodoList;
