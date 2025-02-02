const isStrongPassword = password => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return (
    password.length >= minLength && hasUppercase && hasLowercase && hasDigit
  );
};

export const validateSigninForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const validateSignupForm = (firstName, lastName, email, password) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  } else if (!isStrongPassword(password)) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit';
  }

  return errors;
};
