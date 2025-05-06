import { calculateTrendPercentage, cn } from 'lib/utils'
import React from 'react'

const StatsCard = ({
    headerTitle,
    total,
    lastMonthCount,
    currentMonthCount,
}: StatsCard) => {
    const { trend, percentage } = calculateTrendPercentage(
        currentMonthCount, lastMonthCount)
    const isDecrement = trend === "decrement"
    return (
        <article className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{headerTitle}</h3>
            <div className="content flex justify-between items-center mt-4">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{total}</h2>
                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-1">
                            <img
                                src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`}
                                className="size-5"
                                alt="arrow"
                            />
                            <figcaption
                                className={cn(
                                    "text-sm font-semibold",
                                    isDecrement ? "text-red-500" : "text-green-600"
                                )}
                            >
                                {Math.round(percentage)}%
                            </figcaption>
                        </figure>
                        <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                    </div>
                </div>
                <img
                    src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`}
                    alt="trend graph"
                    className="w-28 h-20 object-contain"
                />
            </div>
        </article>

    )
}

export default StatsCard
