import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Employee } from '@prisma/client';

export default async function updateEmployee(req: NextApiRequest, res: NextApiResponse){
    try {
        const employee : Employee  = JSON.parse(req.body);
        await prisma.employee.update({
            where: {
                id: employee.id
            },
            data: employee
        });
        return res.status(200).json({
            message: 'Employee updated successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}