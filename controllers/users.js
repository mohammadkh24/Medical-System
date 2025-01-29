const usersModel = require("../models/users");

exports.getAll = async (req,res) => {
    const users = await usersModel.find({}).lean();

    return res.json(users)
}
exports.getOne = async (req,res) => {

}
exports.changeRole = async (req,res) => {

}
exports.remove = async (req,res) => {

}