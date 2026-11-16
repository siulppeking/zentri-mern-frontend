import http from "../config/http"

export const countTasksService = async () => {
    const res = await http.get("/tasks/count");
    return res.data;
}

export const findAllTasksService = async () => {
    const res = await http.get("/tasks");
    return res.data;
}

export const createTaskService = async (taskData) => {
    const res = await http.post("/tasks", taskData);
    return res.data;
}

export const findTaskService = async (taskId) => {
    const res = await http.get(`/tasks/${taskId}`);
    return res.data;
}

export const updateTaskService = async (taskId, taskData) => {
    const res = await http.put(`/tasks/${taskId}`, taskData);
    return res.data;
}

export const deleteTaskService = async (taskId) => {
    const res = await http.delete(`/tasks/${taskId}`);
    return res.data;
}