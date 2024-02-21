"use client";
import React , {useCallback ,useState} from 'react';
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/employees/Datatable';
import Toolbar from '@components/Toolbar';


export default   function  ListContainer() {

    return (    
                <BodyWrapper>
                    <Toolbar
                        title="Clients"
                        buttonTitle="Add Client"
                        handelClick={() => console.log('clicked')}
                    />
                    <Datatable />
                </BodyWrapper>
        
        );
}