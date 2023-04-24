const Comment = require('../model/comments');
const Post = require('../model/post');

module.exports.create = async function (req, res) {
    // console.log("Message from comment: " + req.body.content);
    // console.log("Message from comment: " + req.body.post);

    // console.log("Message from comment: " + req.user._id);

    try {
        let post = await Post.findById(req.body.post) //post is from home page

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            });
            post.comments.push(comment);
            post.save();
            req.flash('success','comment added')
            return res.redirect('back')
        }

    } catch (err) {
        req.flash('error',err)
        return res.redirect('back')
    }
}

module.exports.destroy =async function (req, res) {
   try {
    let comment = await Comment.findById(req.params.id)

    if (comment.user == req.user.id) {
        // Need to delete from post as well hence taking to variable before delete comment
        let postId = comment.post
        comment.remove();
        //will delelte comment from post as well
       let post =await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } })
       req.flash('success','comment deleted successfully')
       return res.redirect('back')
    } else {
        req.flash('error',err)
        return res.redirect('back')
    }

   } catch (err) {
    console.log('Error',err)
   }
}