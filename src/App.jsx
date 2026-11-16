import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Index } from "./pages/Index"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Task } from "./pages/Task"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { NewTask } from "./components/task/NewTask"
import { EditTask } from "./components/task/EditTask"
import { Dashboard } from "./pages/Dashboard"

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/task-new" element={<NewTask />} />
          <Route path="/task/:id" element={<EditTask />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}