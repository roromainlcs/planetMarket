import { UserProvider } from "@/contexts/userContext";
import { XRPLProvider } from "@/contexts/xrplContext";
import NavigationBar from "@/components/NavigationBar";
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <XRPLProvider>
          <UserProvider>
            <NavigationBar/>
            {children}
          </UserProvider>
        </XRPLProvider>
        </body>
    </html>
  )
}