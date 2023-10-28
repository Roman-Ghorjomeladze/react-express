const { Op } = require('sequelize')

const { isDateValid } = require("../general");


const buildTopPayingWhereClause = (params) => {
    let whereClaus = { paid: true };
    for (let key in params) {
        switch (key) {
            case 'start': {
                const date = isDateValid(params[key]);
                if (date) {
                    const filter = whereClaus.paymentDate
                        ? { ...whereClaus.paymentDate, [Op.gt]: date }
                        : { paymentDate: { [Op.gt]: date } }
                    whereClaus = { ...whereClaus, ...filter };
                }
                break;
            }
            case 'end': {
                const date = isDateValid(params[key]);
                if (date) {
                    const filter = whereClaus.paymentDate
                        ? { ...whereClaus.paymentDate, [Op.lt]: date }
                        : { paymentDate: { [Op.lt]: date } }
                    whereClaus = { ...whereClaus, ...filter };
                }
                break;
            }
        }
    }
    return whereClaus
}

module.exports = { buildTopPayingWhereClause }