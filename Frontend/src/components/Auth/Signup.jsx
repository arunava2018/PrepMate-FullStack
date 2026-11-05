import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UrlState } from '@/context';

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  college: Yup.string().required('College name is required'),
  passoutYear: Yup.number()
    .typeError('Graduation year must be a number')
    .min(2000, 'Enter a valid year')
    .max(new Date().getFullYear() + 10, 'Year too far')
    .required('Graduation year is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const fields = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'college', label: 'College or institution', type: 'text', placeholder: 'Your college' },
  { name: 'passoutYear', label: 'Graduation year', type: 'number', placeholder: '2027' },
];

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = UrlState();
  const from = location.state?.from?.pathname || '/dashboard';
  const [formData, setFormData] = useState({
    name: '', email: '', college: '', passoutYear: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      setLoading(true);
      await signupSchema.validate(formData, { abortEarly: false });
      const { confirmPassword, ...signupData } = formData;
      signupData.passoutYear = parseInt(signupData.passoutYear, 10);
      await signup(signupData);
      setSuccessAlert(true);
      setTimeout(() => navigate(from, { replace: true }), 2000);
    } catch (error) {
      if (error?.inner) {
        const nextErrors = {};
        error.inner.forEach((item) => { nextErrors[item.path] = item.message; });
        setErrors(nextErrors);
      } else {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {successAlert && (
        <Alert variant="success" className="mb-5">
          <AlertTitle>Account created</AlertTitle>
          <AlertDescription>Taking you to your dashboard</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div className="space-y-2" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                className="h-11 rounded-lg border-border bg-background/80 px-3 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-2"
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInputChange}
                required
              />
              {errors[field.name] && <p className="text-sm text-destructive">{errors[field.name]}</p>}
            </div>
          ))}
          <div className="relative space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input className="h-11 rounded-lg border-border bg-background/80 px-3 pr-11 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-2" id="signup-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="At least 6 characters" value={formData.password} onChange={handleInputChange} required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-1 top-[29px] inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>
          <div className="relative space-y-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input className="h-11 rounded-lg border-border bg-background/80 px-3 pr-11 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-2" id="confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Enter your password again" value={formData.confirmPassword} onChange={handleInputChange} required />
            <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} className="absolute right-1 top-[29px] inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>
        </div>
        {errors.general && <p className="text-sm text-destructive">{errors.general}</p>}
        <Button type="submit" disabled={loading} className="h-12 w-full rounded-lg bg-primary text-primary-foreground shadow-none hover:bg-primary/90">
          {loading ? <BeatLoader size={8} color="currentColor" /> : 'Create account'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted-foreground">Already have an account? <Link to="/auth/login" state={location.state} className="font-medium text-primary underline-offset-4 hover:underline">Log in</Link></p>
    </>
  );
}

export default Signup;
