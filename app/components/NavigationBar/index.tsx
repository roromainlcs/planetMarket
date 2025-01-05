"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import "@/styles/navbar.css";
import { useRouter } from "next/navigation";
import { useXRPL } from "@/contexts/xrplContext";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
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
    <div className='flex bg-transparent justify-center pointer-events-none mt-4'>
      <nav id='nav' className='min-w-[850px] bg-navbar font-white flex justify-between items-center w-11/12 px-8 py-2 pointer-events-auto border rounded-full'>
        <div className='left'>
          <h1>PlanetMarket</h1>
          {userWallet && (
            <p className="-mb-1.5 pl-1">
              {userBalance !== undefined ? userBalance.toString() : "loading"}{" "}
              XRPs
            </p>
          )}
        </div>
        <div className='right'>
          {userWallet && userWallet.address ? (
            <button className='navbar_button' onClick={() => router.push("/login")}>
              {userWallet.address}
            </button>
          ) : (
            <button className='navbar_button' onClick={() => router.push("/login")}>Login</button>
          )}
          {pathname === "/" ? (
            <button className='navbar_button' onClick={() => router.push(userWallet ? "/dashboard" : "/login")}>
              Go to Dashboard
            </button>
          ) : (
            <button className='navbar_button' onClick={() => router.push("/")}>
              Go to Marketplace
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
