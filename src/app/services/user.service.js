const UserFactory = require("../factories/user.factory");
const UserRepository = require("../repositories/user.repository");

class UserService {
    static async createUser(data) {
        try {
            const creatUser = await UserRepository.createUser(data);
            const formatedUser = await UserFactory.createUser(creatUser);
            return formatedUser;
        } catch (err) {

        }
    }
}

module.exports = UserService;