import asyncHandler from '../middlewares/asyncHandler.js'
import User from '../models/userModel.js'

const getAllUsers = asyncHandler(async(req,res)=>{
    try {
		const userId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})

export {getAllUsers}