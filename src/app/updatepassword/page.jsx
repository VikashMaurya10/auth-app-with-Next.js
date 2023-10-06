"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { toast } from "react-toastify";

const page = () => {
    const router = useRouter()
    const [typePassword, setTypePassword] = useState(false)
    const [incodedToken, setInCodedToken] = useState("")
    const [getInput, setGetInput] = useState({
        createPassword: '',
        password: ''
    })
    useEffect(() => {
        const incodedToken = window.location.search.split('=')[1]
        setInCodedToken(incodedToken)
    }, [])

    const handlePass = () => {
        setTypePassword(!typePassword)
    }

    const dataToBeSend = {
        incodedToken: incodedToken,
        password: getInput.password
    }
    const updatePassword = async () => {
        await axios({
            method: "post",
            url: "api/user/updatepassword",
            data: dataToBeSend
        }).then((res) => {
            if (res?.data?.error) {
                router.push("/forgotpassword")
                return toast.warning(res?.data?.error)
            }
            if (res?.data?.message) {
                toast.success(res?.data?.message)
                return router.push("/login")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const { value, id } = e.target
        setGetInput({
            ...getInput, [id]: value
        })
    }

    const handleSubmit = () => {
        updatePassword()
    }

    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px]  p-6 m-5 rounded-md bg-white'>
                <h1 className='font-robo font-bold text-3xl text-left w-full'>Update your password</h1>
                <form className='w-full'>
                    {/* create pass */}
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="password"
                            placeholder='Create password'
                            id='createPassword'
                            value={getInput.createPassword}
                            onChange={handleChange}
                            className=' py-1 w-full  bg-transparent text-black'
                        />
                        <div className='w-full h-[0.1rem] bg-hero-pattern rounded-sm'></div>
                    </div>

                    {/* confirm pass */}
                    <div className='w-full mt-4'>
                        <div className='flex gap-1'>
                            <input
                                autoComplete='off'
                                type={typePassword ? "text" : "password"}
                                placeholder='Confirm password'
                                id='password'
                                value={getInput.password}
                                onChange={handleChange}
                                className=' py-1 w-full  bg-transparent text-black'
                            />
                            <button
                                type='button'
                                onClick={handlePass}
                                className='text-lg '
                            >
                                {
                                    typePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                }
                            </button>
                        </div>
                        <div className='w-full h-[0.1rem] bg-hero-pattern rounded-sm'></div>
                    </div>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-hero-pattern w-full '
                    >
                        Continue
                    </button>
                </form>
            </div>
        </section>
    )
}

export default page