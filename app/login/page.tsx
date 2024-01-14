"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import Link from 'next/link'

import { useState } from 'react'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const session = useSession()

  useEffect(()=> {
    if(session.status === "authenticated"){
      return router.push("/")
    }
  })
  
  const loginHandle = async () => {
    if (!email ||!password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        color: "#FFF",
        background: "#1e293b",
      })
    }else {
      try {
       await signIn("credentials" , {email , password})  
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-5 lg:p-0" >
    <div className="lg:w-1/4 w-full border border-border p-5 rounded-lg shadow-lg flex flex-col gap-6 items-center" >
        <h2 className="font-bold text-xl" >Sign in</h2>
         <div className="w-full flex flex-col gap-2" >
         <Input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} />
         <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
         <Button onClick={loginHandle} className="mt-2" >Sign In</Button>
         </div>
        <span className="text-sm" >Dont have an Account ? <Link className="text-primary" href="/register" >Register</Link></span>
    </div>
  </div>
  )
}

export default LoginPage