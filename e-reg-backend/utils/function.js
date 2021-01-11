const { default: axios } = require("axios");
const tempAccount = require("../models/tempAccount");
const user = require("../models/user");
const { responseData } = require("./apiResponse");
const {
  genericSuccessResponse,
  genericErrorResponse,
} = require("./controllerResponseCode");

exports.decipherEx = (ex) => {
  console.log(ex);
  switch (true) {
    case typeof ex === "undefined":
      return "An error occurred";
    case typeof ex.msg !== "undefined" || typeof ex.message !== "undefined":
      if (typeof ex.msg !== "undefined") return ex.msg;
      else if (typeof ex.message !== "undefined") return ex.message;
    default:
      return ex;
  }
};
exports.emailExists = async (Email) => {
  try {
    const emailExist = await user.find({ emailAddress: Email });
    return emailExist;
  } catch (ex) {
    return ex;
  }
};

exports.usernameExists = async (username) => {
  try {
    const usernameExist = await user.find({ username });
    return usernameExist;
  } catch (ex) {
    return ex;
  }
};

exports.userExists = async ({ username, emailAddress, phoneNumber }) => {
  try {
    const userExist = await user.find({
      $or: [{ phoneNumber }, { username }, { emailAddress }],
    });
    return userExist;
  } catch (ex) {
    return ex;
  }
};

exports.createTempUser = async ({
  name,
  username,
  emailAddress,
  phoneNumber,
}) => {
  try {
    let code = Math.floor(100000 + Math.random() * 900000);
    while (checkIfEmailDigitExists(code)) {
      code = Math.floor(100000 + Math.random() * 900000);
    }
    const emailConfirmation = {
      code,
      confirmed: false,
    };
    const tempUser = new tempAccount({
      name,
      username,
      emailAddress,
      phoneNumber,
      emailConfirmation,
    });

    await tempUser.save();


    var jsonData = {
      email: emailAddress,
      due: `Your code is ${code}`,
      task: "Welcome",
    };

    (async function (data) {
      try {
        const response = await axios.post(process.env.LOGIC_APP_URL, jsonData);
        console.log(response.status);
      } catch (error) {
        console.log(error);
      }
    })(jsonData);

    return true;
  } catch (ex) {
    // return ex;
  }
  return false;
};
exports.checkIfEmailDigitExists = (randomNumber) => {
  try {
    const user = tempAccount.find({ "emailConfirmation.code": randomNumber });
    if (user) {
      return true;
    }
  } catch (ex) {
  }
  return false;
};
exports.checkIfPhonenUmberDigitExists = (randomNumber) => {
  try {
    const user = tempAccount.find({ "phoneConfirmation.code": randomNumber });
    if (user) {
      return true;
    }
  } catch (ex) {
    // return ex;
  }
  return false;
};
exports.genericReturn = ({
  successResponse = genericSuccessResponse,
  failedResponse = genericErrorResponse,
  Parameter = "",
  res,
  callback = () => {},
} = {}) => {
  if (Parameter !== "") {
    if (Parameter) {
      return responseData({
        ...successResponse,
        res,
      });
    } else {
      return responseData({
        ...failedResponse,
        res,
      });
    }
  } else {
    if (callback()) {
      return responseData({
        ...successResponse,
        res,
      });
    } else {
      return responseData({
        ...failedResponse,
        res,
      });
    }
  }
};

exports.updateTempUserEmailVerification = async({username, code}) => {
  try{
    const user = await tempAccount.findOneAndUpdate({username, "emailConfirmation.confirmed": code}, {"emailConfirmation.confirmed": true}, {new:true})
    if(user) {
      return true
    }
  } catch(ex) {
    // return ex
  }
  return false
}

exports.updateTempUserPhoneVerification = async({username, code}) => {
  try {
    const user = await tempAccount.findOneAndUpdate({username, "emailConfirmation.confirmed":true, "phoneConfirmation.code":code}, {"phoneConfirmation.code": true}, {new:true})
    if(user) {
      return true
    }
  } catch (ex) {
    
  }
  return false
}

exports.updatePassword = async({username, password}) => {
  try {
    const tempUser = await tempAccount.findOneAndUpdate({username, "phoneConfirmation.confirmed":true}, {password}, {new:true})
    
    if(tempUser) {
      const newUser = new user(tempUser)
      await newUser.save()
      return true
    }
  } catch (ex) {
    
  }
  return false
}