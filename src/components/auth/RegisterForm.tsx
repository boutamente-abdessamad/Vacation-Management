"use client";
import React  from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Button ,message,Space,Alert} from 'antd';
import { useMutation } from '@tanstack/react-query'
import {createEmployee} from "@api/client/employees"
import {  Employee,Vacation } from '@prisma/client';
import { useRouter  } from 'next/navigation';
import InputField from '@components/Fields/InputField';

type EmployeeInput = Partial<Employee> & { confirm_password?: string };



type CreateEmployeeBody ={
    employee : EmployeeInput,
    vacations : Vacation[]
}


export default function RegisterForm() {

    const validationSchema = yup.object({
        last_name: yup.string().required('Last name is required'),
        first_name: yup.string().required('First name is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().when('id', ([id])=>{
            return id ? yup.string() : yup.string().required('Password is required')
        }),
        confirm_password: yup.string().when('id', ([id])=>{
            return id ? yup.string() : yup.string().oneOf([yup.ref('password'), "Passwords must match"], 'Passwords must match')
        }),
        role: yup.string(),
        department: yup.string(),
    }); 
    

    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();


    // create Mutation
    
    const {mutate, isPending,error : createErr} = useMutation(
        {
            mutationFn : createEmployee,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Employee created successfully',
                });
                router.push('/auth/login')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )


    const handelCreate = (values: CreateEmployeeBody,resetForm : Function ) => {
        delete values.employee.id;
        mutate(values);
        resetForm();
    }


    return (
        <>
             {contextHolder}
            <section className=" bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                    

                    {
                        createErr && <Space direction="vertical" className="w-full mb-5">
                            <Alert
                                message={createErr.message}
                                type="error"
                            />
                        </Space>
                    }
                   
                    <Formik
                        initialValues={{
                            id: undefined,
                            last_name:  '',
                            first_name:'',
                            email: '',
                            password: '',
                            confirm_password: '',   
                            role:  '',
                            department: '',
                        }}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={( values: EmployeeInput , { setSubmitting,resetForm }) => {

                                // remove  confirm_password from values 
                                delete values.confirm_password;
                                const body : CreateEmployeeBody ={
                                    employee : values,
                                    vacations : []
                                }
                                handelCreate(body,resetForm);
                                
                                setSubmitting(false);
                             
                            }}
                        >
                            {({  }) => (
                                <Form>
                                    <div className="rounded-t bg-white mb-0 px-6 py-6 border-b">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">
                                                Register
                                            </h6>

                                            <Button type="primary" htmlType="submit" loading={isPending} >Register</Button>
                                        
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Your Information
                                        </h6>
                                        <div className="flex flex-wrap">
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="last_name" name="last_name" type="text" placeholder="Enter your Last Name" label="Last Name" />
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="first_name" name="first_name" type="text" placeholder="Enter your First Name" label="First Name" />
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-12/12 px-4">
                                                <InputField forId="email" name="email" type="email" placeholder="Enter your email" label="Email" />
                                            </div>
                                          
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="password" name="password" type="password" placeholder="Enter your password" label="Password" />
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="confirm_password" name="confirm_password" type="password" placeholder="Confirm your password" label="Confirm Password" />
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="role" name="role" type="text" placeholder="Enter your role" label="Role" />
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="department" name="department" type="text" placeholder="Enter your department" label="Department" />
                                            </div>
                            
                                        </div>
                                
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
                
                
                </div>
            </section>
        </>
    )
}