const { check,validationResult } = require('express-validator');

exports.validateAddProduct = [
    check('title')
    .notEmpty()
    .withMessage('title is required'),

    check('quantity')
    .notEmpty()
    .withMessage('quantity is required'),

    check('price')
    .notEmpty()
    .withMessage('price is required'),
    
];


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}
