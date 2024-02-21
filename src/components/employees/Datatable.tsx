"use client";
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {  VacationType } from '@prisma/client';



const columns: TableProps<VacationType>['columns'] = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
    render: (text) => text,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];



export default   function  DataTable({
  vacations,
  isLoading = false,
} : {
  vacations: VacationType[];
  isLoading: boolean;
}) {

  return (    
    <div className=" bg-white  shadow-md p-4 rounded-md mb-4">
      <Table loading={isLoading} columns={columns} dataSource={vacations} />
  </div>
      
      );
}