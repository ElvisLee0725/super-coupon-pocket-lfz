const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ClientError = require('../../client-error');
const db = require('../../database');
const { check, validationResult } = require('express-validator');

// @route   POST /api/coupons
// @desc    Create a new coupon with user_id as the login user
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('merchant', 'Merchant name is required').not().isEmpty(),
      check('discount', 'Discount description is required').not().isEmpty()
    ]
  ],
  async (req, res, next) => {
    // Check if merchant, discount are sent. Expire date is optional
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ClientError(errors.array(), 400));
    }

    const {
      merchant,
      discount,
      categoryId = 1,
      expirationDate = null
    } = req.body;

    const userId = req.user.id;

    try {
      // Check if categoryId is valid
      const sqlCheckCategory = `
        SELECT "ca"."category"
        FROM "categories" AS "ca"
        WHERE "ca"."category_id" = $1;
    `;
      const {
        rows: [cat = null]
      } = await db.query(sqlCheckCategory, [categoryId]);
      if (!cat) {
        return next(
          new ClientError([{ msg: 'The category cannot be found' }], 404)
        );
      }

      const sqlCreateCoupon = `
        INSERT INTO "coupons" ("coupon_id", "user_id", "merchant", "discount", "category_id", "expiration_date", "created_at", "used")
        VALUES (default, $1, $2, $3, $4, $5, default, default)
        RETURNING "coupon_id";
    `;

      const {
        rows: [couponId = null]
      } = await db.query(sqlCreateCoupon, [
        userId,
        merchant,
        discount,
        categoryId,
        expirationDate
      ]);
      res.json(couponId);
    } catch (err) {
      next(err);
    }
  }
);

// @route   GET /api/coupons
// @desc    Get all coupons which belongs to the current user
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const sqlGetAllCoupons = `
            SELECT "c"."coupon_id" AS "id",
                   "c"."merchant",
                   "c"."discount",
                   "c"."expiration_date",
                   "c"."created_at",
                   "ca"."category",
                   "c"."used"
            FROM "coupons" AS "c"
            JOIN "categories" AS "ca" USING ("category_id")
            WHERE "c"."user_id" = $1;
        `;
    const { rows: coupons = null } = await db.query(sqlGetAllCoupons, [
      req.user.id
    ]);
    res.json(coupons);
  } catch (err) {
    next(err);
  }
});

// @route GET /api/coupons/categories
// @desc  Get all category ids and names
// @Private
router.get('/categories', auth, async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM "categories";';
    const { rows: categories = null } = await db.query(sql);

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// @route GET /api/coupons/coupon/:id
// @desc Get a coupon by its id for edit
// @Private
router.get('/coupon/:id', auth, async (req, res, next) => {
  try {
    const sqlGetCouponById = `
                  SELECT "c"."merchant",
                         "c"."discount",
                         "c"."category_id",
                         "c"."expiration_date",
                         "c"."used"
                  FROM "coupons" AS "c"
                  WHERE "c"."coupon_id" = $1;`;
    const {
      rows: [coupon = null]
    } = await db.query(sqlGetCouponById, [req.params.id]);
    res.json(coupon);
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/coupons/:couponId
// @desc    Edit a coupon with its couponId
// @access  Private
router.put(
  '/:couponId',
  [
    auth,
    [
      check('merchant', 'Merchant is required').not().isEmpty(),
      check('discount', 'Discount description is required').not().isEmpty()
    ]
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ClientError(errors.array(), 400));
    }

    const {
      merchant,
      discount,
      categoryId = 1,
      expirationDate = null,
      used = false
    } = req.body;
    const couponId = req.params.couponId;

    try {
      // Check if categoryId is valid
      const sqlCheckCategory = `
      SELECT "ca"."category"
      FROM "categories" AS "ca"
      WHERE "ca"."category_id" = $1;
  `;
      const {
        rows: [cat = null]
      } = await db.query(sqlCheckCategory, [categoryId]);
      if (!cat) {
        return next(
          new ClientError([{ msg: 'The category cannot be found' }], 404)
        );
      }

      // Check current login user owns this coupon:
      const sqlCheckUser = `
            SELECT "c"."user_id"
            FROM "coupons" AS "c"
            WHERE "c"."coupon_id" = $1;
        `;
      const {
        rows: [couponUserId = null]
      } = await db.query(sqlCheckUser, [couponId]);

      // No user_id found, means the couponId is not valid
      if (!couponUserId) {
        return next(
          new ClientError(
            [{ msg: `Coupon with id: ${couponId} is not found.` }],
            404
          )
        );
      }

      // Check if the user_id of the coupon matches the login user
      if (couponUserId.user_id !== req.user.id) {
        return next(new ClientError([{ msg: 'Not authorized' }], 401));
      }

      // Start the coupon update
      const sqlEditCoupon = `
            UPDATE "coupons"
            SET "merchant" = $1,
                "discount" = $2,
                "category_id" = $3,
                "expiration_date" = $4,
                "used" = $5
            WHERE "coupon_id" = $6
            RETURNING *;
        `;
      const {
        rows: [coupon = null]
      } = await db.query(sqlEditCoupon, [
        merchant,
        discount,
        categoryId,
        expirationDate,
        used,
        couponId
      ]);

      res.json(coupon);
    } catch (err) {
      next(err);
    }
  }
);

// @route   DELETE /api/coupons/:couponId
// @desc    Delete a coupon with its couponId
// @access  Private
router.delete('/:couponId', auth, async (req, res, next) => {
  const { couponId } = req.params;

  if (isNaN(couponId) || couponId <= 0) {
    return next(new ClientError([{ msg: 'This coupon id is invalid' }], '400'));
  }

  try {
    // Check if the coupon id belongs to the login user
    const sqlCheckUser = `
        SELECT "c"."user_id"
        FROM "coupons" AS "c"
        WHERE "c"."coupon_id" = $1;
      `;
    const {
      rows: [user = null]
    } = await db.query(sqlCheckUser, [couponId]);

    // No user id found, the coupon id doesn't exist in the table
    if (!user) {
      return next(
        new ClientError(
          [{ msg: `This coupon id ${couponId} does not exist` }],
          404
        )
      );
    }

    // The coupon doesn't belong to current login user
    if (user.user_id !== req.user.id) {
      return next(new ClientError([{ msg: 'Not authorized' }], 401));
    }

    // Delete coupon
    const sqlDeleteCoupon = `
        DELETE FROM "coupons"
        WHERE "coupon_id" = $1
        RETURNING "coupon_id";
      `;
    const {
      rows: [deletedCoupon = null]
    } = await db.query(sqlDeleteCoupon, [couponId]);

    res.json(deletedCoupon);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
