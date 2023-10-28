const {Op, Sequelize} = require('sequelize')

const { formatResponse, formatError } = require("../../utils/response")
const { Contract, Profile, Job, sequelize } = require('../../model');
const { CONTRACT_STATUSES, PROFILE_TYPES } = require('../../utils/constants/contract');

async function deposit(req, res) {
    if(req.profile.type !== PROFILE_TYPES.CLIENT) {
        return res.status(403).json(formatError('Operation not allowed'))
    }
    const depositAmount = req.body.depositAmount;

    //I'm assuming that client should deposit to contractor's account and any different option is forbidden
    const transaction = await sequelize.transaction();
    try {
        if (req.profile.balance < depositAmount) {
            await transaction.rollback();
            return res.status(400).json(formatError("You don't have enough money on balance to deposit such amount"))
        }
        const contractor = await Profile.findOne({
            where: {id: req.params.id},
        })
        if (!contractor || contractor.type !== PROFILE_TYPES.CONTRACTOR) {
            await transaction.rollback();
            return res.status(403).json(formatError('Operation not allowed'));
        }

        const contract = Contract.findOne({
            where: {
                ClientId: req.profile.id, 
                ContractorId: contractor.id
            }
        });
        
        if (!contract) {
            await transaction.rollback();
            return res.status(403).json(formatError(`You don't have common contract with the candidate`));
        }
        
        const myContracts = await Contract.findAll({
            attributes: [[Sequelize.literal("SUM(Jobs.price)"), 'totalAmount']],
            where: {ClientId: req.profile.id},
            include: [
                {
                    model: Job,
                    where: {
                        paid: false
                    },
                    attributes: []
                }
            ]
        })
        
        if (myContracts.length === 0 || !myContracts[0].dataValues.totalAmount) {
            await transaction.rollback();
            return res.status(403).json(formatError(`You can't deposit, untill you have no jobs to pay`));
        }
        const isDepositMoreThan25PrcentOfJobsToPay = (myContracts[0].dataValues.totalAmount * 25 / 100) < depositAmount;
        if( isDepositMoreThan25PrcentOfJobsToPay ) {
            await transaction.rollback();
            return res.status(403).json(formatError(`The amount of deposit shouldn't be more that 25 % of current unpaied jobs.`));
        }

        // In this endpoint I assumed that client is depositing money to contractors account.
        const contractorsNewBalance = Number((contractor.balance + depositAmount).toFixed(2));
        const clientsNewBalance = Number((req.profile.balance - depositAmount).toFixed(2));
        Profile.update({balance: contractorsNewBalance}, {where: {id: contractor.id}});
        Profile.update({balance: clientsNewBalance}, {where: {id: req.profile.id}});
        await transaction.commit();
        return res.json(formatResponse({...req.profile.dataValues, balance: clientsNewBalance}))
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json(formatError('Something went wrong', error));
    }
}


module.exports = {
    deposit,
}