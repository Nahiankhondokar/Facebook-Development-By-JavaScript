

// create error function
const createError = (status, msg) => {

    const err = new Error();
    err.status = status;
    err.message = msg;
    return err;

}


// export 
export default createError;