"use server";
import { NextResponse ,NextRequest } from "next/server";
import prisma from "@pisma/client";
import type { NextApiRequest  } from "next";
import {  Employee ,Vacation } from '@prisma/client';
import { SHA256 as sha256 } from "crypto-js";

type CreateEmployeeInput = Omit<Employee, 'id'>;
type CreateEmployeeBody ={
    employee : CreateEmployeeInput,
    vacations : Vacation[]
}
type UpdateEmployeeBody ={
    employee : Employee,
    vacations : Vacation[]
}


const hashPassword = (string : string) => {
    return sha256(string).toString();
};

export  async function POST(req: NextApiRequest){
    try {
        let passedValue = await new Response(req.body).text();
        let body = JSON.parse(passedValue);
        const {
            employee,
            vacations
        } : CreateEmployeeBody  = body;
           // Ensure the request body is not empty
        if (!employee) {
            return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
        }

         // Check if the email already exists
         const existingEmployee = await prisma.employee.findUnique({
            where: {
                email: employee.email
            }
        });
        
        if (existingEmployee) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }
        const hashedPassword = hashPassword(employee.password);
        employee.password = hashedPassword;
        await prisma.employee.create({
            data: {
                ...employee,
                vacations : {
                    connect : vacations.map((vacation) => {
                        return {
                            id : vacation.id
                        }
                    })
                }
            }
        });
        return NextResponse.json({ message: 'Employee created successfully' }, { status: 200 });
   
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
       
    } finally {
        await prisma.$disconnect();
    }
}

export  async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = !Number.isNaN(Number(searchParams.get('id'))) ? Number(searchParams.get('id')) : null;
        if(id){
           
            const employee = await prisma.employee.findUnique({
                where: {
                    id: id
                },
                include: {
                   vacations : {
                        include: {
                            vacation_type: true
                        }
                   }
                }
            });
            return NextResponse.json(employee, { status: 200 });
        }
        const employee = await prisma.employee.findMany({
            include: {
                vacations : {
                     include: {
                         vacation_type: true
                     }
                }
             }
        });
        return NextResponse.json(employee, { status: 200 });
     
    
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// delete 

export  async function DELETE(req: NextApiRequest) {
    let passedValue = await new Response(req.body).text();
    let body = JSON.parse(passedValue);
    const id = body.id;
    try {
        const employee = await prisma.employee.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(employee, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


// edit 

export  async function PUT(req: NextApiRequest) {
    let passedValue = await new Response(req.body).text();
    try {
        const { employee, vacations } : UpdateEmployeeBody  = JSON.parse(passedValue);
        // Check if the email already exists for a different employee
        const existingEmployee = await prisma.employee.findFirst({
            where: {
                email: employee.email,
                NOT: {
                    id: Number(employee.id)
                }
            }
        });
        
        if (existingEmployee) {
            return NextResponse.json({ message: 'Email already exists for another employee' }, { status: 400 });
        }
        await prisma.employee.update({
            where: {
                id: Number(employee.id)
            },
            data: {
                last_name : employee.last_name,
                first_name : employee.first_name,
                email : employee.email,
                password : employee.password,
                role : employee.role,
                department : employee.department,
                vacations : {
                    connect: vacations
                }
            }
        });
        return NextResponse.json({ message: 'employee updated successfully' }, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
   
