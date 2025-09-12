import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, LogOut, User, Settings, Shield, Home } from "lucide-react";
import { useTheme } from "../theme/Themeprovides";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlState } from "../context";
import { signout } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { isAdminUser } from "@/db/apiAdmin";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, fetchUser } = UrlState();
  const isAuthenticated = !!user?.id;
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) isAdminUser().then(setIsAdmin);
    else setIsAdmin(false);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, isAuthenticated]);

  const { loading, fn: fnLogOut } = useFetch(signout);
  const handleLogout = async () => {
    await fnLogOut(); fetchUser(); navigate("/"); setMenuOpen(false);
  };

  const ThemeButton = (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-neutral-600" />}
    </button>
  );

  const UserAvatar = (
    <Avatar className="h-8 w-8">
      {user?.profile_photo ? <AvatarImage src={user.profile_photo} alt={user.full_name} /> : <AvatarFallback>{user?.full_name?.[0]?.toUpperCase()}</AvatarFallback>}
    </Avatar>
  );

  const commonLinks = [
    { name: "Home", to: "/", icon: <Home className="w-4 h-4" /> },
    ...(isAuthenticated ? [{ name: "Dashboard", to: "/dashboard", icon: <User className="w-4 h-4" /> }] : []),
    ...(isAdmin ? [{ name: "Admin", to: "/admin", icon: <Shield className="w-4 h-4" /> }] : []),
  ];

  return (
    <nav className={`sticky top-0 w-full z-50 backdrop-blur-md transition-all duration-300 bg-white/85 dark:bg-neutral-900/85 border-b border-neutral-200/50 dark:border-neutral-700/50 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          <Home className="w-6 h-6" />
          <img src={logo} alt="PrepMate Logo" className="h-8 w-8 rounded-full" /> 
  PrepMate
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {commonLinks.map(link => (
            <Link key={link.to} to={link.to} className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
              {link.icon} {link.name}
            </Link>
          ))}

          {!isAuthenticated ? (
            <>
              <Link to="/auth/login" className="px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400">Login</Link>
              <Link to="/auth/signup"><Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-6 py-2">Sign Up</Button></Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">{UserAvatar}<span className="hidden lg:block">{user.full_name}</span></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuLabel className="px-3 py-2 flex items-center gap-3">{UserAvatar}<span>{user.full_name}</span></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md"><Settings className="w-4 h-4" />Profile</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={loading} className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600">{loading ? "Signing out..." : <><LogOut className="w-4 h-4" /> Sign Out</>}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {ThemeButton}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden h-10 w-10 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setMenuOpen(p => !p)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800">
            <div className="px-6 py-6 space-y-2">
              {commonLinks.map(link => (
                <Link key={link.to} to={link.to} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setMenuOpen(false)}>
                  {link.icon} {link.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <>
                  <Link to="/auth/login" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/auth/signup" onClick={() => setMenuOpen(false)}><Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-3">Sign Up</Button></Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setMenuOpen(false)}><Settings className="w-5 h-5" />Profile</Link>
                  <button onClick={handleLogout} disabled={loading} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 w-full">{loading ? "Signing out..." : <><LogOut className="w-5 h-5" /> Sign Out</>}</button>
                </>
              )}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">{ThemeButton}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
