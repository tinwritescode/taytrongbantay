// Register with facebook

import connectDB from '../../../middleware/mongodb';
import User from '../../../models/UserModel';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { setCookie } from '../../../utils/cookies'

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let { token } = req.body;
  
    if(!token) {
      res.status(403).json('Unauthorized');
      return;
    }

    var result = await axios.get(`https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cemail%2Cgender&access_token=${token}`);

    let { gender, name, id, email } = result.data;

    if(id.length < 5) throw "Unauthorized";

    const existUser = await User.findOne({ facebookId: id }).lean();
    console.log(existUser)

    // Login
    if(existUser) {
      // Chuyển sang đăng nhập
      const access_token = jwt.sign({ id: existUser._id, username: existUser.username }, process.env.JWT_SECRET);

      setCookie(res, 'access_token', access_token);

      console.log(`[LOGIN] Người dùng ${existUser.username} đã đăng nhập`);
      
      var result = {status: 'ok', access_token, user: existUser};

      delete result.existUser.password;
      
      res.status(200).json(result);

      return 
    }
    
    //  Register
    let username = name.replace(' ', '').toLowerCase() + getRndInteger(100, 999).toString();

    if (username && name && email && gender) {
        try {
          // Create new user
          var user = await User.create({
            name,
            username: username.toLowerCase(),
            email,
            facebookId: id,
            password: '0',
            gender,
            avatar: gender == 'male' ? 'https://i.imgur.com/b51E0eg.jpg' : 'https://i.imgur.com/StTiSj8.jpg'
          });

          const access_token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);

          setCookie(res, 'access_token', access_token);

          console.log(`[NEW USER] User ${name} đã được tạo (with facebook).`);
          
          var result = {status: 'ok', access_token, user};

          delete result.user.password;
          
          return res.status(200).json(result);

        } catch (error) {
          // Handle error when field duplicate

          console.log(error.message);
          return res.status(200).send(error);
        }
      } else {
        res.status(422).send({error: 'data_incomplete'});
      }
  } else {
    res.status(422).send({error: 'req_method_not_supported'});
  }
};

export default connectDB(handler);