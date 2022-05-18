import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function WelcomeHeader() {
    const d = new Date();
    const day = weekday[d.getDay()];
    const [user] = useAuthState(auth);
    return (
        <div className="mt-6">
            <h2 className="text-center text-4xl font-bold">Welcome {user?.displayName}</h2>
            <p className="mt-4 text-center text-xl">Plan for {day}</p>
        </div>
    );
}

export default WelcomeHeader;
