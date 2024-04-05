import "@/styles/globals.css";
import { useRouter } from "next/router";
import { UserProvider } from "@/contexts/userContext";
import { XRPLProvider } from "@/contexts/xrplContext";
import Marketplace from ".";
import Login from "./login";
import Dashboard from "./dashboard";

export default function App() {
  const router = useRouter();

  return (
    <XRPLProvider>
      <UserProvider>
        {router.pathname === '/' && <Marketplace />}
        {router.pathname === '/login' && <Login />}
        {router.pathname === '/dashboard' && <Dashboard />}
      </UserProvider>
    </XRPLProvider>
  );
}
