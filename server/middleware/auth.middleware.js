const admin = require('../config/firebase');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email.split('@')[0]
      });
    } else {
      user.lastLogin = Date.now();
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { authenticate };
