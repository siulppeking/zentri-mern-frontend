import { useForm } from "react-hook-form"
import { useTask } from "../../contexts/TaskContext";
import { Loading } from "../ui/Loading";
import { useNavigate } from "react-router-dom";

export const NewTask = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createTask, isFetching, error } = useTask();

    const onSubmit = async (data) => {
        const result = await createTask(data);
        if (result) {
            navigate("/task");
        }
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

                <button type="submit" disabled={isFetching}>Create Task</button>
            </form>
            {
                isFetching && <Loading />
            }
        </div>
    )
}
