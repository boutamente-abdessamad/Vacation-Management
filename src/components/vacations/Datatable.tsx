"use client";
import React,{useState} from 'react';
import { Space, Table,message,Button,Popconfirm,Tag  } from 'antd';
import {  Vacation } from '@prisma/client';
import { useMutation ,useQuery} from '@tanstack/react-query'
import {deleteVacation,getVacations} from "@api/client/vacations"
import type { TableProps } from 'antd';
import { DeleteOutlined ,EditOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';



export default   function  DataTable({
  vacations,
  isLoading = false,
} : {
  vacations: Vacation[];
  isLoading: boolean;
}) {

  const [messageApi, contextHolder] = message.useMessage();
  const [routerLoading , setRouterLoading] = useState<number>(0);
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: ["vacations"],
    queryFn: getVacations,
  })

  console.log(vacations);

  const {mutate} = useMutation(
    {
        mutationFn : deleteVacation,
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Vacation deleted successfully',
              });
              refetch();
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: error.message,
            });
        }
    }
)


  const columns: TableProps<Vacation>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => title,
    },
    {
      title: 'Vacation type',
      dataIndex: 'vacation_type',
      key: 'vacation_type',
      render: (vacation_type) => vacation_type.label,
    },
    {
      title: 'Start at',
      dataIndex: 'start_at',
      key: 'start_at',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'End at',
      dataIndex: 'end_at',
      key: 'end_at',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <Tag bordered={false} color={
              text === "APPROVED" ? "#87d068" : 
              text === "REJECTED" ? "#f50" : "#2db7f5" 
            }>
              {text}
          </Tag>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
            <Button 
                type="primary"  
                icon={<EditOutlined />} 
                size="middle"
                onClick={()=>{
                    setRouterLoading(record.id);
                  router.push(`/dashboard/vacations/edit/${record.id}`)
                }}
                loading={routerLoading==record.id ? true : false}
              />
              <Popconfirm
                title="Delete the type"
                description="Are you sure to delete this vacation?"
                onConfirm={()=>{
                  mutate(record.id);
                }}
                okText="Yes"
                cancelText="No"
              >
              <Button 
                type="primary" 
                danger  
                icon={<DeleteOutlined />} 
                size="middle" 
              />
            </Popconfirm>
           
        </Space>
      ),
    },
  ];


  return (    
    <div className=" bg-white  shadow-md p-4 rounded-md mb-4">
      {contextHolder}
      <Table loading={isLoading} columns={columns} dataSource={vacations} />
  </div>
      
      );
}