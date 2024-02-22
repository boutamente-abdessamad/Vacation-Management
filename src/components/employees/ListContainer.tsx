"use client";
import { useState } from 'react';
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/employees/Datatable';
import Toolbar from '@components/Toolbar';
import { useQuery } from '@tanstack/react-query'; 
import { getEmployees } from '@api/client/employees';
import { Alert, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function ListContainer() {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const { data : employees, isLoading, isError } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
    })

    return (    

        <BodyWrapper>
            <Toolbar
                title="Employees"
                buttonTitle="Add employee"
                handelClick={() => {
                    setLoading(true)
                    router.push('/employees/create')
                }}
                loading={loading}
            />
            {
                isError &&  <Space direction="vertical" className="w-full mb-5">
                    <Alert
                        message="An error occurred while fetching Employees"
                        type="error"
                    />
                </Space>
            }
           
            <Datatable 
                employees={employees || []}
                isLoading={isLoading}
            />
        </BodyWrapper>
      );
}