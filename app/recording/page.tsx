"use client";
import React, { useState,useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Layout from "@/components/Common/Layout";
import ClassComp from "@/components/Recording/ClassComp";
import SearchComp from "@/components/Recording/SearchComp";
import SessionComp from "@/components/Recording/SessionComp";
import { isAuthenticated } from "@/utils/auth"; // Import the auth check

type ComponentType = "class" | "search" | "session"; // Define a union type for valid component types

export default function Recordings() {
  // State to manage active component
  const [activeComponent, setActiveComponent] =
    useState<ComponentType>("class"); // Specify the type of activeComponent

  // Function to set active component
  const handleButtonClick = (component: ComponentType) => {
    // Specify the type of the component parameter
    setActiveComponent(component);
  };

  // Render component based on activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case "class":
        return <ClassComp />;
      case "search":
        return <SearchComp />;
      case "session":
        return <SessionComp />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Navbar */}
        <nav className="mt-16 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Recording
            <span className="text-lg sm:text-2xl font-light">(Classes)</span>
          </h1>

         <div className="hidden sm:block">
         <Layout currentPage="Recordings" />
         </div>
        </nav>

        {/* Section with buttons and dropdowns */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between">
          {/* Left side */}
          <div className="mt-10 flex sm:w-1/3 justify-center">
            <div className="flex flex-col w-60">
              <button
                className="mb-1 w-full sm:w-36 rounded-md bg-gradient-to-br from-primary to-blue-300 hover:bg-gradient-to-tl hover:from-primary hover:to-blue-300 px-4 py-2 text-black font-bold"
                onClick={() => handleButtonClick("class")}
              >
                Class
              </button>
              <button
                className="mb-1 w-full sm:w-36 rounded-md bg-gradient-to-br from-primary to-blue-300 hover:bg-gradient-to-tl hover:from-primary hover:to-blue-300 px-4 py-2 text-black font-bold"
                onClick={() => handleButtonClick("search")}
              >
                Search
              </button>
              <button
                className="mb-1 w-full sm:w-36 rounded-md bg-gradient-to-br from-primary to-blue-300 hover:bg-gradient-to-tl hover:from-primary hover:to-blue-300 px-4 py-2 text-black font-bold"
                onClick={() => handleButtonClick("session")}
              >
                Session
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="mt-10 sm:ml-20 flex-grow space-y-4">
            {renderComponent()}
          </div>
        </section>
      </main>
    </div>
  );
}