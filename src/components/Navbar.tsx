import Image from "next/image";
import NavbarItems from "./NavbarItems";

import { FiChevronDown } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const TOP_OFFSET = 66;

const Navbar = () => {
  const { data: user } = useCurrentUser();

  const [showMobile, setShowMobile] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobile(!showMobile);
  }, [showMobile]);

  const toggleAccountMenu = useCallback(() => {
    setShowAccount(!showAccount);
  }, [showAccount]);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500  ${
          showBackground ? "bg-zinc-900/90" : ""
        }`}
      >
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />

        <div className=" flex-row gap-4 font-bold drop-shadow-2xl md:flex hidden ml-8">
          <NavbarItems label="Home" />
          <NavbarItems label="Series" />
          <NavbarItems label="Films" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My List" />
          <NavbarItems label="Browse by language" />
        </div>

        <div
          className="md:hidden flex items-center cursor-pointer relative gap-2 ml-8"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm">Browse</p>
          <FiChevronDown
            className={`text-white transition duration-300 ease-in-out ${
              showMobile ? "rotate-180" : "rotate-0"
            }`}
            size={20}
          />

          <MobileMenu visible={showMobile} />
        </div>

        <div className="ml-auto">
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={toggleAccountMenu}
          >
            {user?.image && (
              <Image
                src={user?.image !== "" ? user?.image : "/images/default.png"}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-md "
              />
            )}

            <FiChevronDown
              className={`text-white transition duration-300 ease-in-out ${
                showAccount ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
            <AccountMenu visible={showAccount} user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
