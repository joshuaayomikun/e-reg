
exports.responseData = ({
    status = 200,
    state = 1,
    data = {},
    msg = "Success",
    res
} = {}) => {
    return res.status(status).json({
        state,
        data,
        msg
    });
}