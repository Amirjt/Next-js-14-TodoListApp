"use client"

import { Trash2 , Pencil , Circle , CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import Swal from "sweetalert2"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
  


const SignleTodo = ({todo} : { todo : Todo }) => {
  const {theme} = useTheme()
  const session = useSession()
  const [newTitle , setNewTitle] = useState("")

  const handleDelete = () => {
    Swal.fire({
        title : "Are You Sure ?",
        text : "Are you sure you want to delete this todo?",
        icon : "warning",
        showCancelButton : true,
        confirmButtonColor : "#ff3333", 
        confirmButtonText : "Yes, delete it!",
        color : `${theme === "dark" ? "#FFF" : "#000"}`,
        background : `${theme === "dark" ? "#1e293b" : "white"}`,
    }).then((res)=>{
        if(res.isConfirmed){
            fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}/${todo._id}` , {
                method : "DELETE"
            })
            .then(res => res.ok && window.location.reload());
            Swal.fire({
                title : "Deleted!",
                text : "Your todo has been deleted!",
                icon : "success",
                color : `${theme === "dark" ? "#FFF" : "#000" }`,
                background : `${theme === "dark"? "#1e293b" : "white"}`,
            })
            
        }
    })
  }

  const CompletedHandle =  async (id : string) => {
    try {
        fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}/${id}` , {
            method : "PUT" , 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                isCompleted : true
            })
        })
        .then(res => res.ok && window.location.reload())
    } catch (error) {
        console.log(error);
        
    }
  }

  const notCompletedHandle = async (id : string) => {
    try {
        fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}/${id}` , {
            method : "PUT" , 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                isCompleted : false
            })
        })
        .then(res => res.ok && window.location.reload())
    } catch (error) {
        console.log(error);
        
    }
  }

  const updateHandle = async (id : string) => {
    try {
        fetch(`http://localhost:3000/api/todos/${session.data?.user?.email}/${id}` , {
            method : "PUT" , 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                title : newTitle
            })
        })
        .then(res => res.ok && window.location.reload())
    } catch (error) {
        console.log(error); 
    }
  }

  return (
    <div className={`border border-border rounded-lg shadow-lg p-4 flex justify-between cursor-pointer ${todo.isCompleted ? "opacity-50" : ""}`}>
        <span className={`text-primary font-semibold flex items-center gap-2 ${todo.isCompleted ? "line-through" : ""} `} >
            {
                todo.isCompleted?
                <CheckCircle onClick={() => notCompletedHandle(todo._id)} size={18}   />
                :
                <Circle size={18} onClick={() => CompletedHandle(todo._id)} />
            }
            {todo.title}
            </span>
        <div className='flex items-center gap-2' >
            <Dialog>
                <DialogTrigger><Pencil size={18} /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center" >Edit Todo</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-2" >
                        <Input placeholder={todo.title} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <DialogClose>
                        <Button onClick={() => updateHandle(todo._id)} >Edit</Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            <Trash2 onClick={handleDelete} className='text-red-500' size={18} />
        </div>
    </div>
  )
}

export default SignleTodo