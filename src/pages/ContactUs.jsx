import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9+\s()-]+$/, 'Invalid phone number')
    .min(10, 'Phone number is too short'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters')
});

export default function ContactUs() {
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    message: ''
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
    resetForm();
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Contact Us</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number (Optional)</label>
                <PhoneInput
                  country={'eg'}
                  value={values.phoneNumber}
                  onChange={(phone) => setFieldValue('phoneNumber', phone)}
                  inputClass={`form-control ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                  containerClass="w-100"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="text-danger small mt-1">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  id="message"
                  rows="5"
                  className={`form-control ${errors.message && touched.message ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="message" component="div" className="invalid-feedback" />
                <small className="text-muted">
                  {values.message.length}/500 characters
                </small>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
