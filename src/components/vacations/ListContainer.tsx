"use client";
import { useState } from 'react';
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/vacations/Datatable';
import Toolbar from '@components/Toolbar';
import { useQuery } from '@tanstack/react-query'; 
import { getVacations } from '@api/client/vacations';
import { Alert, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function ListContainer() {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["vacations"],
        queryFn: getVacations,
    })

    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacations"
                buttonTitle="Add Vacation"
                handelClick={() => {
                    setLoading(true)
                    router.push('/vacations/create')
                }}
                loading={loading}
            />
            {
                isError &&  <Space direction="vertical" className="w-full mb-5">
                    <Alert
                        message="An error occurred while fetching vacation types"
                        type="error"
                    />
                </Space>
            }
           
            <Datatable 
                vacations={data || []}
                isLoading={isLoading}
            />
        </BodyWrapper>
      );
}