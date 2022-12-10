// email validation check
export const isEmail = (email) => {
  return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/.test(email);
};

// String validation check
export const isString = (data) => {
  return data.toLowerCase().match(/^([a-z@\.]{1,})$/);
};

// Mobile validation check
export const isMobile = (mobile) => {
  return /^(01|8801|\+8801)[0-9]{9}$/.test(mobile);
};

// Number validation check
export const isNumber = (data) => {
  return /^([0-9\*]{1,})$/.test(data);
};
