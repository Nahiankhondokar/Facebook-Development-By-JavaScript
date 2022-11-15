import createError from "../controllers/errorController.js";
import jwt from 'jsonwebtoken';

// craete user middleware
export const userMiddleware = (req, res, next) => {


    try {

        // get token
      const token = req.cookies.access_token;

      // use login check
      if( !token ){
        return next(createError(401, "you are not authenticated"));
      }

      // token verify
      const token_verify = jwt.verify(token, process.env.JWT_SECRET);
      if( !token_verify ){
        return next(createError(401, "Invalid token"));
      }

      // matching specfic user id
      if(token_verify.id != req.params.id){
        return next(createError(401, "You can not access this user data"));
      }

      // if user login 
      if( token_verify ){
        res.user = token_verify;
        next();
      }

    
        
    } catch (error) {
         next(error);
    }

}