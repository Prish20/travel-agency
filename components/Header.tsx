import { cn } from 'lib/utils';
import { useLocation } from 'react-router';

interface Props {
    title: string;
    description: string;
}

const Header = ({ title, description }: Props) => {
    const location = useLocation();
    return (
        <header className="header">
            <article>
                <h1 className={cn("text-white", location.pathname === "/" ? "text-2xl md:text-4xl font-bold" : "text-xl md:text-2xl font-semibold")}>{title}</h1>
                <h1 className={cn("text-white/50 font-normal", location.pathname === "/" ? "text-base md:text-lg" : "text-sm md:text-lg")}>{description}</h1>

            </article>
        </header>
    )
}

export default Header
