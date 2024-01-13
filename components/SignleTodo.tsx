"use client"

import { Trash2 , Pencil , Circle , CheckCircle } from "lucide-react"
import { useState } from 'react'
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
  


const SignleTodo = () => {
  const [isCompleted , setIsCompleted] = useState(false)
 
  const {theme} = useTheme()
  
  const handleDelete = () => {
    Swal.fire({
        title : "Are You Sure ?",
        text : "Are you sure you want to delete this todo?",
        icon : "warning",
        showCancelButton : true,
        confirmButtonColor : "#ff3333", 
        color : `${theme === "dark" ? "#FFF" : "#000"}`,
        confirmButtonText : "Yes, delete it!",
        background : `${theme === "dark" ? "#1e293b" : "white"}`,
    }).then((res)=>{
        if(res.isConfirmed){
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

  return (
    <div className={`border border-border rounded-lg shadow-lg p-4 flex justify-between cursor-pointer ${isCompleted ? "opacity-50" : ""}`}>
        <span className={`text-primary font-semibold flex items-center gap-2 ${isCompleted ? "line-through" : ""} `} >
            {
                isCompleted?
                <CheckCircle size={18} onClick={() => setIsCompleted(false)}  />
                :
                <Circle size={18} onClick={() => setIsCompleted(true)}  />
            }
            Hit The Gym
            </span>
        <div className='flex items-center gap-2' >
            <Dialog>
                <DialogTrigger><Pencil size={18} /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center" >Edit Todo</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-2" >
                        <Input placeholder="Name" />
                        <DialogClose>
                        <Button>Edit</Button>
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