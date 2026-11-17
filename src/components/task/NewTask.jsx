
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTask } from "../../contexts/TaskContext";
import { Loading } from "../ui/Loading";
import { useNavigate } from "react-router-dom";
import { createTaskSchema } from "../../schemas/task.schema";

export const NewTask = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createTaskSchema)
    });

    const { createTask, isFetching, error } = useTask();

    const onSubmit = async (data) => {
        const result = await createTask(data);

        if (result) {
            navigate("/task");
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

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
                    Create Task
                </button>
            </form>

            {isFetching && <Loading />}
        </div>
    );
};
