/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
import React from 'react';

function TaskList({ handleDelete, tasks, refetch }) {
    const handleComplete = (completedTask) => {
        fetch('http://localhost:5000/update', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(completedTask),
        })
            .then((res) => res.json())
            .then(() => {
                refetch();
            });
    };
    return (
        <tbody>
            {tasks?.map((task, index) => (
                <tr className={task?.completed ? 'text-gray-600 line-through' : ''} key={task._id}>
                    <th>{index + 1}</th>
                    <th>{task.title}</th>
                    <th>{task.description}</th>

                    <th className="flex items-center space-x-3">
                        <button type="button" onClick={() => handleComplete(task)} className="">
                            <svg
                                fill="green"
                                version="1.1"
                                width="24"
                                height="24"
                                x="0px"
                                y="0px"
                                viewBox="0 0 490.4 490.4"
                                xmlSpace="preserve"
                                className="text-green-600 hover:scale-110"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M245.2,490.4c135.2,0,245.2-110,245.2-245.2S380.4,0,245.2,0S0,110,0,245.2S110,490.4,245.2,490.4z M245.2,24.5
    c121.7,0,220.7,99,220.7,220.7s-99,220.7-220.7,220.7s-220.7-99-220.7-220.7S123.5,24.5,245.2,24.5z"
                                        />
                                        <path
                                            d="M206.5,349.6c2.3,2.3,5.4,3.6,8.7,3.6l0,0c3.2,0,6.3-1.3,8.6-3.6l147.5-146.7c2.3-2.3,3.6-5.4,3.6-8.7
    c0-3.2-1.3-6.4-3.6-8.7l-44.6-44.8c-4.8-4.8-12.5-4.8-17.3-0.1l-94,93.5l-34.2-34.4c-2.3-2.3-5.4-3.6-8.7-3.6l0,0
    c-3.2,0-6.3,1.3-8.6,3.6l-44.8,44.6c-2.3,2.3-3.6,5.4-3.6,8.7c0,3.2,1.3,6.4,3.6,8.7L206.5,349.6z M172.5,225.7l34.3,34.5
    c4.8,4.8,12.5,4.8,17.3,0.1l94-93.5l27.3,27.4L215.3,323.6L145.1,253L172.5,225.7z"
                                        />
                                    </g>
                                </g>
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                                <g />
                            </svg>
                        </button>
                        <button onClick={() => handleDelete(task)} type="button">
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
    );
}

export default TaskList;
