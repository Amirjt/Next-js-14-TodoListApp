import connectToDb from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export const GET = async (req , {params}) => {
    try {
        await connectToDb()
        const todos = await Todo.find({userEmail : params.userEmail})
        return new NextResponse(JSON.stringify(todos) , {
            status : 200
        })
    } catch (error) {
        throw new NextResponse("Error while fetching Todos", {
            status: 500
        });
    }
}

export const POST = async (req) =>{
   const body = await req.json()
   const newTodo = new Todo(body)
   try {
    await connectToDb()
    await newTodo.save()
    return new NextResponse("Todo Created!" , {
        status : 201
    })
    
   } catch (error) {
     throw new NextResponse("Error while creating Todo", {
       status: 500
     });
   }
}

