'use strict';

/**
 * artisan service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::artisan.artisan');
