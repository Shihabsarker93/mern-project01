// to create  a manual error ie user can put a shorter password >auth.route.js


export const errorHandler =(statusCode, message) =>{

    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;

};

