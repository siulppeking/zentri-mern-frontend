import { useEffect } from "react";
import { useTask } from "../contexts/TaskContext";
import { Loading } from "../components/ui/Loading";

export const Dashboard = () => {

    const { count, isFetching: loading, countTasks } = useTask();

    useEffect(() => {
        countTasks();
    }, []);

    return (
        <div>
            {
                loading && <Loading />
            }
            <p>Welcome to the dashboard!</p>
            {loading ? (
                <p>Loading task count...</p>
            ) : (
                <p>Total tasks: {count}</p>
            )}


        </div>
    )
}
