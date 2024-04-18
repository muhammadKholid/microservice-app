import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';

export default {
    // Auth
    signupUser: authController.signup,
    loginUser: authController.login,

    // product
    doSearch: userController.doSearch,
};

