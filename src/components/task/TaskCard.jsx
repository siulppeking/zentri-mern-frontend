import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/date";
import { useTask } from "../../contexts/TaskContext";

export const TaskCard = ({ task }) => {

    const navigate = useNavigate();

    const { deleteTask } = useTask();

    const handleEdit = (id) => {
        navigate('/task/' + id);
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (!confirm) return;
        await deleteTask(id);
    }

    return (
        <div className="card">
            <h4 className="card-title">{task.title}</h4>
            <p className="card-description">{task.description}</p>

            <p className="card-date">{timeAgo(task.createdAt)}</p>

           <div className="card-actions">
             <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
            <button className="btn btn-primary" onClick={() => handleEdit(task.id)}>Edit</button>
           </div>
        </div>
    )
}
