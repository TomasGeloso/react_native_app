import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    email: yup
    .string()
    .required('Email is required')
    .email('Email is invalid'),
    password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
});

export const registerValidationSchema = yup.object().shape({
    email: yup
    .string()
    .required('Email is required')
    .email('Email is invalid'),
    password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters'),
    username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
});


