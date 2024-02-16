import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  VacationType } from '@prisma/client';

export default async function createVacation(req: NextApiRequest, res: NextApiResponse){
    try {
        const vacationType : VacationType  = JSON.parse(req.body);
        await prisma.vacationType.create({
            data: vacationType
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