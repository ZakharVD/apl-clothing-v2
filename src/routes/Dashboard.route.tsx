import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UpdateEmail from "../pages/UpdateEmail";
import UpdatePassword from "../pages/updatePassword";

export default function DashboardRoute() {
    return (
        <Routes>
            <Route index element={<Dashboard/>}/>
            <Route path="/update-email" element={<UpdateEmail/>}/>
            <Route path="/update-password" element={<UpdatePassword/>} />
        </Routes>
    )
}