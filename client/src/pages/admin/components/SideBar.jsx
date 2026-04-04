import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { links } from "../data/SidebarContents.jsx";
import { signOut } from "../../../redux/user/userSlice.jsx";
import { showSidebarOrNot } from "../../../redux/adminSlices/adminDashboardSlice/DashboardSlice.jsx";

const SideBar = () => {
  const { activeMenu, screenSize } = useSelector(
    (state) => state.adminDashboardSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeLink =
    "m-2 flex items-center gap-5 rounded-lg bg-blue-50 pl-4 pb-2.5 pt-3 text-md text-black";
  const normalLink =
    "m-2 flex items-center gap-5 rounded-lg pl-4 pb-2.5 pt-3 text-md text-gray-700 hover:bg-slate-100 dark:hover:text-black";

  const closeSidebar = () => {
    if (screenSize <= 900 && activeMenu) {
      dispatch(showSidebarOrNot(false));
    }
  };

  const handleSignout = async () => {
    const res = await fetch("/api/admin/signout", {
      method: "GET",
    });
    const data = await res.json();

    if (data) {
      dispatch(signOut());
      navigate("/signin");
    }
  };

  return (
    <div className="ml-3 h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex items-center justify-between">
            <Link
              to="/adminDashboard"
              className="mt-4 ml-3 flex items-center gap-3 text-xl font-extrabold tracking-tight text-blue-500"
            >
              <SiShopware />
              Alquila un Auto
            </Link>

            <TooltipComponent content="menu" position="BottomCenter">
              <button
                type="button"
                className="mt-4 block rounded-full p-3 text-xl hover:bg-gray-100 md:hidden"
                onClick={() => dispatch(showSidebarOrNot(false))}
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            {links.map((group) => (
              <div key={group.title}>
                <p className="m-3 mt-4 text-uppercase text-gray-700">{group.title}</p>
                {group.links.map((link) => (
                  <NavLink
                    to={`/adminDashboard/${link.path || link.name}`}
                    key={link.path || link.name}
                    onClick={closeSidebar}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize text-gray-600">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            <div className="mt-10 flex items-center gap-2">
              <button
                type="button"
                className="ml-4 text-red-400"
                onClick={handleSignout}
              >
                Cerrar sesion
              </button>
              <CiLogout />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
