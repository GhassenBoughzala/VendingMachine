'use strict';

const Model = require('../models/Products');

module.exports.create = async (p) => {
    if (!p)
        throw new Error('Missing User');
        await Model.create(p);
};

module.exports.getById = async (id) => {
    const p = await Model.findById(id);
    return p;
};