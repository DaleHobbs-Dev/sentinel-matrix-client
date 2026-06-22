import { Link } from "react-router-dom";

export const SidebarLink = ({ to, children, icon }) => {
  return (
    <Link to={to} className="sidebar-link">
      {icon && <span className="sidebar-link-icon">{icon}</span>}
      <span className="sidebar-link-text">{children}</span>
    </Link>
  );
}