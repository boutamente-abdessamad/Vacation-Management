import type { NextApiRequest , NextApiResponse } from "next";
import prisma from "@pisma/client";

export default async function getVacations(req: NextApiRequest, res: NextApiResponse) {
    try {
        const vacationType = await prisma.vacationType.findMany();
        res.status(200).json(vacationType);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
}