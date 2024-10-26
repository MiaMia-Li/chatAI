"use client";
import React from "react";
import Link from "next/link";
import UserSettings from "./user-settings";
import UserLogin from "./user-login";
import { useSession } from "next-auth/react";

const UserNav = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center">
      <Link href="buy-credits">Pricing</Link>

      {!session?.expires ? <UserLogin /> : <UserSettings />}
    </div>
  );
};

export default UserNav;
