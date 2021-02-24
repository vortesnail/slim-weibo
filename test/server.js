/**
 * @description jest server
 * @author vortesnail
 */

const request = require('supertest');
const server = require('../src/app').callback()

module.exports = request(server)
