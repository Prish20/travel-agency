import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "lib/utils";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface TripCardProps {
    id: string;
    name: string;
    imageUrls: string[];
    itinerary: { location: string }[];
    tags: string[];
    travelStyle: string;
    estimatedPrice: string;
}

const TripCard: FC<TripCardProps> = ({
    id,
    name,
    imageUrls,
    itinerary,
    tags,
    estimatedPrice,
}) => {
    const path = useLocation();
    return (
        <div className="trip-card relative shadow-300 bg-white rounded-[20px] flex-col w-full overflow-hidden">
            <div className="relative">
                <img
                    src={imageUrls[0]}
                    alt={name}
                    className="w-full h-[160px] object-cover rounded-t-[20px]"
                />
                <Link
                    to={
                        path.pathname === '/' || path.pathname.startsWith('/travel')
                            ? `/travel/${id}`
                            : `/trips/${id}`
                    }
                    className="absolute inset-0 z-10"
                />
                <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                    {estimatedPrice}
                </div>
            </div>

            <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5 pb-4 pointer-events-none">
                <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">
                    {name}
                </h2>

                <figure className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z"
                        />
                    </svg>
                    <figcaption className="text-xs md:text-sm font-normal text-gray-500">
                        {itinerary[0].location}
                    </figcaption>
                </figure>

                <div className="flex flex-wrap gap-2 mt-2">
                    <ChipListComponent id="travel-chip">
                        <ChipsDirective>
                            {tags.map((tag, index) => (
                                <ChipDirective
                                    key={index}
                                    text={getFirstWord(tag)}
                                    cssClass={cn(index === 1 ? '!bg-pink-50 !text-pink-500' : '!bg-success-50 !text-success-700',)}
                                />
                            ))}
                        </ChipsDirective>
                    </ChipListComponent>
                </div>
            </article>
        </div>
    );
};

export default TripCard;
