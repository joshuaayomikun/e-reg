const {
  statusCodeConstant: {
    controllers: {
      account: {
        methods: { 
          firstPageSignup, 
          emailNotExists, 
          usernameNotExists,
          verifyUserbyEmail
        },
      },
    },
  },
} = require("../utils/controllerResponseCode");
const {
  emailExists,
  usernameExists,
  genericReturn,
  userExists,
  createTempUser,
  updateTemUserEmailVerification,
} = require("../utils/function");

// first stage of temp signup
exports.firstPageSignup = async (req, res) => {
  try {
    const { emailAddress, name, username, phoneNumber } = req;

    const checkUser = await userExists({emailAddress, username, phoneNumber});
    return checkUser? genericReturn({
      successResponse: firstPageSignup.statusCodes.ok,
      failedResponse: firstPageSignup.statusCodes.userExists,
      Parameter: checkUser,
      res
    }): genericReturn({
      successResponse: firstPageSignup.statusCodes.ok,
      failedResponse: firstPageSignup.statusCodes.canNotCreate,
      Parameter: await createTempUser({name, emailAddress, username, phoneNumber}),
      res
    })
  } catch (ex) {
    return res.status(400).json({
      error: decipherEx(ex),
    });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const checkEmail = await emailExists(email);
    return genericReturn({
      successResponse: emailNotExists.statusCodes.ok,
      failedResponse: emailNotExists.statusCodes.emailExists,
      Parameter: checkEmail,
      res,
    });
  } catch (ex) {
    return res.status(400).json({
      error: decipherEx(ex),
    });
  }
};

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const checkUsername = await usernameExists(username);
    return genericReturn({
      successResponse: usernameNotExists.statusCodes.ok,
      failedResponse: usernameNotExists.statusCodes.usernameExists,
      Parameter: checkUsername,
      res
    })
  } catch (ex) {
    return res.status(400).json({
      error: decipherEx(ex),
    });
  }
};

exports.verifyUserbyEmail = async(req, res) => {
  try{
    const {username} = req.params
    const {code} = req.body
    const user = updateTemUserEmailVerification({username, code})
    return genericReturn({
      successResponse: verifyUserbyEmail.statusCodes.ok,
      failedResponse: verifyUserbyEmail.statusCodes.cannotUpdate,
      Parameter: user,
      res
    })

  } catch(ex) {
    return res.status(400).json({
      error: decipherEx(ex),
    });
  }
}
