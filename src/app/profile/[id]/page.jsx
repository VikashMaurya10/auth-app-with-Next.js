"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const page = ({ params }) => {
  const router = useRouter()

  const logout = async () => {
    axios({
      method: 'get',
      url: '/api/user/logout'
    }).then((res) => {
      if (res?.data?.error) {
        return toast.warn(res?.data?.error)
      }
      if (res?.data?.message) {
        toast.success(res?.data?.message)
        return router.push("/login")
      }
    }).catch((err => {
      console.log(err);
    }))
  }
  return (
    <div>{params.id}
      ProfilePage
      <button className='flex items-center gap-4 mx-auto py-2 px-7 text-white font-semibold rounded mt-3 bg-hero-pattern text-center border-2 border-solid border-white w-fit'
        onClick={logout}
      >
        logout
      </button></div>
  )
}

export default page