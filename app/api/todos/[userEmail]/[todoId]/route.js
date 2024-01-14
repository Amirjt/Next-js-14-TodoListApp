import { NextResponse } from "next/server";
import connectToDb from "../../../../../lib/db";
import Todo from "../../../../../models/Todo"

export const DELETE = async (req , {params}) => {
    try {
        await connectToDb()
        await Todo.findByIdAndDelete(params.todoId)
        return new NextResponse("Deleted" , {
            status : 200
        })
    } catch (error) {
        console.log(error);
    }
}


export const PUT = async (req , {params}) => {
    const body = await req.json()
    try {
        await connectToDb()
        await Todo.findByIdAndUpdate(params.todoId, body)
        return new NextResponse("Updated", {
            status : 200
        })
    } catch (error) {
        console.log(error);
        return new NextResponse("Error while updating Todo", {
            status: 500
        });
    }
}