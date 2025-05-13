import { Routes as PagesRoutes, Route, } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import AuthPage from "../pages/AuthPage/AuthPage"
import Dashboard from "../pages/Dashboard/Dashboard"
import AuthMiddleware from "../middleware/AuthMiddleware"
import PostManager from "../pages/Posts/PostsManager"
import DepartmentManager from "../pages/Department/DepartmentManager"
import StaffManager from "../pages/Staff/StaffManager"
import UserManager from "../pages/Users/UserManager"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <PagesRoutes>
                <Route index element={<AuthPage />} />
                <Route path="/authPage" element={<AuthPage />} />
                <Route element={<AuthMiddleware />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<PostManager />}/>
                        <Route path="posts" element={<PostManager />}/>
                        <Route path="departments" element={<DepartmentManager />}/>
                        <Route path="staff" element={<StaffManager />}/>
                        <Route path="users" element={<UserManager />}/>
                    </Route>
                </Route>
            </PagesRoutes>
        </BrowserRouter>
    )
}

export default AppRoutes