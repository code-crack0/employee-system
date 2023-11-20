import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextProvider";

const SignUp = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const departmentRef = useRef();
    const phoneRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            department: departmentRef.current.value,
            phone: phoneRef.current.value,
        };
        console.log(payload);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
                console.log(user,token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create an Account</h1>
                    {
                        errors && (
                            <div className="alert">
                                {
                                    Object.keys(errors).map(key => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))
                                }
                            </div>
                        )
                    }
                    <input
                        ref={firstNameRef}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        ref={lastNameRef}
                        type="text"
                        placeholder="Last Name"
                    />
                    <input
                        ref={departmentRef}
                        type="text"
                        placeholder="Department"
                    />
                    <input
                        ref={phoneRef}
                        type="number"
                        placeholder="Phone Number"
                    />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block" type="submit">
                        Sign Up
                    </button>
                    <p className="message">
                        Already Registered? <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
