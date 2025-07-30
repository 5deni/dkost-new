import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) => value.length >= 6;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : 'Format email tidak valid');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? '' : 'Password minimal 6 karakter');
  };

  const onChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isFormValid = validateEmail(email) && validatePassword(password) && captchaVerified;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError('Format email tidak valid');
    if (!validPassword) setPasswordError('Password minimal 6 karakter');

    if (validEmail && validPassword && captchaVerified) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        console.log('Response status:', response.status);
        console.log('Response data:', data);

        if (response.ok) {
          alert('Login berhasil');

          const token = data.token || data.data?.token;
          const user = data.user || data.data?.user;

          if (!token || !user) {
            console.error('Invalid response structure:', data);
            alert('Login gagal: Response tidak valid dari server');
            return;
          }

          localStorage.setItem('token', token);
          console.log('Login user:', user);

          if (user.role === 'admin') {
            navigate('/PageDashboardAdmin');
          } else if (user.role === 'user') {
            navigate('/PageDashboardUser');
          } else {
            alert('Role tidak dikenal: ' + user.role);
          }
        } else {
          const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
          console.error('Login failed:', errorMessage, data);
          alert('Login gagal: ' + errorMessage);
        }
      } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
        console.error('Login error:', error);
      }
    }
  };

  return {
    email,
    emailError,
    password,
    passwordError,
    captchaVerified,
    handleEmailChange,
    handlePasswordChange,
    onChange,
    handleSubmit,
    isFormValid,
    showPassword,
    togglePassword,
  };
};

export default useAuthForm;