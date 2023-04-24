const mongoose = require('mongoose');

const multer = require('multer'); // use for file upload
const path = require('path');
const AVATAR_PATH = path.join('/upload/users/avatar');

const  userschema = new mongoose.Schema({

    email :{
        type: 'string',
        required: true,
        unique : true
    },
    password :{
        type: 'string',
        required: true,
    },
    name :{
        type: 'string',
        required: true,
    },
    avatar :{
        type: 'string'
    },
},
   { timestamps : true
});

//set function for multer to store file in local storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()) // ex : 'avatar-1681416495189'
    }
  })
//static function
userschema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); //uploadAvatar is function name
userschema.statics.avatarPath = AVATAR_PATH;  //to make avatatpath publicly accessible
// multer function end

const User = mongoose.model('User',userschema)
module.exports=User;