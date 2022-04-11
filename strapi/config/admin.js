module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '40ec513996ec4f77317f2eba9b98ef06'),
  },
});
