'use strict';

/**
 *  artisan controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::artisan.artisan');
