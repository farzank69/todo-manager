const User = require('../models/User');

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { displayName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { displayName },
      { new: true, runValidators: true }
    ).select('-__v');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

module.exports = {
  getCurrentUser,
  updateProfile
};
