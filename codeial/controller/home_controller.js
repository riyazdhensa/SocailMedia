module.exports.home=function(req,res){
    return res.render('home.ejs',{
        title : 'Home'
    });
}

// module.exports.profile=function(req,res){

//     return res.end('<h1>Profile</h1>');
// } 