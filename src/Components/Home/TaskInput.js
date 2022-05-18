/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import TaskList from './TaskList';

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
        const task = {
            title: data.title,
            description: data.description,
            userName: user.email,
            completed: false,
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
                    reset();
                    refetch();
                } else {
                    toast.error('failed to add the doctor!');
                }
            });
    };

    const handleDelete = (task) => {
        fetch('http://localhost:5000/delete', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    toast.success(`Deleted: ${task.title}`);
                    refetch();
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

                    <TaskList handleDelete={handleDelete} tasks={tasks} refetch={refetch} />
                </table>
            </div>
        </>
    );
}

export default TaskInput;
