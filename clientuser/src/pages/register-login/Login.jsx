import React, { useState } from "react";
import useHandleChange from "../user/useHandleChange";

import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/user-api-services/UserService";

const Login = () => {
    
    const navigate = useNavigate();

    let { postLogin } = UserService();

    const { state: fields, handleChange: customHandleChange } = useHandleChange({
        phonenumber: "",
        password: "",
    });

    // const [fields, setFields] = useState({
    //     phonenumber: "",
    //     password: "",
    // });

    const [errorFields, setErrorFields] = useState({
        phonenumber: false,
        password: false,
    });

    const handleChange = (event) => {
        customHandleChange(event);

        // setFields((prev) => ({
        //     ...prev,
        //     [event.target.name]: event.target.value,
        // }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // if (isFormValid()) {
            if (true) {
                try {
                    const response = await postLogin(fields);
                    // localStorage.setItem("userToken", response.data.accessToken);
                    if (response?.data?.message === "login successfull") {
                        toast.success("Login successfull");

                        setTimeout(() => {
                            navigate("/");
                        }, 5000);
                    }
                } catch (error) {
                    console.log("it is login error catch");
                    console.log(error);
                }
            }
        } catch (error) {
            console.log("it is login error catch");
            console.log(error);
        }
    };

    const isFormValid = () => {
        console.log(fields);
        const errors = {
            phonenumber: false,
            password: false,
        };
        if (fields.phonenumber === "" || fields.phonenumber.length != 10 || /^[A-Za-z]+$/.test(fields.phonenumber)) {
            errors.phonenumber = true;
        }
        if (fields.password === "") {
            errors.password = true;
        }

        setErrorFields(errors);

        if (Object.values(errors).some((error) => error === true)) {
            console.log("false");
            return false;
        }
        console.log("true");
        return true;
    };

    return (
        <div className="max-w-full w-full min-h-full user-ogin-background flex justify-center items-center p-2">
            <form
                onSubmit={handleSubmit}
                className="max-w-[300px] w-full min-h-[400px] bg-white rounded-md flex flex-col items-center p-5"
            >
                <h1 className="mt-4 mb-8 font-bold text-[25px] text-[#494646]">Login</h1>
                <div className="mb-8 w-full ">
                    <label htmlFor="" className="text-sm">
                        Phone number
                    </label>
                    <div className="border-b-[1px] border-[#8ce0e0] relative w-full">
                        <div className="absolute left-0 top-1">
                            <FaUserCircle className="text-[#666565]" />
                        </div>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Phone Number"
                            className="pl-5 w-full text-sm h-full outline-none "
                            onChange={handleChange}
                        />
                    </div>
                    {errorFields.phonenumber && <p className="text-xs text-[red]">Phone number not correct</p>}
                </div>
                <div className="w-full">
                    <label htmlFor="" className="text-sm">
                        Password
                    </label>
                    <div className="border-b-[1px] border-[#8ce0e0] relative w-full">
                        <div className="absolute left-0 top-1">
                            <RiLockPasswordFill className="text-[#666565]" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="pl-5 w-full text-sm h-full outline-none "
                            onChange={handleChange}
                        />
                    </div>
                    {errorFields.password && <p className="text-xs text-[red]">Password is required</p>}
                </div>
                <div
                    className="mt-6 h-8 user-ogin-grad w-full flex items-center justify-center rounded-2xl"
                    onClick={handleSubmit}
                >
                    <button className="text-[#5244a5]">Login</button>
                </div>
                <div className="mt-5">
                    <p className="text-sm">
                        Don't have an account ?
                        <span className="text-[#0095F6] cursor-pointer">
                            <Link to="/user-register">Sign up</Link>
                        </span>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
