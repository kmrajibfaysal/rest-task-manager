/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    useSignInWithEmailAndPassword,
    // eslint-disable-next-line prettier/prettier
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [seePass, setSeePass] = useState(false);

    // handle redirect auth
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // google sign in
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    // email password login
    const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
        useSignInWithEmailAndPassword(auth);

    const handleEmailLogin = async (data) => {
        const { email, password } = data;
        signInWithEmailAndPassword(email, password);
    };

    if (userEmail || userGoogle) {
        navigate(from, { replace: true });
    }

    // reset handleResetPassword
    // const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const handleResetPassword = () => {};

    // Loading spinner
    if (loadingEmail) {
        return <Loading />;
    }

    return (
        <div className="w-full px-4 md:py-8">
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-[480px] rounded-xl  bg-white p-10 shadow">
                    <p
                        aria-label="Login to your account"
                        className="mb-12 text-center text-2xl font-bold leading-6 text-gray-800"
                    >
                        Login
                    </p>

                    <form onSubmit={handleSubmit(handleEmailLogin)}>
                        <div>
                            <label className="text-sm font-medium leading-none text-gray-800">
                                Email
                            </label>
                            <input
                                {...register('email', {
                                    required: { value: true, message: 'Email is required!' },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Please enter a valid email!',
                                    },
                                })}
                                aria-label="enter email address"
                                role="input"
                                type="email"
                                className={`text-md mt-2 w-full rounded border border-gray-200
                                bg-gray-100 py-3 pl-3 font-medium leading-none text-gray-800 focus:outline-none `}
                            />
                            <p className="mt-3 text-red-500">{errors.email?.message}</p>
                        </div>
                        <div className="mt-6  w-full">
                            <label className="text-sm font-medium leading-none text-gray-800">
                                Password
                            </label>
                            <div className="relative flex items-center justify-center">
                                <input
                                    {...register('password', {
                                        required: { value: true, message: 'Password is required.' },
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters long',
                                        },
                                        pattern: {
                                            value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/,
                                            message: 'Password must contains 1 letter and 1 number',
                                        },
                                    })}
                                    aria-label="enter Password"
                                    role="input"
                                    type={seePass ? 'text' : 'password'}
                                    className={`text-md mt-2 w-full rounded border border-gray-200
                                     bg-gray-100 py-3 pl-3 font-medium leading-none text-gray-800 focus:outline-none `}
                                />

                                <button
                                    type="button"
                                    onClick={() => setSeePass(!seePass)}
                                    className="absolute right-0 mt-2 mr-3 cursor-pointer"
                                >
                                    <svg
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                            fill="#71717A"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="mt-3 text-red-500">{errors.password?.message}</p>
                            <p className="mt-3 text-red-500">
                                {errorEmail ? 'Wrong email or password. Please try again!' : ''}
                            </p>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col items-start" />
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className=" mb-4 cursor-pointer text-right text-sm font-semibold text-gray-800 hover:text-accent hover:underline"
                            >
                                Forgot password?
                            </button>
                            <button
                                type="submit"
                                aria-label="Login"
                                className="text-md btn w-full   py-4 font-bold leading-none text-white hover:bg-accent"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-5 text-center text-sm font-medium leading-none text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/register"
                            tabIndex={0}
                            role="link"
                            aria-label="Register here"
                            className="cursor-pointer text-sm font-medium leading-none text-secondary hover:underline"
                        >
                            Create new account
                        </Link>
                    </div>
                    <div className="flex w-full items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                        <p className="px-2.5 text-base font-medium leading-4 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  " />
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        aria-label="register"
                        className="text-md btn btn-outline w-full font-bold uppercase leading-none text-accent"
                    >
                        continue with google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
