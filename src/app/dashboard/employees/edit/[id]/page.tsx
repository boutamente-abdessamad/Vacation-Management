
import EmployeeForm from '@components/employees/EmployeeForm';
import { dehydrate , HydrationBoundary , QueryClient } from '@tanstack/react-query'; 
import { getVacations } from '@api/client/vacations';

export default async function Page({params} : {params: {id: number}}) {


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacations"],
    queryFn: getVacations,
  })

  return (
      <HydrationBoundary state={dehydrate(queryClient)}> 
        <EmployeeForm id={params.id}  />
      </HydrationBoundary>
  )
}
