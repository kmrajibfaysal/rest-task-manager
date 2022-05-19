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
        fetch(`https://shrouded-plains-29126.herokuapp.com/tasks?email=${email}`).then((res) =>
            res.json()
        )
    );

    const handleAdd = (data) => {
        const task = {
            title: data.title,
            description: data.description,
            userName: user.email,
            completed: false,
        };
        fetch('https://shrouded-plains-29126.herokuapp.com/add', {
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
        fetch('https://shrouded-plains-29126.herokuapp.com/delete', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
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
                    className="input input-ghost w-full max-w-xs text-lg"
                    type="text"
                />
                <p className=" text-red-500">{errors.title?.message}</p>
                <input
                    {...register('description', {
                        required: { value: true, message: 'Description is required!' },
                    })}
                    placeholder="Description"
                    className="input input-ghost h-16 w-full max-w-xs"
                    type="text"
                />
                <p className="mt-3 text-red-500">{errors.description?.message}</p>
                <button type="submit" className="btn btn-primary text-white">
                    Add
                </button>
            </form>
            <div className="container mx-auto mt-4 overflow-x-auto">
                <table className="mx-auto w-4/5">
                    <thead>
                        <tr>
                            <th />
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <TaskList handleDelete={handleDelete} tasks={tasks} refetch={refetch} />
                </table>
            </div>
        </>
    );
}

export default TaskInput;
