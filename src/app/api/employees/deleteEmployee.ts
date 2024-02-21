import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Employee } from '@prisma/client';

export default async function deleteEmployee(req: NextApiRequest, res: NextApiResponse){
    try {
        const employee : Employee  = JSON.parse(req.body);
        await prisma.employee.delete({
            where: {
                id: employee.id
            }
        });
        return res.status(200).json({
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}