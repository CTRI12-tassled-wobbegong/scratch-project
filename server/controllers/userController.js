const db = require('../models/dbModel');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  const query = `
  SELECT * FROM public.user
  `;

  db.query(query)
    .then((data) => {
      res.locals = data.rows;
      return next();
    })
    .catch((e) =>
      next({
        log: 'userController.getAllUsers: ERROR: ' + e,
        message: 'userController.getAllUsers: ERROR: Database query issue',
      })
    );
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  const query = `
  INSERT INTO public.user (username, password, name, email)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  const values = ['user2', 'test2', 'cat2', 'cat2@gmail.com'];
  db.query(query, values)
    .then((data) => {
      res.locals = data.rows[0];
      return next();
    })
    .catch((e) =>
      next({
        log: 'userController.getAllUsers: ERROR: ' + e,
        message: 'userController.getAllUsers: ERROR: Database query issue',
      })
    );
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */

module.exports = userController;
