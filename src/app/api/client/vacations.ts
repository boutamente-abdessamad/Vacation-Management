import {  Vacation } from '@prisma/client';
type VacationInput = Partial<Vacation>;
import { QueryFunctionContext } from '@tanstack/react-query';

export const createVacation = async (values: VacationInput ) => {
    try {
        const resp = await fetch(`/api/vacations`, {
            method: 'POST',
            body: JSON.stringify(values),
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

export const updateVacation = async (values: Vacation ) => {
    try {
        const resp = await fetch(`/api/vacations`, {
            method: 'PUT',
            body: JSON.stringify(values),
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

export const getVacations = async () => {

    try {
        const data = await fetch(`/api/vacations`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Something went wrong');
        }
      return  await data.json() as Vacation[];
    } catch (error) {
        throw new Error('Something went wrong');
    }

};

export const getVacation = async ({ queryKey  } : QueryFunctionContext<[string, number]>  ): Promise<Vacation> => {

    try {
        const id = queryKey[1];
        const data = await fetch(`/api/vacations?id=${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!data.ok){
          throw new Error('Something went wrong');
        }
      return  await data.json() as Vacation;
    } catch (error) {
        throw new Error('Something went wrong');
    }

};

// delete 

export const deleteVacation = async (id: number) => {
    try {
        const resp = await fetch(`/api/vacations`, {
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