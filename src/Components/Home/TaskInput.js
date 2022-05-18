/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

function TaskInput() {
    const [user] = useAuthState(auth);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const email = user?.email;
    const {
        data: tasks,
        isLoading,
        refetch,
    } = useQuery('services', () =>
        fetch(`http://localhost:5000/tasks?email=${email}`).then((res) => res.json())
    );

    const handleAdd = (data) => {
        console.log(data);
        const task = {
            title: data.title,
            description: data.description,
            userName: user.email,
        };
        fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((inserted) => {
                if (inserted.insertedId) {
                    toast.success('Doctor added successfully.');
                    reset();
                    refetch();
                } else {
                    toast.error('failed to add the doctor!');
                }
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
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
            <div className="container mx-auto mt-4 overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th />
                            <th>Title</th>
                            <th>Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, index) => (
                            <tr key={task._id} className="hover">
                                <th>{index + 1}</th>
                                <th>{task.title}</th>
                                <th>{task.description}</th>
                                <th>
                                    <button type="button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-600 hover:scale-110 hover:text-red-700"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskInput;
