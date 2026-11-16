import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { Loading } from "../ui/Loading";
import { useForm } from "react-hook-form";

export const EditTask = () => {

    const navigate = useNavigate();

    const { findTask, isFetching, error, updateTask } = useTask();

    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = async (taskData) => {
        const result = await updateTask(id, taskData);
        if (result) {
            navigate("/task");
        }
    }

    useEffect(() => {
        if (!id) return;
        const fetchTask = async () => {
            const task = await findTask(id);
            if (task) {
                setValue("title", task.title);
                setValue("description", task.description);
            }
        }
        fetchTask();
    }, []);


    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>
    }

    return (
        <div>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        disabled={isFetching}
                        {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must be at least 3 characters" } })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        disabled={isFetching}
                        {...register("description", { required: "Description is required", minLength: { value: 10, message: "Description must be at least 10 characters" } })}
                    ></textarea>
                    {errors.description && <span>{errors.description.message}</span>}
                </div>

                <button type="submit" disabled={isFetching}>Update Task</button>
            </form>

            {
                isFetching && <Loading />
            }
        </div>
    )
}
