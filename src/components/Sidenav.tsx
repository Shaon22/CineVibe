import { NavLink } from "react-router-dom";

const Sidenav = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "text-cyan-400" : "text-white";

  const navlinks = (
    <div className="flex flex-col items-start text-left text-lg font-semibold sm:">
      <>
        <NavLink to={"/"} className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to={"allBooks"} className={getNavLinkClass}>
          All books
        </NavLink>
        <NavLink to={"contact"} className={getNavLinkClass}>
          Contact
        </NavLink>
      </>
    </div>
  );
  return (
    <div className="">
      
      {navlinks}
    </div>
  );
};

export default Sidenav;
