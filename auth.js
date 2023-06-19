
function authenticateUser(req, res, next){
    const excludedRoutes = ['/oJs5Mr1uPxFXVbP2TzWS5SahD', '/login','/scripts/send_login_info.js', '/register', '/scripts/register/send_new_user.js', '/new_user']

    if(excludedRoutes.includes(req.path) && !(req.session.user === undefined)){
        res.redirect('/home')
        return
    }

    if(excludedRoutes.includes(req.path)){
      next()
    }else{
      if (req.session.user === undefined) {
      
          res.redirect('/login');
        } else {
          next()
        }
    }
}
  
module.exports = {
    authenticateUser
};
  
