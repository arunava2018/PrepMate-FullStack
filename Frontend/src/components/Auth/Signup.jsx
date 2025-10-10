import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UrlState } from '@/context';

// ✅ Validation Schema
const signupSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  college: Yup.string().required('College name is required'),
  passoutYear: Yup.number()
    .typeError('Passout year must be a number')
    .min(2000, 'Enter a valid year')
    .max(new Date().getFullYear() + 10, 'Year too far')
    .required('Passout year is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = UrlState(); // ✅ use signup from context

  // redirect to the page user originally wanted, or dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    passoutYear: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

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

      await signupSchema.validate(formData, { abortEarly: false });

      // ✅ remove confirmPassword before sending
      const { confirmPassword, ...signupData } = formData;

      // ✅ ensure passoutYear is sent as an integer
      signupData.passoutYear = parseInt(signupData.passoutYear, 10);

      await signup(signupData); // use context signup

      setSuccessAlert(true);

      // ✅ redirect automatically
      setTimeout(() => navigate(from, { replace: true }), 2000);
    } catch (err) {
      if (err?.inner) {
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
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>

      {successAlert && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Signup Successful!</AlertTitle>
          <AlertDescription>Redirecting...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* College */}
          <div className="space-y-1">
            <Input
              name="college"
              type="text"
              placeholder="College Name"
              value={formData.college}
              onChange={handleInputChange}
            />
            {errors.college && (
              <p className="text-red-500 text-sm">{errors.college}</p>
            )}
          </div>

          {/* Passout Year */}
          <div className="space-y-1">
            <Input
              name="passoutYear"
              type="number"
              placeholder="Passout Year"
              value={formData.passoutYear}
              onChange={handleInputChange}
            />
            {errors.passoutYear && (
              <p className="text-red-500 text-sm">{errors.passoutYear}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 relative">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </CardContent>

        {errors.general && (
          <p className="text-red-500 text-center mt-2">{errors.general}</p>
        )}

        <CardFooter>
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-yellow-600">
            {loading ? <BeatLoader size={10} color="#fff" /> : 'Signup'}
          </Button>
        </CardFooter>
      </form>

      <p className="mx-auto mt-2">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/auth/login')}
          className="text-yellow-400 underline cursor-pointer">
          Login
        </span>
      </p>
    </Card>
  );
}

export default Signup;
