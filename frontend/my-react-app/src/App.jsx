import { useEffect, useState } from 'react'
function App() {
  const [title, setTitle] = useState("")
  const [task, setTask] = useState([])
  const API = "http://localhost:5050/api/task"
  // Function to get tasks
  async function getTask() {
    const response = await fetch(API)
    const data = await response.json()
    setTask(data)
  }
  useEffect(() => {
    getTask()
  }, [])
  // Function to add task
  async function addTask(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert("Title Missing")
      return
    }
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title })
    })
    if (!response.ok) {
      alert("Failed to add task")
      return
    }
    setTitle("")
    getTask()
  }
  // Function to delete task
  async function deleteTask(id) {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    })
    if (!response.ok) {
      alert("Failed to delete task")
      return
    }
    getTask()
  }
  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {task.map((item) => (
          <li key={item._id}>
            {item.title}
            <button onClick={() => deleteTask(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App
