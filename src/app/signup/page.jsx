'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { isValidEmail, isValidPassword } from '@/helpers/validationMethods'

const Signup = () => {
    const [typePassword, setTypePassword] = useState(false)
    const [getInput, setGetInput] = useState({
        email: '',
        createPassword: '',
        password: ''
    })
    const router = useRouter()

    const handlePass = () => {
        setTypePassword(!typePassword)
    }

    const handleChange = (e) => {
        const { value, id } = e.target
        setGetInput({
            ...getInput, [id]: value
        })
    }

    const handleSubmit = () => {

        const validEmail = isValidEmail(getInput.email)
        var validPassword = false
        if (validEmail) {
            const validCreatePassword = isValidPassword(getInput.createPassword)
            if (validCreatePassword) {
                if (getInput.createPassword !== getInput.password) {
                    return toast.warning("Password dosen't match")
                }
                validPassword = isValidPassword(getInput.password)
            }
        }

        if (validEmail && validPassword) {
            fetchData(getInput)
        }
    }

    const fetchData = async (formData) => {
        await axios({
            method: 'post',
            url: 'api/user/signup',
            data: formData,
        }).then((res) => {
            if (res.data?.error) {
                return toast.warning(res?.data?.error)
            }
            if (res.data?.message) {
                toast.success(res.data.message)
                setTimeout(() => {
                    toast.success("Check your mail box to verify email")
                }, 1500);
                return router.push("/login")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px]  p-6 m-5 rounded-md bg-white'>
                <h1 className='font-robo font-bold text-3xl text-left w-full'>Signup</h1>
                <form className='w-full'>
                    {/* email */}
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="email"
                            placeholder='Email'
                            id='email'
                            value={getInput.email}
                            onChange={handleChange}
                            className=' py-1 w-full bg-transparent text-black'
                        />
                        <div className='w-full h-[0.1rem] bg-hero-pattern rounded-sm'>
                        </div>
                    </div>

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
                    <p className='text-sm mt-2 text-center'>
                        Already have an account? {' '}
                        <Link href={"/login"}
                            className='text-blue-500'
                        >Login</Link>
                    </p>

                    {/*continue btn  */}
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-hero-pattern w-full '
                    >
                        Continue
                    </button>

                    {/* Login with google btns */}
                    <p className='text-black text-center mt-7'>or Connect with Social Media</p>
                    <button type='button' className='flex items-center gap-4 mx-auto py-2 px-7 text-white font-semibold rounded mt-3 bg-hero-pattern w-full text-center'>
                        <AiOutlineGoogle className='text-2xl' />
                        Login with Googole
                    </button>
                </form>

            </div>
        </section >
    )
}

export default Signup