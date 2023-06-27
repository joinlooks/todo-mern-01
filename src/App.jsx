import { useEffect, useState } from "react";

const App = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	// Load todos from local storage on component mount
	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	// Save todos to local storage whenever todos change
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleInputChange = (e) => {
		setNewTodo(e.target.value);
	};

	const addTodo = () => {
		if (newTodo.trim() !== "") {
			setTodos([...todos, newTodo]);
			setNewTodo("");
		}
	};

	const removeTodo = (index) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		setTodos(updatedTodos);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			addTodo();
		}
	};

	return (
		<div className="h-screen flex flex-col gap-5 items-center p-3 bg-black text-white">
			<h1 className="text-2xl font-bold mt-3">Todo App</h1>
			<input
				type="text"
				value={newTodo}
				onChange={handleInputChange}
				placeholder="Enter a new todo"
				className="border p-3 w-full max-w-md text-center text-lg rounded-sm bg-black border-gray-700"
				onKeyDown={handleKeyPress}
			/>
			<button
				onClick={addTodo}
				className="bg-gray-900 px-3 py-1 rounded-sm text-lg"
			>
				Add todo
			</button>
			<ul className="w-full flex flex-col gap-1 items-center text-lg mt-5 max-w-md">
				{todos.length !== 0 ? (
					todos.map((todo, index) => (
						<li
							key={index}
							className="bg-gray-950 w-full text-center p-3 rounded-sm flex justify-between"
						>
							{todo}
							<button onClick={() => removeTodo(index)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</li>
					))
				) : (
					<div className="text-gray-500">Nothing to display</div>
				)}
			</ul>
		</div>
	);
};

export default App;
