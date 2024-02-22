import {  Employee,Vacation ,Prisma} from '@prisma/client';

type EmployeeInput = Partial<Employee>;
import { QueryFunctionContext } from '@tanstack/react-query';
type CreateEmployeeBody ={
    employee : EmployeeInput,
    vacations : Vacation[]
}

type UpdateEmployeeBody ={
    employee : Employee,
    vacations : Vacation[]
}

type EmployeeWithRelations = Employee & {
    vacations: Vacation[]
}

export const createEmployee = async (values: CreateEmployeeBody ) => {
    try {
        const resp = await fetch(`/api/employees`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        const data = await resp.json();
        
        if(!resp.ok)  {
            throw new Error(data.message);
        } 
        return data;
    } catch (error : any) {
        throw new Error(error.message);
    }

};

export const updateEmployee = async (values: UpdateEmployeeBody ) => {
    try {
        const resp = await fetch(`/api/employees`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        const data = await resp.json();
        
        if(!resp.ok)  {
            throw new Error(data.message);
        } 
        return data;
    } catch (error : any) {
        console.log(error);
        throw new Error(error.message);
    }

};

export const getEmployees = async (): Promise<EmployeeWithRelations[]> => {

    try {
        const data = await fetch(`/api/employees`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Something went wrong');
        }
      return  await data.json() as EmployeeWithRelations[];
    } catch (error) {
        throw new Error('Something went wrong');
    }

};

export const getEmployee = async ({ queryKey  } : QueryFunctionContext<[string, number]>  ): Promise<EmployeeWithRelations> => {

    try {
        const id = queryKey[1];
        const data = await fetch(`/api/employees?id=${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Something went wrong');
        }
      return  await data.json() as EmployeeWithRelations;
    } catch (error) {
        throw new Error('Something went wrong');
    }

};

// delete 

export const deleteEmployee = async (id: number) => {
    try {
        const resp = await fetch(`/api/employees`, {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
            },
        
        })
        const data = await resp.json();
        
        if(!resp.ok)  {
            throw new Error('Something went wrong');
        } 
        return data;
    } catch (error) {
        throw new Error('Something went wrong');
    }
};