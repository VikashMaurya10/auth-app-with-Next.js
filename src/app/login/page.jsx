'use client'
import { isValidEmail, isValidPassword } from '@/helpers/validationMethods'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { toast } from 'react-toastify'
const Signup = () => {
  const [typePassword, setTypePassword] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handlePass = () => {
    setTypePassword(!typePassword)
  }

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {

    const validEmail = isValidEmail(formData.email)
    var validPassword = false
    if (validEmail) {
      validPassword = isValidPassword(formData.password)
    }

    if (validEmail && validPassword) {
      console.log(formData);
      fetchData()
    }
  }

  const fetchData = async () => {
    axios({
      method: 'post',
      url: "api/user/login",
      data: formData
    }).then((res) => {
      console.log(res);
      if (res?.data?.error) {
        return toast.warn(res?.data?.error)
      }
      if (res?.data?.message) {
        toast.success(res?.data?.message)
        return router.push("/profile")
      }

    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <section className='flex items-center justify-center h-screen'>
      <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px] h-[400px] px-8 rounded-md bg-white'>
        <h1 className='font-robo font-bold text-3xl text-left w-full '>Login</h1>
        <form className='w-full'>
          <div className='w-full mt-4'>
            <input
              autoComplete='off'
              type="email"
              placeholder='Email'
              id='email'
              className='py-1 w-full bg-transparent text-black'
              onChange={handleChange}

            />
            <div className='w-full h-[0.1rem] bg-hero-pattern rounded-sm'>
            </div>
          </div>
          <div className='w-full mt-4'>
            <div className='flex gap-1'>
              <input
                autoComplete='off'
                type={typePassword ? "text" : "password"}
                placeholder='password'
                id='password'
                className=' py-1 w-full  bg-transparent text-black'
                onChange={handleChange}
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
            Do not have an account?{" "}
            <Link href={"/sign-up"}
              className='text-blue-500'
            >Signup</Link>
          </p>
          <button type='button' className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-hero-pattern w-full '
            onClick={handleSubmit}
          >
            Continue
          </button>
          <p className='text-black text-center mt-7'>or Connect with Social Media</p>
          <button type='button' className='flex items-center gap-4 mx-auto py-2 px-7 text-white font-semibold rounded mt-3 bg-hero-pattern w-full text-center'>
            <AiOutlineGoogle className='text-2xl' />Login with Googole</button>
        </form>

      </div>

    </section >
  )
}

export default Signup