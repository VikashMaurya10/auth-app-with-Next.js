'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken"
const ProfilePage = () => {
  const router = useRouter()

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/user/verifiedUserData'
    }).then((res) => {
      router.push(`/profile/${res?.data?._id}`);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
    </>
  );
};

export default ProfilePage;
