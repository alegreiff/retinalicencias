import Link from "next/link";
import React from "react";

export const BarraNavProvisional = () => {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/settings">Settings</Link>
      </li>
    </ul>
  );
};
