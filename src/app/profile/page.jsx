'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken"
const ProfilePage = () => {
  const router = useRouter()

  const getData = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/user/verifiedUserData'
    })
    router.push(`/profile/${res?.data?._id}`);
  }

  useEffect(() => {
    getData()
  })

  return (
    <>
    </>
  );
};

export default ProfilePage;
