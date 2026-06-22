import { Link } from "react-router-dom";

export const SidebarLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-lighter hover:text-primary-dark"
    >
      {icon && <span className="text-slate-500">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}
