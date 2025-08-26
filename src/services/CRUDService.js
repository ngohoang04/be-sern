const bcrypt = require('bcryptjs');
const db = require('../models/index');
const { raw } = require('body-parser');
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hassPasswordFromBcrypt,
                address: data.address,
                phoneNumber: data.phonenumber,
                roleId: data.role,
                gender: data.gender === '1' ? true : false
            });

            resolve('ok create a new user succeed!');

        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}

let deleteUser = async (userId) => {
    try {
        let user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            return { success: false, message: "User not found" };
        }

        await user.destroy();
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        throw error;
    }
};

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordFromBcrypt = await hashUserPassword(data.password);
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.address = data.address;
                user.phoneNumber = data.phonenumber;
                user.roleId = data.role;
                user.password = hassPasswordFromBcrypt;
                user.gender = data.gender === '1' ? true : false;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve('User not found');
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createNewUser,
    hashUserPassword,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUser
}