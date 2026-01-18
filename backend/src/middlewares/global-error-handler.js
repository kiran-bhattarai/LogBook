export const globalErrorHandler = (err, req, res, next) => {
    if(err.isOperational){
        return res.status(err.statusCode).json({message: err.message})
    }

    console.error(err)
    return res.status(500).json("Something went wrong")
}