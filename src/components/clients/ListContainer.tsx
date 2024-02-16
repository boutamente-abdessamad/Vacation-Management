"use client";
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@components/clients/Datatable';
import Toolbar from '@components/Toolbar';

export default function ListContainer() {
    return (    

        <BodyWrapper>
            <Toolbar
                title="Clients"
                buttonTitle="Add Client"
                onClick={() => console.log('clicked')}
            />
            <Datatable />
        </BodyWrapper>
      );
}