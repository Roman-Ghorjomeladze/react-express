
const getAdminProfile = async (req, res, next) => {
    // Here should be check if user is admin, for now we can keep it simple like getProfile middleware
    const {Profile} = req.app.get('models')
    const profile = await Profile.findOne({where: {id: req.get('profile_id') || 0}})
    if(!profile) return res.status(401).end()
    req.profile = profile
    next()
}

module.exports = {getAdminProfile}