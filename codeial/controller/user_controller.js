const User = require('../model/user');

module.exports.profile = function (req, res) {

    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user.ejs', {
                    title: 'Users profile',
                    user: user
                });
            }
            return res.redirect('/users/signin');
        })
    } else {
            return res.redirect('/users/signin');
    }

    // console.log('User control 123');

    // return res.render('user.ejs',{
    //     title :'User control1'
    // });
}

module.exports.signout=function(req,res) {
    console.log("signout")
    res.cookie('user_id',null);
    return res.redirect('/users/signin');
}

module.exports.userIn = function (req, res) {

    console.log('userIn');

    return res.render('user_sign_in.ejs', {
        title: 'sign in'
    });

}

module.exports.signUp = function (req, res) {
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
    console.log(req.body.name);

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
    // for sign in page
    //step to authenticate
    //find the user

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("Errer while finding user to sign in"); return }
        if (user) {
            //if password not matched
            if (user.password != req.body.password) {
                console.log("User not found");
                return res.redirect('back');
            }
            //session
            res.cookie('user_id', user.id)
            return res.redirect('/users/profile');

        } else {
            //if user not foun
            console.log('user not found');
            return res.redirect('back');
        }


    })



}