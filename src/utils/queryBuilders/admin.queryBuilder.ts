import { Op } from 'sequelize';

import { isDateValid } from "../general";


export const buildTopPayingWhereClause = (params: {start?: string, end?: string}) => {
    let whereClaus: any = { ...params, paid: true }; //TODO Resolve Any type
    for (let key in params) {
        switch (key) {
            case 'start': {
                const date = isDateValid(params[key]);
                if (date) {
                    whereClaus[Op.gt] = date;
                }
                break;
            }
            case 'end': {
                const date = isDateValid(params[key]);
                if (date) {
                    if(date) {
                        whereClaus[Op.lt] = date;
                    }
                }
                break;
            }
        }
    }
    return whereClaus
}
