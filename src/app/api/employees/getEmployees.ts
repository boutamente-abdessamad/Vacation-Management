import type { NextApiRequest , NextApiResponse } from "next";
import prisma from "@pisma/client";

export default async function getEmployees(req: NextApiRequest, res: NextApiResponse) {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                vacations: {
                    include: {
                       vacation_type : true
                    }
                }
            }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
}