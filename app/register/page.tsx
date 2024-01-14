"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

import Swal from "sweetalert2"
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const RegisterPage = () => {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {theme} = useTheme()

  const session = useSession()
  const router = useRouter()

  if(session.status === "authenticated"){
    router.push("/")
  }
  

  const registerHandle = async () => {
     if(!name || !email || !password){
       Swal.fire({
         icon : "error",
         title : "Oops...",
         text : "Please fill all the fields",
         color : `${theme === "dark"? "#FFF" : "#000"}`,
         background : `${theme === "dark"? "#1e293b" : "white"}`,
       })
     }else {
       const res = await fetch("api/signup" , {
        method : "POST" ,
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
           name , 
           email, 
           password
        })
      })
      if(res.ok){
        Swal.fire({
          icon : "success",
          title : "Registered!",
          text : "Your account has been created!",
          color : `${theme === "dark"? "#FFF" : "#000"}`,
          background : `${theme === "dark"? "#1e293b" : "white"}`,
        })
        setName("")
        setEmail("")
        setPassword("")
      }
      if(res.status === 400){
        Swal.fire({
          icon : "error",
          title : "Oops...",
          text : "User Already Registered",
          color : `${theme === "dark"? "#FFF" : "#000"}`,
          background : `${theme === "dark"? "#1e293b" : "white"}`,
        })
      }
     }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center" >
      <div className="w-1/4 border border-border p-5 rounded-lg shadow-lg flex flex-col gap-6 items-center" >
          <h2 className="font-bold text-xl" >Sign Up</h2>
           <div className="w-full flex flex-col gap-2" >
           <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
           <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <Button onClick={registerHandle} className="mt-2" >Sign Up</Button>
           </div>
          <span className="text-sm" >Already have an account ? <Link className="text-primary" href="/login" >Login</Link> </span>
      </div>
    </div>
  )
}

export default RegisterPage