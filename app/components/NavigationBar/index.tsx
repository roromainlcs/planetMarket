"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import "@/styles/navbar.css";
import { useRouter } from "next/navigation";
import { useXRPL } from "@/contexts/xrplContext";
import { usePathname } from "next/navigation";
import { FloatingNav } from "../ui/floating-navbar";
import { SpeButton } from "../ui/shadcn/button";

function NavigationBar() {
  const router = useRouter();
  const { userWallet } = useUser();
  const { getBalanceFromWallet, xrplClient } = useXRPL();
  const [userBalance, setUserBalance] = useState<Number | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    if (userWallet && userWallet !== undefined) {
      getBalanceFromWallet(
        userWallet?.classicAddress
      ).then((newBalance) => {
      setUserBalance(newBalance);
      });
    } else {
      console.log("no wallet found");
    }
  }, [userWallet, xrplClient]);

  return (
    <FloatingNav className="self-center font-white flex justify-between items-center *:flex-shrink-0 min-w-[800px] flex-shrink-0">
      <div className='left'>
        <h1 className='text-xl'>PlanetMarket</h1>
        {userWallet && (
          <p className="-mb-1 pl-1.5">
            {userBalance !== undefined ? userBalance.toString() : "loading"}{" "}
            XRPs
          </p>
        )}
      </div>
      <div className='mr-6'>
        {userWallet && userWallet.address ? (
          <SpeButton className='navbar_button' onClick={() => router.push("/login")}>
            {userWallet.address}
          </SpeButton>
        ) : (
          <SpeButton className='navbar_button' onClick={() => router.push("/login")}>Login</SpeButton>
        )}
        {pathname === "/" ? (
          <SpeButton className='navbar_button' onClick={() => router.push(userWallet ? "/dashboard" : "/login")}>
            Go to Dashboard
          </SpeButton>
        ) : (
          <SpeButton className='navbar_button' onClick={() => router.push("/")}>
            Go to Marketplace
          </SpeButton>
        )}
      </div>
    </FloatingNav>
  );
};

export default NavigationBar;
