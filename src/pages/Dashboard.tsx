import { DashboardFilmCard } from "../components/Dashboard-film-card"
import { DashboardLocationCard } from "../components/Dashboard-location-card"
import { DashboardPeopleCard } from "../components/Dashboard-people-card"

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