import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
      localStorage.removeItem("token");
      navigate("/authPage");
  }
  return (
    <div className="flex gap-4">
        <Link to='departments'>departements</Link>
        <Link to="posts">Posts</Link>
        <Link to="staff">staff</Link>
        <Link to="users">users</Link>
        <button onClick={handlelogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    </div>
  )
}

export default NavBar