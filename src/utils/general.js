function isDateValid(dateString) {
    const date = new Date(dateString);
    return !isNaN(date) ? date : null;
}

function getPaginationParams(params, defaultLimit = 20) {
    const limit = params.limit || defaultLimit;
    return {
        limit,
        offset: params.page ? (params.page - 1) * limit : 0,
        page: params.page || 1
    }
}

module.exports = { isDateValid, getPaginationParams }
