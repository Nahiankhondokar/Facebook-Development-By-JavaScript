

// email validation check
export const isEmail = (email) => {
    return email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/);
}