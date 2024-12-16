import { ChevronLeft, LucideGithub } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import linkedin from "/images/linkedin.svg";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between">
        <div className="flex">
          {pathname !== "/" && (
            <Link to=".." className="mr-4">
              <ChevronLeft />
            </Link>
          )}
          <div className="flex items-center gap-3">
            <p className="inline-flex gap-2">
              <LucideGithub /> Github repository
            </p>

            <a
              href={"https://github.com/LeulBerhanu/vehicle_management_client"}
              className="inline-flex gap-2 group "
            >
              <p className="group-hover:underline underline-offset-4 ">
                Client
              </p>
            </a>

            <a
              href={"https://github.com/LeulBerhanu/vehicle_management_server"}
              className="inline-flex gap-2 group "
            >
              <p className="group-hover:underline underline-offset-4">Server</p>
            </a>
          </div>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/leul-berhanu/">
            <img src={linkedin} className="w-8 h-8" alt="linkedin logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
