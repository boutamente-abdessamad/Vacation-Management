import prisma from "@pisma/client";

export default async function getVacation(id: number){
    try {
        const vacation = await prisma.vacation.findUnique({
            where: {
                id: id
            },
            include: {
                employees: true
            }
        });
        return vacation;
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }

}
