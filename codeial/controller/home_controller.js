const Post = require('../model/post')
const User = require('../model/user');


module.exports.home=async function(req,res){

    //To fetch post and user information and post , comment of post and who comments it
  try {
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path : 'user'
        }
    });
    let users = await User.find({});

    return res.render('home.ejs',{
        title : 'Codeial | Home',
        posts : posts,
        all_users : users
    });
  } catch (err) {
    console.error("Error",err);
    return
  }
    }

//to fetch post from post 
    // Post.find({},function(err,posts){
    //     console.log(posts)
    //     return res.render('home.ejs',{
    //         title : 'Codeial | Home',
    //         posts : posts
    //     });
    // })

// module.exports.profile=function(req,res){

//     return res.end('<h1>Profile</h1>');
// } 