import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./header.css";
export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Pick Up User</li>
          {isAuthenticated && (
            <>
              <li onClick={() => navigate("/dashboard")}>Dashboard</li>
              <li onClick={() => navigate("/admin")}>Admin</li>
            </>
          )}
        </ul>
      </nav>
      <span onClick={() => navigate("/profile")} className="user">
        {user?.firstName} {user?.lastName} - {user?.balance}
      </span>
    </header>
  );
};
