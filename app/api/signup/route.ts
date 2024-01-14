import connectToDb from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
  try {
    await connectToDb()
    const {name , email , password} = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const existingUser = await User.findOne({email})

    if(existingUser){
        return new NextResponse("User already exists" , {
          status : 400
        })
    }else {
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return new NextResponse(JSON.stringify({
            status: 201,
            message: "User Created"
        }))
    }

    
  } catch (error) {
    throw new NextResponse("Error creating User" , {
        status: 500
    })
  }
}