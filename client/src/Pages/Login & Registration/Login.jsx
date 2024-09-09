import React, { useContext, useState } from 'react';

import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const { signIn, signWithGoogle, passReset } = useContext(AuthContext);
    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);
    const [email, setEmail] = useState('');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;



        signIn(email, password)
            .then((res) => {
                const user = res.user;
                console.log(user);
                navigate('/');

                const loggedUser = {
                    email: user.email
                };

                console.log(loggedUser);

                fetch('http://localhost:3000/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("JWT", data);
                        localStorage.setItem('token', data.token);
                    });

                Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                });
            })
            .catch((err) => console.log(err));
    };

    const handleGoogle = () => {
        signWithGoogle()
            .then((res) => {
                const { user } = res;
                const loggedUser = {
                    email: user.email
                };

                const userDetails = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                }

                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                })

                fetch('http://localhost:3000/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log("JWT", data);
                        localStorage.setItem('token', data.token);
                        navigate('/');
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success"
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };

    const handleForget = (e) => {
        e.preventDefault();
        if (!email) {
            Swal.fire({
                title: "Please enter your email",
                icon: "warning"
            });
            return;
        }

        passReset(email)
            .then((res) => {
                Swal.fire({
                    title: "Password reset link has been sent to your email",
                    icon: "success"
                });
            })
            .catch((err) => console.log('Error in password reset', err));
    };

    return (
        <div className="lg:mt-32 mt-24 mb-28 font-abc">

            <Helmet>
                <title>Login Page</title>
            </Helmet>

            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src='https://krishnecs.in/wp-content/uploads/2023/09/login-animate-2.gif' alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-5xl font-bold text-center">Login</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    type={pass ? 'password' : 'text'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    name='password'
                                    required
                                />
                                <button className='btn ml-2 text-xl' onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <label className="label">
                                <a onClick={handleForget} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-xl border-none text-white">Login</button>
                        </div>

                        <div className='flex flex-col items-center mt-4 gap-4'>
                            <p className='text-gray-700 text-lg font-medium'>Or Login In with</p>

                            <button className='text-3xl btn' onClick={handleGoogle}><FcGoogle /></button>

                            <p className='text-gray-600 text-base font-medium'>Don't have an account? <Link className='text-lg text-[#FF3811]' to='/register'>Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
