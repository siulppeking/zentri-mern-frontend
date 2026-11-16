/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import {
    countTasksService,
    createTaskService,
    deleteTaskService,
    findAllTasksService,
    findTaskService,
    updateTaskService
} from "../services/task.service";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [count, setCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const countTasks = async () => {
        try {
            setIsFetching(true);
            setError(null);
            const data = await countTasksService();
            setCount(data.count);
        } catch (error) {
            setError(error.response?.data?.message || "Error counting tasks");
            console.error("Error counting tasks:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const findAllTasks = async () => {
        try {
            setIsFetching(true);
            setError(null);
            const data = await findAllTasksService();
            setTasks(data);
        } catch (error) {
            setError(error.response?.data?.message || "Error fetching tasks");
            console.error("Error fetching tasks:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const createTask = async (taskData) => {
        try {
            setIsFetching(true);
            setError(null);
            const data = await createTaskService(taskData);
            return data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError(error.response?.data?.message || "Error creating task");
            return null;
        } finally {
            setIsFetching(false);
        }
    };

    const findTask = async (taskId) => {
        try {
            setIsFetching(true);
            setError(null);
            const data = await findTaskService(taskId);
            return data;
        } catch (error) {
            console.error("Error fetching task:", error);
            setError(error.response?.data?.message || "Error fetching task");
            return null;
        } finally {
            setIsFetching(false);
        }
    };

    const updateTask = async (taskId, taskData) => {
        try {
            setIsFetching(true);
            setError(null);
            const data = await updateTaskService(taskId, taskData);
            return data;
        } catch (error) {
            console.error("Error updating task:", error);
            setError(error.response?.data?.message || "Error updating task");
            return null;
        } finally {
            setIsFetching(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            setIsFetching(true);
            setError(null);
            await deleteTaskService(taskId);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            return true;
        } catch (error) {
            setError(error.response?.data?.message || "Error deleting task");
            console.error("Error deleting task:", error);
            return false;
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <TaskContext.Provider value={{
            count,
            tasks,

            isFetching,
            error,

            countTasks,
            findAllTasks,
            createTask,
            findTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
}