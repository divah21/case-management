import { useState, ChangeEvent, FormEvent } from 'react';
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
import axios from 'axios';  
import { toast } from 'react-toastify'; 

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
    
      const response = await axios.post("https://case-management-strapi.onrender.com/api/auth/local", {
        data: {
        identifier: user.email,  
        password: user.password,
        }
      });
  
      const { jwt } = response.data;
      localStorage.setItem('token', jwt); 
  
      toast.success('Login successful!');
      setIsLoading(false);
  
      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      console.error('Login failed:', error);
    }
  };
  

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600} sx={{ paddingBottom: 2 }}>
        Welcome!
      </Typography>
      <Divider sx={{ my: 3 }}> Your credentials</Divider>
      <Stack onSubmit={handleSubmit} component="form" direction="column" gap={2}>
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
        <Button type="submit" variant="contained" size="medium" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Submit'}
        </Button>
        <Typography
          my={3}
          color="text.secondary"
          variant="body2"
          align="center"
          letterSpacing={0.5}
        >
          Don't have an account? <Link href="/signup">{'Signup'}</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Login;
