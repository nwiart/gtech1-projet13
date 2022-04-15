'use strict';

/**
 * artisan router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::artisan.artisan');
