"use client";
import React,{useState ,useEffect}  from 'react';
import BodyWrapper from '@components/BodyWrapper';
import * as yup from 'yup';
import { Formik, Form,ErrorMessage } from 'formik';
import { Button ,message,DatePicker,Select,Space,Alert} from 'antd';
import { useMutation,useQuery } from '@tanstack/react-query'
import {createVacation,getVacation,updateVacation} from "@api/client/vacations"
import {getVacationTypes} from "@api/client/vacationTypes"
import {  Vacation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import dayjs , { type Dayjs }from 'dayjs';
import { Spin } from 'antd';
import InputField from '@components/Fields/InputField';

type VacationInput = Partial<Vacation>;

const validationSchema = yup.object({
    title : yup.string().required('Title is required'),
    start_at : yup.date().required('Start date is required'),
    end_at : yup.date().required('End date is required'),
    vacationTypeId : yup.number().required('Type is required').min(1),
    status : yup.string().required('Status is required'),

}); 


type vacationTypesOptionsType = {
    value: string,
    label: string
}

export default function VacationForm({ id }:{ id? :number}) {

    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [vacationTypesOptions, setVacationTypesOptions] = useState<vacationTypesOptionsType[]>([])
    const [vacationTypeId, setVacationTypeId] = useState<number>(0)
    const [startAt, setStartAt] = useState<Dayjs>(dayjs());
    const [endAt, setEndAt] = useState<Dayjs>(dayjs());
    const [status, setStatus] = useState<"PENDING"|"APPROVED"|"REJECTED">("PENDING");
    const [title, setTitle] = useState<string>("");



    // get vacationData on edit 
    const { data : vacationData, isLoading, isError } = useQuery({
        queryKey: ["vacation",id || 0],
        queryFn: getVacation,
        enabled: !!id,
    } )


    // get types list 
    const { data : vacationTypesData, isLoading : vacationTypesIsLoading, isError :vacationTypesIsError } = useQuery({
        queryKey: ["vacation-types"],
        queryFn: getVacationTypes,
        refetchInterval: 1000,
    } )

    // Mutations

    // create Mutation
    const {mutate, isPending} = useMutation(
        {
            mutationFn : createVacation,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Vacation created successfully',
                });
                router.push('/vacations')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )


    // update Mutation
    const {mutate : mutateUpdate , isPending : isPendingUpdate} = useMutation(
        {
            mutationFn : updateVacation,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Vacation updated successfully',
                });
                router.push('/vacations')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )

    const handelCreate = (values: VacationInput,resetForm : Function ) => {
        delete values.id;
        mutate(values);
        resetForm();
    }

    const handelUpdate = (values: Vacation ) => {
        mutateUpdate(values);
    }

    useEffect(() => {


        if(vacationTypesData){
            setVacationTypesOptions(
                vacationTypesData.map((type) => {
                    return {
                        value: type.id.toString(),
                        label: type.label
                    }
                })
            )
        }
      
        // on edit 
        if(id && vacationData){
            setStartAt(dayjs(vacationData?.start_at))
            setEndAt(dayjs(vacationData?.end_at))
            setStatus(vacationData.status)
            setVacationTypeId(vacationData?.vacationTypeId)
            setTitle(vacationData?.title)
        }

        // onCreate 
        if(!vacationData && vacationTypesData?.length){
            setVacationTypeId(vacationTypesData[0].id)
        }

    }, [vacationTypesData,vacationData,id])




    return (
        <BodyWrapper>
             {contextHolder}
            <section className=" bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    
                    {isLoading || vacationTypesIsLoading ? <div className="flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 bg-slate-300 bg-opacity-7"><Spin size="large" /></div> : null}

                    {
                        isError || vacationTypesIsError &&  <Space direction="vertical" className="w-full mb-5">
                            <Alert
                                message="An error occurred while fetching"
                                type="error"
                            />
                        </Space>
                    }

                    <Formik
                        initialValues={{
                            title : title,
                            id: id || undefined,
                            start_at: startAt.toDate(),
                            end_at: endAt.toDate(),
                            vacationTypeId: vacationTypeId ,
                            status: status,
                        }}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={( values: VacationInput , { setSubmitting,resetForm }) => {
                                if(id){
                                    handelUpdate(values as Vacation);
                                    setSubmitting(false);
                                    return ;
                                }
                                handelCreate(values,resetForm);
                                
                                setSubmitting(false);
                             
                            }}
                        >
                            {({ setFieldValue,values }) => (
                                <Form>
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">
                                                 Create Vacation
                                            </h6>

                                            <Button type="primary" htmlType="submit" loading={isPending && isPendingUpdate} >{ id ? "Update" : "Save" }</Button>
                                        
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Vacation Information
                                        </h6>
                                        <div className="flex flex-wrap">
                                            {/* Input  */}
                                            <div className="w-full lg:w-12/12 px-4">
                                            <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                                                        Title
                                                    </label>
                                                    <input id="title" type="text" value={title} name={"title"} onChange={
                                                        (e) => {
                                                            setTitle(e.target.value)
                                                        }
                                                    
                                                    } className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"} placeholder={"Enter a title"} />
                                                    <ErrorMessage name={"title"} component="div" className="text-red-500 text-xs mt-2" />
                                                </div>
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={"star_at"}>
                                                        Start at
                                                    </label>
                                                    <DatePicker value={startAt} defaultValue={startAt} onChange={(date)=>{
                                                        setStartAt(date)
                                                    }}  style={{ width: "100%" }} />
                                                    <ErrorMessage name={"star_at"} component="div" className="text-red-500 text-xs mt-2" />
                                                </div>
                                            </div>
                                            {/* Input  */}
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={"end_at"}>
                                                        End at
                                                    </label>
                                                    <DatePicker value={endAt} defaultValue={endAt} onChange={(date)=>{
                                                        setEndAt(date);
                                                    }}   style={{ width: "100%" }} />
                                                    <ErrorMessage name={"end_at"} component="div" className="text-red-500 text-xs mt-2" />
                                                </div>
                                            </div>
                            
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={"vacationTypeId"}>
                                                        Vacation Type
                                                    </label>
                                                    <Select
                                                        value={vacationTypeId?.toString()}
                                                        style={{ width: "100%" }}
                                                        onChange={(value: string)=>{
                                                            setVacationTypeId(parseInt(value));
                                                        }}
                                                        options={vacationTypesOptions}
                                                        />
                                                    <ErrorMessage name={"vacationTypeId"} component="div" className="text-red-500 text-xs mt-2" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={"status"}>
                                                        Status
                                                    </label>
                                                    <Select
                                                        defaultValue={status}
                                                        value={status}
                                                        style={{ width: "100%" }}
                                                        onChange={(value: "PENDING"|"APPROVED"|"REJECTED")=>{
                                                            setStatus(value);
                                                        }}
                                                        options={
                                                            [
                                                                { value: "PENDING", label: "Pinding" },
                                                                { value: "APPROVED", label: "Approved" },
                                                                { value: "REJECTED", label: "Rejected" },
                                                              ]
                                                            }
                                                        />
                                                    <ErrorMessage name={"status"} component="div" className="text-red-500 text-xs mt-2" />
                                                </div>
                                            </div>
                            
                                        </div>
                                
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
                
                
                </div>
            </section>
        </BodyWrapper>
    )
}