import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center hover-effect">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                DriveSafeAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/features">Features</NavLink>
              <NavLink to="/scoreboard">Scoreboard</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {user ? (
                <>
                  <NavLink to="/dashboard">
                    <User className="w-5 h-5 inline-block mr-1" />
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover-effect transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden hover-effect">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/features">Features</MobileNavLink>
            <MobileNavLink to="/scoreboard">Scoreboard</MobileNavLink>
            <MobileNavLink to="/about">About Us</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
            {user ? (
              <>
                <MobileNavLink to="/dashboard">
                  <User className="w-5 h-5 inline-block mr-1" />
                  Dashboard
                </MobileNavLink>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-md text-red-400 hover:bg-red-500/20 transition-all flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover-effect"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all hover-effect"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 transition-all"
  >
    {children}
  </Link>
);

export default Navbar;