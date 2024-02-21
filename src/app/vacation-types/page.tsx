
import ListContainer from '@components/vacationTypes/ListContainer';
import { dehydrate , HydrationBoundary , QueryClient } from '@tanstack/react-query'; 
import { getVacationTypes } from '@api/client/vacationTypes';
export default async function Page() {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacation-types"],
    queryFn: getVacationTypes,
  })

  return  <HydrationBoundary state={dehydrate(queryClient)}> 
      <ListContainer  />
    </HydrationBoundary>;
}
