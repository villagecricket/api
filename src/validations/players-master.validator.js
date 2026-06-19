const { body } = require('express-validator');

exports.createPlayerValidator = [
    body('Name')
        .notEmpty().withMessage('Player name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('Mobile')
        .notEmpty().withMessage('Mobile number is required')
        .isMobilePhone().withMessage('Invalid mobile number'),

    body('FatherName')
        .notEmpty().withMessage('Father name is required'),

    body('Email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('DOB')
        .notEmpty().withMessage('Date of birth is required')
        .isISO8601().withMessage('Invalid date of birth'),

    body('Address')
        .notEmpty().withMessage('Address is required'),

    body('Role')
        .notEmpty().withMessage('Role is required')
        .isLength({ min: 2 }).withMessage('Role must be at least 2 characters'),

    body('BattingStyle')
        .notEmpty().withMessage('Batting style is required'),

    body('BowlingStyle')
        .notEmpty().withMessage('Bowling style is required'),

    body('BattingPosition')
        .notEmpty().withMessage('Batting position is required'),

    body('JerseySize')
        .notEmpty().withMessage('Jersey size is required'),

    body('EmergencyContact')
        .notEmpty().withMessage('Emergency contact is required')
        .isMobilePhone().withMessage('Invalid emergency contact'),

    // body('PhotoURL')
    //     .optional()
    //     .isURL().withMessage('Photo must be a valid URL'),

    body('Status')
        .optional()
        .isIn(['Active', 'inactive']).withMessage('Status must be active or inactive'),
];

exports.auctionPlayerValidator = [
    body('SessionID')
        .notEmpty().withMessage('Auction session is required'),

    body('Name')
        .notEmpty().withMessage('Player name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('FatherName')
        .notEmpty().withMessage('Father name is required'),

    body('Mobile')
        .notEmpty().withMessage('Mobile number is required')
        .isMobilePhone().withMessage('Invalid mobile number'),

    body('Role')
        .notEmpty().withMessage('Role is required'),

    body('BasePrice')
        .optional()
        .isNumeric().withMessage('Base price must be a number'),
];
