import UserDashboardHeader from "./UserDashboardHeader";
import UsersTable from "./UsersTable";

export function UserDashboard() {
  return (
    <div className="rounded-md flex flex-col gap-4 shadow-gray-400 shadow-xl w-[1400px] min-h-[700px] py-8">
      <UserDashboardHeader />
      <div className="self-center w-[1000px]">
        <UsersTable />
      </div>
    </div>
  );
}
