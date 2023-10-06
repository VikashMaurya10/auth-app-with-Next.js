"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const page = () => {
    const [verify, setVerify] = useState(false)
    const router = useRouter()
    const getVerified = async (token) => {
        await axios({
            method: "post",
            url: 'api/user/verifyemail',
            data: { token }
        }).then((res) => {
            if (res?.data?.error) {
                router.push("/signup")
                return toast.warning(res?.data?.error)
            }
            if (res?.data?.message) {
                setVerify(true)
                toast.success(res?.data?.message)
                return router.push("/login")
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const token = window.location.search.split('=')[1]
        getVerified(token)
    }, [])


    return (
        <section>
            <h1 className="text-white text-center xl:text-4xl lg:text-3xl md:text-xl text:lg">
                {
                    verify ? "verified" : "verifing......"
                }
            </h1>
        </section>
    )
}

export default page