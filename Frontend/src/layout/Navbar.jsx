import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Shield,
  Home,
  BookOpen,
  MessageSquareText,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from '../theme/Themeprovides';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UrlState } from '../context';
import { signout } from '@/db/apiAuth';
import useFetch from '@/hooks/useFetch';
import { isAdminUser } from '@/db/apiAdmin';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, fetchUser } = UrlState();
  const isAuthenticated = !!user?.id;
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check admin access
  useEffect(() => {
    if (isAuthenticated) isAdminUser().then(setIsAdmin);
    else setIsAdmin(false);
  }, [isAuthenticated]);

  // Logout handler
  const { loading, fn: fnLogOut } = useFetch(signout);
  const handleLogout = async () => {
    await fnLogOut();
    fetchUser();
    navigate('/');
    setMenuOpen(false);
  };

  // Theme toggle button
  const ThemeButton = (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-[#5e554a] transition-colors hover:bg-[#f2eee6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      {theme === 'dark' ? (
        <Sun size={18} className="text-primary" />
      ) : (
        <Moon size={18} className="text-muted-foreground" />
      )}
    </button>
  );

  // Avatar
  const UserAvatar = (
    <Avatar className="h-8 w-8">
      {user?.profile_photo ? (
        <AvatarImage src={user.profile_photo} alt={user.full_name} />
      ) : (
        <AvatarFallback>{user?.full_name?.[0]?.toUpperCase()}</AvatarFallback>
      )}
    </Avatar>
  );

  // Common links
  const commonLinks = [
    { name: 'Home', to: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Features', to: '/#features', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Experiences', to: '/view-interview-experiences', icon: <MessageSquareText className="w-4 h-4" /> },
    ...(isAuthenticated
      ? [
          {
            name: 'Dashboard',
            to: '/dashboard',
            icon: <User className="w-4 h-4" />,
          },
        ]
      : []),
    ...(isAdmin
      ? [{ name: 'Admin', to: '/admin', icon: <Shield className="w-4 h-4" /> }]
      : []),
  ];

  return (
    <nav
      className="site-nav sticky top-0 z-50 w-full border-b border-black/10 bg-[#f7f4ee] text-[#1f1b16] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de]">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-6 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 text-sm font-medium md:flex">
          {commonLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={pathname === link.to || (link.name === 'Features' && pathname === '/' && hash === '#features') ? 'page' : undefined}
              className={`site-nav-link inline-flex min-h-9 items-center gap-2 rounded-md px-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${pathname === link.to || (link.name === 'Features' && pathname === '/' && hash === '#features') ? 'bg-[#efe9df] text-[#1f1b16] dark:bg-[#262421] dark:text-[#efe9de]' : 'text-[#5e554a] hover:bg-[#efe9df] hover:text-[#1f1b16] dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]'}`}>
              {link.icon} {link.name}
            </Link>
          ))}

          {/* Auth Section */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/auth/login"
                className="inline-flex h-10 items-center rounded-md px-3 font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
                Log in
              </Link>
              <Link to="/auth/signup">
                <Button className="h-10 rounded-md bg-[#2459a6] px-4 font-medium text-white shadow-none hover:bg-[#1d4a8a] dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:hover:bg-[#262421]">
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md">
                    <Settings className="w-4 h-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive">
                  {loading ? (
                    'Signing out...'
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" /> Sign Out
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {ThemeButton}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#5e554a] transition-colors hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:bg-[#262421] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-black/10 bg-[#f7f4ee] dark:border-white/10 dark:bg-[#161513] md:hidden">
            <div className="mx-auto max-w-[1440px] space-y-1 px-5 py-3 sm:px-6">
              {commonLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]"
                  onClick={() => setMenuOpen(false)}>
                  {link.icon} {link.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth/login"
                    className="flex min-h-10 items-center rounded-md px-3 py-2 text-sm text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]"
                    onClick={() => setMenuOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="h-10 w-full rounded-md bg-[#2459a6] px-4 font-medium text-white shadow-none hover:bg-[#1d4a8a] dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
                      Sign up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]"
                    onClick={() => setMenuOpen(false)}>
                    <Settings className="w-5 h-5" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                    {loading ? (
                      'Signing out...'
                    ) : (
                      <>
                        <LogOut className="w-5 h-5" /> Sign Out
                      </>
                    )}
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
