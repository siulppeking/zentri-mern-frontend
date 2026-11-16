import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Index } from "./pages/Index"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Task } from "./pages/Task"
import { ProtectedRoute } from "./routes/ProtectedRoute"

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/task" element={<Task />} />
          <Route path="/task-add" element={<h1>Create Task</h1>} />
          <Route path="/task/:id" element={<h1>Task Detail</h1>} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}