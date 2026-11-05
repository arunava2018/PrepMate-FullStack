import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BeatLoader } from 'react-spinners';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UrlState } from '@/context';

// Login validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = UrlState(); // ogin comes from context now
  const emailInputRef = useRef(null);

  // either go back to intended page, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      setLoading(true);
      await loginSchema.validate(formData, { abortEarly: false });

      // 🔑 Call login from context
      await login(formData);

      setSuccessAlert(true);

      // Redirect after 2s
      setTimeout(() => navigate(from, { replace: true }), 2000);
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => (newErrors[e.path] = e.message));
        setErrors(newErrors);
      } else {
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {successAlert && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Login successful</AlertTitle>
          <AlertDescription>Taking you to your dashboard</AlertDescription>
        </Alert>
      )}

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          className="h-11 rounded-lg border-border bg-background/80 px-3 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-2"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleInputChange}
          ref={emailInputRef}
          required
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="relative space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          className="h-11 rounded-lg border-border bg-background/80 px-3 pr-11 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-2"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-1 top-[29px] inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      {/* General error */}
      {errors.general && (
        <p className="text-sm text-destructive">{errors.general}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="h-12 w-full rounded-lg bg-primary text-primary-foreground shadow-none hover:bg-primary/90">
        {loading ? <BeatLoader size={10} color="#fff" /> : 'Login'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/auth/signup" state={{ from: location.state?.from }} className="font-medium text-primary underline-offset-4 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
