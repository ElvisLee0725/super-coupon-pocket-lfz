const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const ClientError = require('../../client-error');
require('dotenv/config');

// @route   POST /api/users
// @desc    Register users
// @access  Public
router.post(
  '/',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with minimum 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res, next) => {
    // Check if all input validation passed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ClientError(errors.array(), 400));
    }
    const { username, email, password } = req.body;

    try {
      // Check if email has been registered before
      const sqlCheckUserExist = `
            SELECT "u"."email" 
            FROM "users" AS "u"
            WHERE "u"."email" = $1;
        `;
      const {
        rows: [registeredEmail = null]
      } = await db.query(sqlCheckUserExist, [email]);
      if (registeredEmail) {
        return next(new ClientError('This email is registered already', 400));
      }

      // Get user gravatar
      const avatarUrl = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });

      // Hash the password before save to database
      const salt = bcrypt.genSaltSync(10);
      const hashedPW = bcrypt.hashSync(password, salt);

      const sqlInsertUser = `
            INSERT INTO "users" ("user_id", "name", "email", "password", "avatar_url", "created_at")
            VALUES (default, $1, $2, $3, $4, default)
            RETURNING "user_id";
        `;
      const {
        rows: [user = null]
      } = await db.query(sqlInsertUser, [username, email, hashedPW, avatarUrl]);

      // Use JWT to sign user_id to the token
      const payload = {
        user: {
          id: user.user_id
        }
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;

          res.send({ token });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
