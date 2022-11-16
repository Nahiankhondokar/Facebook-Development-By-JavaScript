import JWT from 'jsonwebtoken';

// create JWT token
export const createToken = (payload, exp) => {
    // create token
    const token = JWT.sign(payload, process.env.JWT_SECRET, {expiresIn : exp});
    return token;
}