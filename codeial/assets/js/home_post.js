{
//submit data of new post using ajax
let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url : '/posts/create',
            data : newPostForm.serialize(), //this convert data into json
            success: function(data){
                let newPost =  newPostDom(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost)); //space require before .delete-post-button
                console.log(data);
            },error: function(error){
                console.log(error.responseText);
            }

        })
    })

}
//method to create post in dom

let newPostDom = function(post){
    return $(` <li id="post-${post._id}">
    <p>
        
            <small class="post-delete-button">
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
            </small>         

            ${post.content}
            ${post.user.name}
    </p>

    <div class="post-comment">
        
            <form action="/comment/create" method="POST">

                <input type="text" name="content" placeholder="Enter comment here" required />
                <input type="hidden" name="post" value="${post._id }">
                <input type="submit" value="Add comment" />

            </form>
          
                <div class="post-comment-list">
                    <ul class="post-comment-${ post._id }">
                    </ul>

                </div>
    </div>

</li>
`)
}

//method to delete a post from DOM
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
       console.log("calling from deletepost AJAX")
        e.preventDefault();

        $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                //console.log(data) 
               //$(`#post-6416ae677d8b5616e802cca1`).remove();

               $(`#post-${data.data.post_id}`).remove();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

createPost();
deletePost('.delete-post-button');

console.log('Hello world')
}