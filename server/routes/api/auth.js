const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const ClientError = require('../../client-error');

// @route   GET api/auth
// @desc    Get user data (except password) according to the used_id got from auth middleware
// @access  Public
router.get('/', auth, async (req, res, next) => {
  try {
    // Get user data from db
    const sqlGetUser = `
            SELECT "u"."user_id",
                "u"."name",
                "u"."email",
                "u"."avatar_url"
            FROM "users" AS "u"
            WHERE "u"."user_id" = $1;
        `;
    const {
      rows: [user = null]
    } = await db.query(sqlGetUser, [req.user.id]);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res, next) => {
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ClientError(errors.array(), 400));
      //   return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists by the input email
      const sqlCheckUserExist = `
            SELECT "u"."user_id",
                   "u"."name",
                   "u"."email",
                   "u"."password",
                   "u"."avatar_url"
            FROM "users" AS "u"
            WHERE "u"."email" = $1;
        `;
      const {
        rows: [user = null]
      } = await db.query(sqlCheckUserExist, [email]);
      if (!user) {
        return next(new ClientError('Invalid Credentials', 404));
      }

      // Check if input password matches
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return next(new ClientError('Invalid Credentials', 404));
      }

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
