import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/calculators", label: "Calculators" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center">

          <img src="/logo.svg" alt="MK" className="h-8 mr-2 animate-spin-slow" />MK Brothers
                    
        </Link>

        <div className="flex items-center space-x-4">
          <DarkModeToggle className="mr-2" />
          <div className="hidden md:flex space-x-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary">

                {l.label}

              </Link>
            ))}
          </div>
          <button className="md:hidden" onClick={toggle}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-800 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">

              {l.label}

            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}