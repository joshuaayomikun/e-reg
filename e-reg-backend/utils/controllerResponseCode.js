exports.statusCodeConstant = {
    controllers: {
        profile:{
            methods: {
                getAllProfiles:{
                    statusCodes:{
                        ok:this.genericSuccessResponse,
                        cannotGet:this.genericErrorResponse
                    }
                },
                getProfileByUserId: {
                    statusCodes: {
                        ok:this.genericSuccessResponse,
                        cannotGet: this.genericErrorResponse
                    }
                }
            }
        },
        account: {
            methods: {
                addPassword: {
                    statusCodes:{
                        ok: this.genericSuccessResponse,
                        updateFailed: {
                            ...this.genericErrorResponse,
                            message: "cannot add password"
                        }
                    }
                },
                verifyUserbyPhone:{
                    statusCodes:{
                        ok: this.genericSuccessResponse,
                        cannotVerify:{
                            ...this.genericErrorResponse,
                            message: "Cannot update",
                        }
                    }
                },
                verifyUserbyEmail:{
                    statusCodes:{
                        ok: this.genericSuccessResponse,
                        cannotVerify:{
                            ...this.genericErrorResponse,
                            message: "Cannot update",
                        }
                    }
                },
                firstPageSignup: {
                    statusCodes: {
                        ok: this.genericSuccessResponse,
                        userExists: {
                            ...this.genericErrorResponse,
                            message: "User exists",
                        },
                        canNotCreate: {
                            ...this.genericErrorResponse,
                            message: "Cannot create user",
                            status:-2
                        }
                    }
                },
                emailNotExists: {
                    statusCodes: {
                        ok: this.genericSuccessResponse,
                        emailExists: {
                            ...this.genericErrorResponse,
                            message: "Email exists",
                        }
                    }
                },
                usernameNotExists: {
                    statusCodes: {
                        ok: this.genericSuccessResponse,
                        usernameExists: {
                            ...this.genericErrorResponse,
                            message: "Username exists",
                        }
                    }
                }
            }
        }
    }
}

exports.genericSuccessResponse =  {
    status: 200,
    message: "ok",
    state: 1
}

exports.genericErrorResponse = {
    status: 200,
    message: "not ok",
    state: -1
}