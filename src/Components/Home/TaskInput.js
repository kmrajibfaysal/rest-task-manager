/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';

function TaskInput() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAdd = (data) => {
        console.log(data);
    };
    return (
        <form
            onSubmit={handleSubmit(handleAdd)}
            className="mx-auto mt-4 flex w-full flex-col items-center space-y-2  md:max-w-2xl"
        >
            <input
                {...register('title', {
                    required: { value: true, message: 'Title is required!' },
                })}
                placeholder="Title"
                className="input input-bordered w-full max-w-xs text-lg"
                type="text"
            />
            <p className=" text-red-500">{errors.title?.message}</p>
            <input
                {...register('description', {
                    required: { value: true, message: 'Description is required!' },
                })}
                placeholder="Description"
                className="input input-bordered h-16 w-full max-w-xs"
                type="text"
            />
            <p className="mt-3 text-red-500">{errors.description?.message}</p>
            <button type="submit" className="btn btn-primary text-white">
                Add
            </button>
        </form>
    );
}

export default TaskInput;
