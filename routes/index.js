
const express = require('express');
const router = express.Router();
/**
 * @swagger
 * definitions:
 *   user_schema:
 *      properties:
 *          email:
 *              type: string
 *              example: xyz@gmail.com
 *          password:
 *              type: string
 *              example: abc@123
 *   user:
 *      properties:
 *          user:
 *              $ref: '#/definitions/user_schema' 
 */
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *         200:
 *           description: Successfully created a user.
 *         405:
 *           description: Invalid Input
 */

 /**
 * @swagger
 * definitions:
 *   school_schema:
 *      properties:
 *          school_name:
 *              type: string
 *              example: Gurukul
 *          school_state:
 *              type: string
 *              example: Rajasthan
 *          school_city:
 *              type: string
 *              example: Pune
 *          school_cityarea:
 *              type: string
 *              example: Pal Road
 *          school_admission_status:
 *              type: string
 *              example: Open
 *          school_ranking:
 *              type: string
 *              example: #1
 * 
 *   schools:
 *      properties:
 *          schools:
 *              $ref: '#/definitions/school_schema' 
 */
/**
 * @swagger
 * /api/v1/schools:
 *   post:
 *     tags:
 *       - Schools
 *     description: Creates a new school
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: school
 *         description: school object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schools'
 *     responses:
 *         200:
 *           description: Successfully created a school.
 *         405:
 *           description: Invalid Input
 */
router.use('/api', require('./api'));

module.exports = router;