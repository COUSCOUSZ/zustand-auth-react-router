import { LinkProps, NavLink } from "react-router-dom";

const Link = ({ to = "", children }: LinkProps) => {
    return (
        <NavLink to={to}
            className={({ isActive, isPending }) => {
                let baseClass = "hover:text-blue-500";
                if (isActive) {
                    return `${baseClass} text-blue-500 border-b border-blue-500`;
                } else if (isPending) {
                    return `${baseClass} text-red-500`;
                } else {
                    return baseClass;
                }
            }}>
            {children}
        </NavLink>
    )
}

export default Link;