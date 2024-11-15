import User from "../models/usersModel.js"

const getCurrentUser = async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.status(200).json(user)
}

export { getCurrentUser }