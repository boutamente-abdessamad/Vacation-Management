import prisma from "@pisma/client";

export default async function getVacation(id: number){
    try {
        const vacationType = await prisma.vacationType.findUnique({
            where: {
                id: id
            }
        });
        return vacationType;
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }

}
