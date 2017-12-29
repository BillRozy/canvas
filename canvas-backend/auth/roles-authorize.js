const _ = require('lodash');
module.exports = function(...authorizedRoles) {
  return function(req, res, next) {
    if (!_.intersection(req.user.roles.map(role => role.title), authorizedRoles).length) {
      res.status(403);
      res.send('Not permitted');
      return;
    }
    next();
  };
};
