import React, { ChangeEvent } from "react";

interface TopProps {
  todoValue: { title: string; priority: string; category: string, completed: boolean };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  addTodo: () => void;
  priorities: string[];
  categories: string[];
}

const Top: React.FC<TopProps> = ({ todoValue, handleChange, addTodo, priorities, categories }) => {
  return (
    <div>
      <form className="flex my-10 gap-5 items-end" onSubmit={addTodo}>
        <div className="flex flex-col gap-2 w-3/5">
          <label htmlFor="add_todo">Title</label>
          <input
            required
            type="text"
            id="add_todo"
            name="title"
            className="p-3 bg-slate-300 rounded-md placeholder-gray-600"
            placeholder="Enter what you want..."
            value={todoValue.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/5">
          <label htmlFor="priority">Priority</label>
          <select
            required
            name="priority"
            id="priority"
            className="p-3 bg-slate-300 rounded-md"
            value={todoValue.priority}
            onChange={handleChange}
          >
            <option value="all">Select priority</option>
            {priorities.map((pr) => (
              <option key={pr} value={pr}>{pr}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/5">
          <label htmlFor="category">Category</label>
          <select
            required
            name="category"
            id="category"
            className="p-3 bg-slate-300 rounded-md"
            value={todoValue.category}
            onChange={handleChange}
          >
            <option value="all">Select category</option>
            {categories.map((ctg) => (
              <option key={ctg} value={ctg}>{ctg}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-36 py-2 text-white bg-green-600 rounded-md">Add</button>
      </form>
    </div>
  );
}

export default Top;
