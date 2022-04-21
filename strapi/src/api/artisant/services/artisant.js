'use strict';

/**
 * artisant service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::artisant.artisant');
