import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthProvider";
import { Helmet } from "react-helmet-async";
import logo from '../../assets/Cycle/bike.png'
const Register = () => {
    const { createUser, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);




    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const userDetails = {
            name: name,
            email: email,
        }

        fetch('https://ebikes-ten.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })

        createUser(email, password)
            .then((res) => {
                const user = res.user;
                console.log(user);
                navigate("/");

                const loggedUser = {
                    email: user.email,
                };

                console.log(loggedUser);

                fetch("https://handicraft-bd.vercel.app/jwt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loggedUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("JWT", data);
                        localStorage.setItem("token", data.token);

                        updateProfile(auth.currentUser, {
                            displayName: name,
                        })
                            .then((res) => res.json())
                            .then((data) => console.log(data))
                            .catch((err) => console.log(err));
                    });

                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                });
            })
            .catch((err) => console.log(err.message));
    };

    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };

    return (
        <div className="lg:mt-48 mt-24 mb-28 font-abc">
            <Helmet>
                <title>Registration Page</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2 ">
                    <img src='https://longlifevision.com/wp-content/uploads/2024/01/E9TtaYgKZu.gif' className='rounded-3xl' alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-5xl font-bold text-center">Register</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                name="name"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                name="email"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div>
                                <input
                                    type={pass ? 'password' : 'text'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    name="password"
                                    required
                                />
                                <button className="btn ml-2 text-xl" onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-white">
                                Sign In
                            </button>
                        </div>

                        <div className="flex flex-col items-center mt-4 gap-4">
                            <p className=" text-base font-medium">
                                Dont have an account?{" "}
                                <Link className=" text-lg text-[#FF3811]" to="/login">
                                    LogIn
                                </Link>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
