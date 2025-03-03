import bcrypt, { truncates } from "bcryptjs";
import db from '../models/index';
import e from "express";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                address: data.address,
                phoneNumber: data.phoneNumber,

            })
            resolve('ok create an new user succed!')
        } catch (e) {
            reject(e);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            // tìm user trong db với điều kiện id == id ta truyền vào
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            // tìm được, cập nhật user
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                //lưu thông tin lại
                await user.save();
                let allUser = db.User.findAll();
                resolve(allUser)
            }
            else {
                resolve('user is not found!!');
            }

            await db.User.update({

            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
                resolve()
            } else {
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

}