import Header from 'components/Header'
import React from 'react'

const trips = () => {
    const user = {
        name: "Adrian",
    }
    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? "Guest"} 👋`}
                description="Track activity, trends and popular destinations in real-time."
            />
        </main>
    )
}

export default trips
