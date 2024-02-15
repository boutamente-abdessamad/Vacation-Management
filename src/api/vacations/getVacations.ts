import type { NextApiRequest , NextApiResponse } from "next";
import prisma from "@pisma/client";

export default async function getVacations(req: NextApiRequest, res: NextApiResponse) {
    try {
        const vacations = await prisma.vacation.findMany({
            include: {
                employees: true
            }
        });
        res.status(200).json(vacations);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
}