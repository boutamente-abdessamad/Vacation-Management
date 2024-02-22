"use client";
import React,{useState} from 'react';
import { Space, Table,message,Button,Popconfirm,Popover,Tag  } from 'antd';
import {  Employee, Vacation } from '@prisma/client';
import { useMutation ,useQuery} from '@tanstack/react-query'
import {deleteEmployee,getEmployees} from "@api/client/employees"
import type { TableProps } from 'antd';
import { DeleteOutlined ,EditOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation';




export default   function  DataTable({
  employees,
  isLoading = false,
} : {
  employees: Employee[];
  isLoading: boolean;
}) {

  const [messageApi, contextHolder] = message.useMessage();
  const [routerLoading , setRouterLoading] = useState<number>(0);
  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })

  const {mutate} = useMutation(
    {
        mutationFn : deleteEmployee,
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Employee deleted successfully',
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

  const columns: TableProps<Employee>['columns'] = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => text,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text) => text,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => text,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => text,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (text) => text,
    },
    {
      title: 'Vacations',
      dataIndex: 'vacations',
      key: 'vacations',
      render: (vacations : Vacation[]) => {
          return (
            <Popover content={vacationContent(vacations)} title="Vacations list">
              <Button type="primary">Show Vacations</Button>
          </Popover>
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
                  router.push(`/employees/edit/${record.id}`)
                }}
                loading={routerLoading==record.id ? true : false}
              />
              <Popconfirm
                title="Delete the type"
                description="Are you sure to delete this employee?"
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
      <Table loading={isLoading} columns={columns} dataSource={employees} />
  </div>
      
      );
}

const vacationContent = (vacations : Vacation[]) => {

  if(vacations.length === 0) return (
    <div>No vacations</div>
  )

  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {vacations.map((vacation : Vacation, index : number) => (
        <li key={index} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <h5 className="text-lg text-slate-200" >{vacation.title}</h5>
          <p className="ms-2">status : </p>
          <Tag bordered={false} color={
            vacation.status === "APPROVED" ? "#87d068" : 
            vacation.status === "REJECTED" ? "#f50" : "#2db7f5" 
          }>
            {vacation.status.toLocaleLowerCase()}
        </Tag>
      </li>
      ))}
  </ul>
  
  )
}