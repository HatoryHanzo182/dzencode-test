import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopMenu from "@/components/top-menu/TopMenu";
import NavigationMenu from "@/components/navigation-menu/NavigationMenu";
import OrdersPage from "@/pages/orders/OrdersPage";
import GroupsPage from "@/pages/groups/GroupsPage";
import { useEffect } from "react";
import { EnsureToken } from "@/utils/auth";

export default function App()
{
    useEffect(() =>
    {
        EnsureToken();
    }, []);
    
    return (
        <BrowserRouter>
            <TopMenu />
            <div className="layout-app">
                <NavigationMenu />
                <main className="page-content__animation">
                    <Routes>
                        <Route path="/" element={<Navigate to="/orders" replace/>}/>
                        <Route path="/orders" element={<OrdersPage />}/>
                        <Route path="/orders/:orderId/products" element={<OrdersPage />}/>
                        <Route path="/groups" element={<GroupsPage />}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}