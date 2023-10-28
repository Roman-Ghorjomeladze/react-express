const { formatResponse, formatError } = require("../../utils/response")
const { Profile } = require('../../model');



async function getUsers(req, res) {
  try {
    const users = await Profile.findAll({attributes: ['firstName', 'lastName', 'id', 'type', 'profession', 'balance']});
    return res.json(formatResponse(users));
  } catch (error) {
    return res.status(500).json(formatError('Something went wrong'))
  }
}

async function me(req, res) {
  try {
    return res.json(formatResponse(req.profile));
  } catch (error) {
    return res.status(500).json(formatError('Something went wrong'))
  }
}

module.exports = {
  me,
  getUsers
}