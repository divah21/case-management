import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!user.email || !user.password) {
      setError('Both email and password are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      // API call to Strapi login
      const response = await axios.post('https://case-management-strapi.onrender.com/api/auth/local', {
        identifier: user.email,
        password: user.password,
      });

   
      const { jwt, user: loggedInUser } = response.data;

      localStorage.setItem('jwt', jwt);

      toast.success('Login successful:', loggedInUser);

      navigate('/dashboard');
    } catch (err) {
      toast.error("failed to login");
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600} sx={{ paddingBottom: 2 }}>
        Welcome!
      </Typography>

      <Divider sx={{ my: 3 }}>Your credentials</Divider>

      <Stack onSubmit={handleSubmit} component="form" direction="column" gap={2}>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          autoFocus
          required
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          autoFocus
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ opacity: user.password ? 1 : 0 }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <IconifyIcon icon={showPassword ? 'ion:eye' : 'ion:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack mt={-1.5} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" color="primary" />}
            label="Remember me"
          />
          <Link href="#!" fontSize="body2.fontSize" letterSpacing={0.5}>
            Forgot password?
          </Link>
        </Stack>
        <Button type="submit" variant="contained" size="medium" fullWidth>
          Submit
        </Button>
        <Typography my={3} color="text.secondary" variant="body2" align="center" letterSpacing={0.5}>
          Don't have an account? <Link >Contact Admin</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Login;
