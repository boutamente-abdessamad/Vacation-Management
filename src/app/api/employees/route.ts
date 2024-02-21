"use server";
import { NextResponse } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import {  Employee } from '@prisma/client';
type CreateEmployeeInput = Omit<Employee, 'id'>;
export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const employee : CreateEmployeeInput  = body;
           // Ensure the request body is not empty
        if (!employee) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        await prisma.employee.create({
            data: employee
        });
        return NextResponse.json({ message: 'Employee created successfully' }, { status: 200 });
   
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
       
    } finally {
        await prisma.$disconnect();
    }
}