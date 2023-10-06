"use client"

import { isValidEmail } from "@/helpers/validationMethods"
import axios from "axios"
import React, { useState } from "react"
import { toast } from "react-toastify"

const Page = () => {
    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const getForgotPassToken = async () => {
        await axios({
            method: 'post',
            url: '/api/user/forgotpassword',
            data: { email }
        }).then((res) => {
            if (res?.data?.error) {
                return toast.warn(res?.data?.error)
            }

            if (res?.data?.message) {
                return toast.warn(res?.data?.message)
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSubmit = () => {
        const validEmail = isValidEmail(email)
        if (validEmail) {
            getForgotPassToken()
        }

    }
    return (
        <section className='flex items-center justify-center h-screen'>
            <section className='flex items-center justify-center h-screen'>
                <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px] p-6 m-5 rounded-md bg-white'>
                    <h1 className='font-robo font-bold text-3xl text-left w-full'>Forgot Password</h1>
                    <p className="text-base">Please enter your e-mail address. You will receive an e-mail along with a link which can be used to reset your password.</p>
                    <form className='w-full'>
                        <div className='w-full mt-4'>
                            <input
                                autoComplete='off'
                                type="email"
                                id="email"
                                placeholder='You email'
                                className='py-1 w-full bg-transparent text-black'
                                onChange={handleChange}
                            />
                            <div className='w-full h-[0.1rem] bg-hero-pattern rounded-sm'></div>
                        </div>
                        <button
                            type='button'
                            className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-hero-pattern w-full '
                            onClick={handleSubmit}
                        >
                            Continue
                        </button>
                    </form>
                </div>

            </section >
        </section>
    )
}

export default Page