import { useEffect } from "react";
import { useTask } from "../contexts/TaskContext";
import { TaskCard } from "../components/task/TaskCard";
import { Loading } from "../components/ui/Loading";

export const Task = () => {

    const { tasks, isFetching, findAllTasks } = useTask();

    useEffect(() => {
        findAllTasks();
    }, []);

    return (
        <div>
            {
                isFetching && <Loading />
            }
            {isFetching ? (
                <p>Loading tasks...</p>
            ) : (
                <div className="card-container">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}
