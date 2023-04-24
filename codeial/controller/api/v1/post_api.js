const Post = require('../../../model/post');
const Comment = require('../../../model/comments');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path : 'user'
        }
    });
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    console.log("post delete called1"); 
    try {
        let post = await Post.findById(req.params.id)

    // convert obeject _id to string with .id
    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({post:req.params.id})

        return res.json(200,{
            message: 'Comment deleted successfully'
        });
        
    }else{
       // req.flash('success','you can not delete this post');

        return res.json(401,{
            message: 'not autherized to delete this post'
        })
    }
    } catch (err) {
        //req.flash('success','Post not deleted');

        return res.json(500,{
            message:'internal server error'
        })
    }
}