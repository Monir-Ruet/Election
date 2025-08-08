import { DashboardCards } from "./_components/dashboard-cards";

export default function Dashboard() {
    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <DashboardCards />
        </div>
    );
}