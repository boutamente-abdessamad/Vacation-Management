import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Vacation } from '@prisma/client';

export default async function updateVacation(req: NextApiRequest, res: NextApiResponse){
    try {
        const vacation : Vacation  = JSON.parse(req.body);
        await prisma.vacation.update({
            where: {
                id: vacation.id
            },
            data: vacation
        });
        return res.status(200).json({
            message: 'Vacation updated successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}