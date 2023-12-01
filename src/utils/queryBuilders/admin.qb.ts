import { Op } from 'sequelize';

import { isDateValid } from "../general";
import { ProfitablePositionQuery } from '../interfaces/http.types';


export const buildTopPayingWhereClause = (params: ProfitablePositionQuery) => {
    const whereClaus: any = { paid: true };
    for (const key in params) {
        switch (key) {
            case 'start': {
                const date = isDateValid(params.start);
                if (date) {
                    whereClaus[Op.gt] = date;
                }
                break;
            }
            case 'end': {
                const date = isDateValid(params.end);
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
