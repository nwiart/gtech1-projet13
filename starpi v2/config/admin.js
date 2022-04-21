module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dc125c3f0bba8dfb0c0c7ebed24cb77f'),
  },
});
