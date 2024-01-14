"use client"

import { ModeToggle } from "@/components/ThemeSwitcher";
import { ListTodoIcon , PlusCircle , LogOut } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import SignleTodo from "@/components/SignleTodo";


import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data , setData] = useState([])
  const [title , setTitle] = useState<string>("")
  const [search , setSearch] = useState("")
  const [loading , setLoading] = useState(true)

  const {theme} = useTheme()

  const session = useSession()
  const router = useRouter()
  

  useEffect(()=> {
    if(session.status === "unauthenticated"){
      router.push("/login")
    }  
    fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}`)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
  } , [session])

  const addNewTodoHandle = async () => {
     if(!title){
       Swal.fire({
         icon : "error",
         title : "Oops...",
         text : "Please enter a title",
         color : `${theme === "dark" ? "#FFF" : "#000"}`,
         background : `${theme === "dark" ? "#1e293b" : "white"}`,
       })
     }else {
      const newTodo = {
        title : title,
        isCompleted : false,
        userEmail : session.data?.user?.email
      }
      try {
        const res = await fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}` , {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(newTodo)
         })
        if(res.ok){
          Swal.fire({
            icon : "success",
            title : "Added!",
            text : "Your todo has been added!",
            color : `${theme === "dark" ? "#FFF" : "#000"}`,
            background : `${theme === "dark" ? "#1e293b" : "white"}`,
          })
          setTitle("")
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      } catch (error) {
       console.log(error);
      }
     }
  }

  return (
    <div className="max-w-[1600px] h-screen mx-auto flex justify-center items-center p-5 lg:p-0" >
      <div className="border border-border w-full lg:w-1/2 rounded-lg shadow-lg p-5 relative flex flex-col items-center gap-8" >
        <span className="absolute top-2 left-2 flex items-center gap-2" >
          <ModeToggle />
          <h2 className="text-sm" >Welcome <span className="text-primary font-bold capitalize" >{session.data?.user?.name}</span></h2>
        </span>
        <span className="absolute bottom-3 right-3" >
         <LogOut className="cursor-pointer" onClick={() => signOut()} size={20} />
        </span>
        <span className="absolute top-3 right-3 cursor-pointer" >
          <Dialog >
            <DialogTrigger><PlusCircle strokeWidth={1.3} /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center" >Add New Todo</DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex flex-col gap-2" >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Name" />
                <Button  onClick={addNewTodoHandle} >Add</Button>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </span>
        <span className="flex items-center gap-3 text-primary" >
          <h2 className="font-bold text-2xl" >TodoList</h2>
          <ListTodoIcon size={28} /> 
          </span>
          <div className="self-start" >
            <Input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div  className="grid grid-cols-3 gap-3" >
            <Button variant="outline">All</Button>
            <Button variant="outline">In Process</Button>
            <Button variant="outline">Completed</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 w-full mb-10" >
             {data?.map((todo : Todo)=> (
               <div key={todo._id} className={`${!todo.title.includes(search) ? "hidden" : ""}`}  >
                <SignleTodo todo={todo} />
               </div>
             ))}
          </div>
          {loading && (
            <div className="grid lg:grid-cols-2 gap-3 w-full mb-10" >
              <Skeleton className="h-[30px] w-full  rounded-full" />
              <Skeleton className="h-[30px] w-full  rounded-full" />
              <Skeleton className="h-[30px] w-full  rounded-full" />
            </div>
          )}
          {!loading && !data.length && (
               <span className="text-center mb-5 text-lg font-bold" >Nothing yet... ☹️</span>
          )}
      </div>
    </div>
  )
}
