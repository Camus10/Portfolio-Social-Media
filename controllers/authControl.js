const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authControl = {
  
  /*
    list authentication
    - register
    - login
    - logout
    # create access token
    # create refresh token
  */

  register: async(req, res) => {
    try{
      const { fullname, username, email, password, gender } = req.body;
      
      let newUserName = username.toLowerCase().replace(/ /g, ''); // all letters converted to be lower
      const userName = await Users.findOne({
        username: newUserName
      });
      if(userName) return res.status(400).json({  // error handling for user as unique
        msg: 'This user name already exists.'
      });

      const userEmail = await Users.findOne({
        email
      });
      if(userEmail) return res.status(400).json({ // error handling for email as unique
        msg: 'This email already exists.'
      });
      
      if(password.length < 6){
        return res.status(400).json({ // prevent less of characters
          msg: 'Password must be at least 6 characters.'
        });
      }
      const passwordHash = await bcrypt.hash(password, 12); // convert the original one to be hashed information
      
      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender
      });

      // access token or refresh token got on the id user
      const accessToken = createAccessToken({
        id: newUser._id
      });
      const refreshToken = createRefreshToken({
        id: newUser._id
      });

      // stored to window basically
      res.cookie('refreshTokenRaosphi', refreshToken, {
        httpOnly: true,
        path: '/api/refreshToken',  // hidden checking
        maxAge: 30*7*24*60*60*1000 // 30 days for expire
      });

      await newUser.save();

      res.json({
        msg: 'Register Success!',
        accessToken,
        user: {
          ...newUser._doc,
          password: ''
        }
      });
    }catch(err){
      return res.status(300).json({
        msg: err.message
      });
    }
  },
  login: async(req, res) => {
    try{
      const { email, password } = req.body;
      const user = await Users.findOne({email})
        .populate('followers following', 'avatar username fullname followers following');

        if(!user) return res.status(400).json({ // error handling for existing user
          msg: 'This email does not exist.'
        });

        const isMatch = await bcrypt.compare(password, user.password);  // the original one's password compares hashed one's
        if(!isMatch) return res.status(400).json({
          msg: 'Password is incorrect.'
        });

        // access token or refresh token got on the id user
        const accessToken = createAccessToken({
          id: user._id
        });
        const refreshToken = createRefreshToken({
          id: user._id
        });
  
        // stored to window basically
        res.cookie('refreshTokenRaosphi', refreshToken, {
          httpOnly: true,
          path: '/api/refreshToken',
          maxAge: 30*7*24*60*60*1000 // 30 days for expire
        });

        res.json({
          msg: 'Login Success!',
          accessToken,
          user: {
            ...user._doc,
            password: ''
          }
        });
    }catch(err){
      return res.status(300).json({
        msg: err.message
      });
    }
  },
  logout: async(req, res) => {
    try{
      res.clearCookie('refreshTokenRaosphi', {  // destroy token
        path: '/api/refreshToken'
      });
      return res.json({
        msg: 'Logged out!'
      });
    }catch(err){
      return res.status(300).json({
        msg: err.message
      });
    }
  },
  generateAccessToken: async(req, res) => {
    try{
      const activeToken = req.cookie.refreshTokenRaosphi;
      if(!activeToken) return res.status(400).json({  // refresh token will have been provided by limited stored active token
        msg: 'Please login now.'
      });
      
      jwt.verify(activeToken, process.env.REFRESH_TOKEN_SECRET, async(err, result) => { // whether token on the place
        if(err) return res.status(400).json({
          msg: 'Please login now.'
        });

        const user = await Users.findById(result.id).select('-password')
          .populate('followers following', 'avatar username fullname followers following');
        if(!user) return res.status(400).json({
          msg: 'This does not exist.'
        });

        const accessToken = createAccessToken({
          id: result.id
        });
        res.json({
          accessToken,
          user
        });
      });
    }catch(err){
      return res.status(300).json({
        msg: err.message
      });
    }
  }
}

// jwt generates contained token secret payload 
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });
}
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  });
}


module.exports = authControl;