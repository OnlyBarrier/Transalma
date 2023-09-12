
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [state, setState] = useState(""); // Por ejemplo, aquí estás utilizando useState

  return (
    <div className="bg-blue-600">
      <div className="d-flex flex-column p-3 bg-dark text-white">
        <h2 className="bg-blue-600">My Sidebar</h2>
        <ul className="nav nav-pills flex-column mt-3 bg-blue-600">
          <li className="nav-item">
            <Link href="/">
              home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              about
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
