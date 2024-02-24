"use server";
import { NextResponse  } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import { SHA256 as sha256 } from "crypto-js";

type LoginCredentials ={
    email : string,
    password : string
}


const hashPassword = (string : string) => {
    return sha256(string).toString();
};

export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const {
            email,
            password
        } : LoginCredentials  = body;
           // Ensure the request body is not empty
        if (!email || !password) {
            return NextResponse.json({ message: 'The Credentials is required' }, { status: 400 });
        }

         // Check if the email  exists
         const user = await prisma.employee.findUnique({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return NextResponse.json({ message: 'The email or password invalid' }, { status: 400 });
        }
        const hashedPassword = hashPassword(password);
        if (!user || hashedPassword !== user.password) {
            return NextResponse.json({ message: 'The email or password invalid' }, { status: 400 });
        }
        return NextResponse.json(exclude(user, ["password"]), { status: 200 });
  
   
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
       
    } finally {
        await prisma.$disconnect();
    }
}

function exclude(user , keys) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }