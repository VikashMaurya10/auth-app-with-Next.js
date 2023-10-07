'use client'
import axios from "axios"
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from "react-toastify"

const Page = () => {
    const [verify, setVerify] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${searchParams}`
        const token = url.split('=')[1].replaceAll('%24', "$").replaceAll("%2F", "/")
        console.log(url, token)

        getVerified(token)
    }, [])

    const getVerified = async (token) => {
        await axios({
            method: "post",
            url: 'api/user/verifyemail',
            data: { token: token }
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

export default Page