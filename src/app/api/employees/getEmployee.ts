import prisma from "@pisma/client";

export default async function getEmployee(id: number){
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            },
            include: {
                vacations: {
                    include: {
                        vacation_type : true
                    }
                }
            }
        });
        return employee;
    } catch (error) {
        return { message: 'Something went wrong' };
    } finally {
        await prisma.$disconnect();
    }

}
