import React from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import WelcomeHeader from './WelcomeHeader';

function Home() {
    return (
        <div>
            <WelcomeHeader />
            <TaskInput />
            <TaskList />
        </div>
    );
}

export default Home;
