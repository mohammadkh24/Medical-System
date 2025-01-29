module.exports = async (req,res,next) => {
    const isDoctor = req.user.role === "DOCTOR"

    if (isDoctor) {
        return next()
    };

    res.status(403).json({
        message : "This route accessible only for doctor",
    })
}