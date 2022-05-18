/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

function Navbar() {
    return (
        <div className=" bg-pink-100">
            <div className="container navbar mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl normal-case">Task Manager</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" />
                    </div>
                    <div className="dropdown-end dropdown">
                        <label tabIndex="0" className="avatar btn btn-ghost btn-circle">
                            <div className="w-10 rounded-full">
                                <img src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon" />
                            </div>
                        </label>
                        <ul
                            tabIndex="0"
                            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
