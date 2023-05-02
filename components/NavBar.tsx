import { useCallback, useEffect, useState } from "react";

import NavBarItem from "./NavBarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

import { BsChevronDown } from "react-icons/bs";
import { BsSearch, BsBell } from "react-icons/bs";

interface NavBarProps {
  user?: any;
}

const TOP_OFFSET = 66;

const NavBar: React.FC<NavBarProps> = ({
  user,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-5 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <img src="/images/logo.png" className="h-5 lg:h-7" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavBarItem label="Home" />
          <NavBarItem label="Movies" />
          <NavBarItem label="Series" />
          <NavBarItem label="My List" />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            </div>
            <BsChevronDown className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} user={user} />
          </div>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;