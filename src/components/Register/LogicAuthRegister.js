import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRegister = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validasi email dan password
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) => value.length >= 6;

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

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

  const isFormValid =
    name.trim() !== '' &&
    phone.trim() !== '' &&
    validateEmail(email) &&
    validatePassword(password) &&
    captchaVerified;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi ulang saat submit
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError('Format email tidak valid');
    if (!validPassword) setPasswordError('Password minimal 6 karakter');
    if (!name.trim()) alert('Nama harus diisi');
    if (!phone.trim()) alert('Nomor telepon harus diisi');
    if (!captchaVerified) alert('Captcha harus diverifikasi');

    if (name && phone && validEmail && validPassword && captchaVerified) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            role: 'user',         // default role untuk register biasa
            adminSecretKey: '',   // kosong untuk register user biasa
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registrasi berhasil!');
          navigate('/'); // Atau halaman login langsung
        } else {
          alert(`Gagal: ${data.message || 'Terjadi kesalahan'}`);
        }
      } catch (error) {
        alert('Terjadi kesalahan koneksi ke server');
        console.error('Register error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return {
    name,
    email,
    emailError,
    password,
    passwordError,
    captchaVerified,
    isSubmitting,
    showPassword,
    isFormValid,
    handleNameChange,
    handlePhoneChange,
    handleEmailChange,
    handlePasswordChange,
    onChange,
    togglePassword,
    handleSubmit,
    handleBackClick,
  };
};

export default useAuthRegister;
