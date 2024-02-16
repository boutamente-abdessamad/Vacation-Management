import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  Vacation } from '@prisma/client';

export default async function createVacationType(req: NextApiRequest, res: NextApiResponse){
    try {
        const vacation : Vacation  = JSON.parse(req.body);
        await prisma.vacation.create({
            data: vacation
        });
        return res.status(200).json({
            message: 'Vacation created successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}