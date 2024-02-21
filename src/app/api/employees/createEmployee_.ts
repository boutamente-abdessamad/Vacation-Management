import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Employee } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    console.log('req.method', req.method);
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const employee : Employee  = JSON.parse(req.body);
        await prisma.employee.create({
            data: employee
        });
        return res.status(200).json({
            message: 'Employee created successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}