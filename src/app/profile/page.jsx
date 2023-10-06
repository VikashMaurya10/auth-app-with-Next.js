'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter()

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/user/verifiedUserData'
    }).then((res) => {
      console.log(res);
      router.push(`/profile/${res?.data?._id}`)
    }).catch((err) => {
      console.log(err);
    })
  }, [router])

  return (
    <>
    </>
  );
};

export default ProfilePage;
