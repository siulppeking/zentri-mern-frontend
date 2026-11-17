
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { Loading } from "../ui/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema } from "../../schemas/task.schema";

export const EditTask = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { findTask, isFetching, error, updateTask } = useTask();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(updateTaskSchema)
    });

    const onSubmit = async (taskData) => {
        const result = await updateTask(id, taskData);

        if (result) {
            navigate("/task");
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchTask = async () => {
            const task = await findTask(id);

            if (task) {
                setValue("title", task.title);
                setValue("description", task.description);
                setValue("completed", task.completed);
            }
        };

        fetchTask();
    }, [id]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        disabled={isFetching}
                        {...register("title")}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        disabled={isFetching}
                        {...register("description")}
                    />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>

                <button type="submit" disabled={isFetching}>
                    Update Task
                </button>
            </form>

            {isFetching && <Loading />}
        </div>
    );
};
