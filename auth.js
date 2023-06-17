
function authenticateUser(req, res, next){

    const excludedRoutes = ['/oJs5Mr1uPxFXVbP2TzWS5SahD', '/login']
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
  