import Card from "@components/dashboard/Card";
import { CalendarOutlined, FilterOutlined, UserSwitchOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <>
        <main className="ml-60 pt-16 max-h-screen overflow-auto ">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 mb-5 border-gray-800 border-1 shadow-md">
                <h1 className="text-xl font-bold mb-10">Here you can manage all your stuff</h1>


                <hr className="my-10"/>

                <div className="grid grid-cols-2 gap-5">
                      <Card 
                          url = "/dashboard/employees"
                          linkText = "Employees"
                          description = "Manage your employees"
                          icon ={<UserSwitchOutlined />}
                      />
                      <Card 
                          url = "/dashboard/vacations"
                          linkText = "Vacations"
                          description = "Manage your vacations"
                          icon = {<CalendarOutlined />}
                      />
                      <Card 
                          url = "/dashboard/vacation-types"
                          linkText = "Vacation Types"
                          description = "Manage your vacation types"
                          icon = {<FilterOutlined />}
                      />
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}
