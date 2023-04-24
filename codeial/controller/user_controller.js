const { response } = require('express');
const User = require('../model/user');

//require for delete avatar from database
const fs = require('fs');
const path = require('path');
// end

module.exports.profile = function (req, res) {

    console.log("trying to call profile")
    User.findById(req.params.id,function(err, user) {
        
        return res.render('user.ejs',{
            title :'User Profile',
            profile_user: user
            });
    });
}

module.exports.userIn = function (req, res) {
    if(req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    console.log('userIn');

    return res.render('user_sign_in.ejs', {
        title: 'sign in'
    });

}

module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up.ejs', {
        title: 'sign up'
    });
}
// module.exports.create = async function (req, res) {
//     if (req.param.password != req.param.confirm_password) {
//       return res.redirect("/users/signin");
//     }
//     let user = await User.findOne({ email: req.param.email });
//     if (!user) {
//       await User.create(req.body);
//       return res.redirect("/users/signin");
//     }
//     return res.redirect("back");
//   };
module.exports.create = function (req, res) {
   // console.log(req.body.name);

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ emails: req.body.email }, function (err, users) {
        //console.log(emails);
        if (err) { console.log("error while finding user sign up"); return }
        //console.log(user.body.email);
        if (!users) {
            User.create(req.body, function (err, users) {
                if (err) { console.log("error while creating user sign up"); return }
                return res.redirect('/users/signin');
            })
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function (req, res) {
    console.log('createSession');
    req.flash('success','logged in successfully');
    return res.redirect('/');

    // User.findOne({ email: req.body.email }, function (err, user) {
    //     if (err) { console.log("Errer while finding user to sign in"); return }
    //     if (user) {
    //         //if password not matched
    //         if (user.password != req.body.password) {
    //             console.log("User not found");
    //             return res.redirect('back');
    //         }
    //         //session
    //         res.cookie('user_id', user.id)
    //         return res.redirect('/users/profile');
    //     } else {
    //         //if user not foun
    //         console.log('user not found');
    //         return res.redirect('back');
    //     }


    // })
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error logging out: ', err);
            return next(err);
        }
        console.log('calling destroySession');
        req.flash('success','You have logged out');
        return res.redirect('/users/signin');
    });
}

module.exports.update=async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(404).send('User is not authorized')
    // }

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){    //uploadedAvatar came from user model
                if(err){
                    console.log('*** multer error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){

                        fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }else{
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    // this will save the path of uploaded file into avatar filed in user
                   // user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','unuthorized');
        return res.status(404).send('User is not authorized')
    }
}

// module.exports.signout = function(req,res) {
//     console.log("signout")
//     res.cookie('user_id',null);
//     return res.redirect('/users/signin');
// }