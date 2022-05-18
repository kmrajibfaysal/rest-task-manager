import React from 'react';

function TaskList() {
    //     const { data: services, isLoading } = useQuery('services', () =>
    //     fetch('http://localhost:5000/service').then((res) => res.json())
    // );
    return (
        <div className="container mx-auto mt-4 overflow-x-auto">
            <table className="table-zebra table w-full">
                <thead>
                    <tr>
                        <th />
                        <th>Title</th>
                        <th>Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>

                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>

                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
