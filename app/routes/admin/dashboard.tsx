import StatsCard from 'components/dashboard/StatsCard'
import Header from 'components/Header'
import TripCard from 'components/trip/TripCard'
import { allTrips } from '~/constants'

const dashboard = () => {
    const user = {
        name: "Adrian",
    }

    const dashboardStats = {
        totalUsers: 12450,
        usersJoined: {
            currentMonth: 218,
            lastMonth: 176,
        },
        totalTrips: 3210,
        tripsCreated: {
            currentMonth: 150,
            lastMonth: 250,
        },
        userRole: {
            total: 62,
            currentMonth: 25,
            lastMonth: 15,
        }
    }

    const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? "Guest"} 👋`}
                description="Track activity, trends and popular destinations in real-time."
            />
            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrips}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active Users Today"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>
            <section className="flex flex-col gap-6">
                <h3 className="text-xl font-semibold text-dark-100">Created Trips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {allTrips.slice(0, 4).map((trip) => (
                        <TripCard key={trip.id} {...trip} />
                    ))}
                </div>

            </section>
        </main>
    )
}

export default dashboard
