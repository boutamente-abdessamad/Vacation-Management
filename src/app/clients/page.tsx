
import ListContainer from '@/components/employees/ListContainer';
import { dehydrate , HydrationBoundary , QueryClient } from '@tanstack/react-query'; 
import {  Employee } from '@prisma/client';

export default async function Page() {

  const queryClient = new QueryClient();

  const getEmployees = async () => {

      try {
          const data = await fetch(`${process.env.BASE_URl}/api/employees/getEmployees`)
          if(!data.ok){
              console.log(data)
          }
        return  await data.json() as Employee[];
      } catch (error) {
          console.log('Something went wrong');
      }


  };


await queryClient.prefetchQuery({
  queryKey: ["employees"],
  queryFn: getEmployees,
})


  return  <HydrationBoundary state={dehydrate(queryClient)}> 
    <ListContainer />
  </HydrationBoundary>;
}
