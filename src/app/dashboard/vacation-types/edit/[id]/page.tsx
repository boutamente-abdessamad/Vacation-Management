
import VacationTypeForm from '@components/vacationTypes/VacationTypeForm';
import { dehydrate , HydrationBoundary , QueryClient } from '@tanstack/react-query'; 
import { getVacationType } from '@api/client/vacationTypes';

export default async function Page({params} : {params: {id: number}}) {


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacation-type", params.id  ],
    queryFn: getVacationType,
  })

  return (
      <HydrationBoundary state={dehydrate(queryClient)}> 
        <VacationTypeForm id={params.id}  />
      </HydrationBoundary>
  )
}
