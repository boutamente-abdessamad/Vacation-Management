
import ListContainer from '@/components/employees/ListContainer';
import { dehydrate , HydrationBoundary , QueryClient } from '@tanstack/react-query'; 
import { getEmployees } from '@api/client/employees';

export default async function Page() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })


  return  <HydrationBoundary state={dehydrate(queryClient)}> 
    <ListContainer />
  </HydrationBoundary>;
}
