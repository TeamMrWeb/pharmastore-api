module.exports = ({ 
    res, 
    code = 200,
    message,
    body,
    options
}) => {
    res.status(code).json({
        code,
        message,
        body,
        options
    });
}