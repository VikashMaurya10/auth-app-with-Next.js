'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const router = useRouter()
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const token = document.cookie.split('=')[1]
    // console.log(token);
    axios({
      method: 'post',
      url: '/api/user/verifiedUserData',
      data: { token }
    }).then((res) => {
      console.log(res);
      if (res?.data?.error) {
        return toast.warning(res?.data?.error)
      }
      if (res?.data) {
        setUserData(res.data)
        // console.log(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [router])

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
    <section className="text-white">
      <p className="text-center text-3xl mt-4">Profile page</p>
      <h1 className="text-2xl ml-4 uppercase mt-8">user details</h1>
      {/* {JSON.stringify(userData)} */}
      <div className="sm:w-[500px] w-[90%] b mx-auto mt-4">
        <div>
          <h1 className="font-bold grid grid-cols-2 text-center">
            <span className="b">Field Name</span>
            <span className="b">Value</span>
          </h1>
          <div className="grid grid-cols-2 text-center text-xs sm:text-base">
            <div className="text-left px-4 b">
              <p>your unique id</p>
              <p>your email</p>
              <p>your email verified</p>
              <p>you are Admin</p>
            </div>
            <div className="b">
              <p>{userData._id}</p>
              <p>{userData.email}</p>
              <p>{userData.isVerified ? "true" : "false"}</p>
              <p>{userData.isAdmin ? "true" : "false"}</p>
            </div>

          </div>
        </div>
      </div>
      <button className='flex items-center gap-4 mx-auto py-2 px-7 text-white font-semibold rounded mt-3 bg-hero-pattern text-center border-2 border-solid border-white w-fit'
        onClick={logout}
      >
        logout
      </button>
    </section >
  );
};

export default ProfilePage;
