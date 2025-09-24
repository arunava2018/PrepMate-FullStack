import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sun, Moon, Menu, X, LogOut, User, Settings, Shield, Home, GraduationCap
} from "lucide-react";
import { useTheme } from "../theme/Themeprovides";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlState } from "../context";
import { signout } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { isAdminUser } from "@/db/apiAdmin";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, fetchUser } = UrlState();
  const isAuthenticated = !!user?.id;
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check admin + scroll listener
  useEffect(() => {
    if (isAuthenticated) isAdminUser().then(setIsAdmin);
    else setIsAdmin(false);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  // Logout handler
  const { loading, fn: fnLogOut } = useFetch(signout);
  const handleLogout = async () => {
    await fnLogOut();
    fetchUser();
    navigate("/");
    setMenuOpen(false);
  };

  // Theme toggle button
  const ThemeButton = (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border hover:bg-muted transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? <Sun size={18} className="text-primary" />
        : <Moon size={18} className="text-muted-foreground" />}
    </button>
  );

  // Avatar
  const UserAvatar = (
    <Avatar className="h-8 w-8">
      {user?.profile_photo
        ? <AvatarImage src={user.profile_photo} alt={user.full_name} />
        : <AvatarFallback>{user?.full_name?.[0]?.toUpperCase()}</AvatarFallback>}
    </Avatar>
  );

  // Common links
  const commonLinks = [
    { name: "Home", to: "/", icon: <Home className="w-4 h-4" /> },
    ...(isAuthenticated
      ? [{ name: "Dashboard", to: "/dashboard", icon: <User className="w-4 h-4" /> }]
      : []),
    ...(isAdmin
      ? [{ name: "Admin", to: "/admin", icon: <Shield className="w-4 h-4" /> }]
      : []),
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 backdrop-blur-md transition-all duration-300 
      bg-background/85 border-b border-border 
      ${scrolled ? "shadow-lg" : "shadow-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <GraduationCap className="h-8 w-8 rounded-full" />
          PrepMate
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {commonLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
              text-muted-foreground hover:text-primary transition-colors"
            >
              {link.icon} {link.name}
            </Link>
          ))}

          {/* Auth Section */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-primary"
              >
                Login
              </Link>
              <Link to="/auth/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted"
                >
                  {UserAvatar}
                  <span className="hidden lg:block">{user.full_name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuLabel className="px-3 py-2 flex items-center gap-3">
                  {UserAvatar} <span>{user.full_name}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-md"
                  >
                    <Settings className="w-4 h-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive"
                >
                  {loading ? "Signing out..." : <><LogOut className="w-4 h-4" /> Sign Out</>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {ThemeButton}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden h-10 w-10 rounded-lg hover:bg-muted"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-2">
              {commonLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon} {link.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth/login"
                    className="block px-4 py-3 rounded-lg hover:bg-muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive w-full"
                  >
                    {loading ? "Signing out..." : <><LogOut className="w-5 h-5" /> Sign Out</>}
                  </button>
                </>
              )}

              <div className="border-t border-border pt-4 mt-4">
                {ThemeButton}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
