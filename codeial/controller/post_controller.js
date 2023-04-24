const Post = require('../model/post')
const Comment = require('../model/comments')

module.exports.create = async function(req, res) {
    //console.log(req.body);
    try {
        var post =  await Post.create({
            content:req.body.content,
            user:req.user._id,
    
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post
                },
                message : "post created successfully"
            })
        }

        req.flash('success','Post created successfully');
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');

    }
         
}


// User.create(req.body, function (err, users) {
//     if (err) { console.log("error while creating user sign up"); return }
//     return res.redirect('/users/signin');
// })

module.exports.destroy = async function (req, res) {
    console.log("post delete called1"); 
    try {
        let post = await Post.findById(req.params.id)

    // convert obeject _id to string with .id
    if(post.user == req.user.id){
        post.remove();
        console.log("post delete called2"); 

        await Comment.deleteMany({post:req.params.id})

        if(req.xhr){
            
            return res.status(200).json({
                data: {
                    post_id:req.params.id   // data send to ajax of destriy controler to remove post content from client side
                },
                message:"post deleted"
            })
        }

        req.flash('success','Post deleted successfully');  //noty js

        return res.redirect('back');
        
    }else{
        req.flash('success','you can not delete this post');

        return res.redirect('back');
    }
    } catch (err) {
        req.flash('success','Post not deleted');

        return res.redirect('back');
    }
}