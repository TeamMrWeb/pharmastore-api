module.exports = ({ 
    res, 
    code = 200,
    message,
    body,
    options
}) => {
    console.log('bien')
    res.status(code).json({
        code,
        message,
        body,
        options
    });
}