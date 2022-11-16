import bcrypt from 'bcryptjs';

// has password macking
export const hasPassword  = (password) => {
    // salt generate 
    const salt = bcrypt.genSaltSync(12);

    // has pass
    const hasPass = bcrypt.hashSync(password, salt);

    return hasPass;
}



// password verify
export const passwordVerify = (password, hassPass) => {
    return bcrypt.compareSync(password, hassPass);
}