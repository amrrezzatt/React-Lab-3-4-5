import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    return !/\s/.test(username); // no spaces
  };

  const validatePassword = (password) => {
    //  least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Invalid email format';
        }
        break;

      case 'name':
        if (!value) {
          error = 'Name is required';
        }
        break;

      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if (!validateUsername(value)) {
          error = 'Username cannot contain spaces';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (!validatePassword(value)) {
          error = 'Password must be at least 8 characters with uppercase, lowercase, digit, and special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Confirm password is required';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched({
      email: true,
      name: true,
      username: true,
      password: true,
      confirmPassword: true
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
      navigate('/');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Register</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <small className="text-muted">Example: P@ssword1234</small>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
