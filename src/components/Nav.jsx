import { useState, useEffect } from 'react';

const Nav = ({ homeRef, educationRef, workRef, portfolioRef, skillsRef }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", ref: homeRef, id: "home" },
    { name: "Education", ref: educationRef, id: "education" },
    { name: "Experience", ref: workRef, id: "work" },
    { name: "Skills", ref: skillsRef, id: "skills" },
    { name: "Portfolio", ref: portfolioRef, id: "portfolio" },
  ];

  const executeScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setToggleMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const scrollPosition = window.scrollY + 100;
      
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section?.offsetTop <= scrollPosition &&
            section?.offsetTop + section?.offsetHeight > scrollPosition) {
          setActiveSection(item.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    } transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-16">
          <div 
            className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            onClick={() => executeScroll(homeRef)}
          >
            Safir JM
          </div>
          
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => executeScroll(item.ref)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-cyan-600'
                      : 'text-gray-700 hover:text-cyan-500'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-cyan-600 transition-all duration-300"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-16">
          <div 
            className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            onClick={() => executeScroll(homeRef)}
          >
            SJM
          </div>
          
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="p-2 text-gray-700 rounded-md focus:outline-none"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={toggleMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          toggleMenu ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => executeScroll(item.ref)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-cyan-500'
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;