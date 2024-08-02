import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  console.log("menuRef", menuRef.current);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click was outside the menuRef
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="">
      <div className="p-4">
        <button
          type="button"
          className=""
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-start"
          >
            <div
              ref={menuRef}
              className="w-40 h-48 items-center overflow-y-auto bg-slate-300 border-l rounded-lg  text-slate-950 font-medium ml-1 "
            >
              <div className="p-4">
                <ul className="">
                  <li>
                    <a
                      href="#"
                      className="block px-1 py-2"
                      aria-current="page"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Write A Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className=" flex flex-row px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Edit Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 pt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SignOut
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
