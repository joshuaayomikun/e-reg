const { statusCodeConstant:{
    controllers:{
        profile:{
            methods:{
                getProfileByUserId,
                getAllProfiles
            }
        }
    }
} } = require("../utils/controllerResponseCode");
const { decipherEx, getProfileFromUserId, genericReturn, getAllUser } = require("../utils/function");

exports.getProfileByUserId = async(req, res) => {
    try {
        const{userId} = req.params
        const profile = getProfileFromUserId(userId)
        return genericReturn({
            successResponse: {...getProfileByUserId.statusCodes.ok, data: profile},
            failedResponse: getProfileByUserId.statusCodes.cannotGet,
            Parameter: profile,
            res
        })
    } catch (exs) {
        return res.status(400).json({
          error: decipherEx(ex),
        });
    }
}

exports.getAllProfiles = async(req, res) =>{
    try {
        const users = getAllUser()
        genericReturn({
            successResponse: getAllProfiles.statusCodes.ok,
            failedResponse: getAllProfiles.statusCodes.cannotGet,
            Parameter: users,
            res
        })
    } catch (ex) {
        return res.status(400).json({
            error: decipherEx(ex),
          });
    }
}