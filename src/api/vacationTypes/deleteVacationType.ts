import prisma from "@pisma/client";
import type { NextApiRequest , NextApiResponse } from "next";
import {  VacationType } from '@prisma/client';

export default async function deleteEmployee(req: NextApiRequest, res: NextApiResponse){
    try {
        const vacationType : VacationType  = JSON.parse(req.body);
        await prisma.vacationType.delete({
            where: {
                id: vacationType.id
            }
        });
        return res.status(200).json({
            message: 'vacation Type deleted successfully'
        });
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }
}