'use strict';

/**
 * produit service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::produit.produit');
