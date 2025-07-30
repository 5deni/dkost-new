const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../../middleware/auth');
const {
  getTenants,
  getTenant,
  updateTenant,
  deleteTenant,
  getTenantBookings
} = require('../../controllers/admin/tenantController');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

router.route('/')
  .get(getTenants);

router.route('/:id')
  .get(getTenant)
  .put(updateTenant)
  .delete(deleteTenant);

router.route('/:id/bookings')
  .get(getTenantBookings);

module.exports = router;
