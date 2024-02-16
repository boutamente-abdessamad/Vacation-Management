"use client";
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@components/clients/Datatable';
import Toolbar from '@components/Toolbar';

export default function ListContainer() {
    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacations"
                buttonTitle="Add Vacation"
                onClick={() => console.log('clicked')}
            />
            <Datatable />
        </BodyWrapper>
      );
}