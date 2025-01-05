import "@/styles/global.css";
import { UserProvider } from "@/contexts/userContext";
import { XRPLProvider } from "@/contexts/xrplContext";
import Marketplace from "./marketplace";
import NavigationBar from "@/components/NavigationBar";

export default function App() {

  return (
    <Marketplace />
  );
}