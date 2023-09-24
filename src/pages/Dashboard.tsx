import { DashboardFilmCard } from "@/components/Dashboard/Dashboard-film-card"
import { DashboardLocationCard } from "@/components/Dashboard/Dashboard-location-card"
import { DashboardPeopleCard } from "@/components/Dashboard/Dashboard-people-card"

function Dashboard() {

    

    return (
        <div className="pageContent">
            <DashboardFilmCard />

            <DashboardPeopleCard />

            <DashboardLocationCard />
        </div>
    )
}

export default Dashboard