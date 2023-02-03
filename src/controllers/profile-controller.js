// authenticated only !!!

exports.getMyInfo = async (req, res, next) => {
    res.status(200).json({ user: req.user });
};