"use client";
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/employees/Datatable';
import Toolbar from '@components/Toolbar';

export default function ListContainer() {
    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacations"
                buttonTitle="Add Vacation"
                handelClick={() => console.log('clicked')}
            />
            <Datatable />
        </BodyWrapper>
      );
}