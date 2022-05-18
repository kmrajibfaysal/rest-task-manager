import React from 'react';
import TaskInput from './TaskInput';
import WelcomeHeader from './WelcomeHeader';

function Home() {
    return (
        <div>
            <WelcomeHeader />
            <TaskInput />
        </div>
    );
}

export default Home;
