import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Vacation } from '@prisma/client';

export default async function deleteEmployee(req: NextApiRequest, res: NextApiResponse){
    try {
        const vacation : Vacation  = JSON.parse(req.body);
        await prisma.vacation.delete({
            where: {
                id: vacation.id
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