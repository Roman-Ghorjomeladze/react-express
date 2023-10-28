const {Op} = require('sequelize')

const { formatResponse, formatError } = require("../../utils/response")
const { Contract } = require('../../model');
const { CONTRACT_STATUSES } = require('../../utils/constants/contract');

async function getContract(req, res) {
    try {
        const contract = await Contract.findOne({
            where: {
                [Op.or]: {
                    ContractorId: req.profile.id, 
                    ClientId: req.profile.id, 
                },
                id: req.params.id
            }
        })
        if (!contract) return res.status(404).json(formatError('Contract not found'))
        return res.json(formatResponse(contract))
    } catch (error) {
        res.status(500).json(formatError('Something went wrong'))
    }
}

async function getContracts(req, res) {
    try {
        const contracts = await Contract.findAll({
            where: {
                [Op.or]: {
                    ContractorId: req.profile.id, 
                    ClientId: req.profile.id, 
                },
                status: {[Op.not]: CONTRACT_STATUSES.TERMINATED}
            }
        });
        return res.json(formatResponse(contracts))
    } catch (error) {
        res.status(500).json(formatError('Something went wrong'))
    }
}

module.exports = {
    getContract,
    getContracts
}