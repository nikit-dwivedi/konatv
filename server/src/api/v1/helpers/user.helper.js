const { generateUserToken, checkEncryption } = require('../middleware/isAuthenticated');
const userModel = require('../models/user.model');
const { get } = require('../services/axios.service');
const { auth } = require('../services/iptv.urls');

module.exports = {
    register: async (data) => {

    },
    login: async (username, password) => {
        try {
            let url = auth(username, password)
            const serverCheck = await get(url)
            if (serverCheck.auth || serverCheck.user_info.status == "Expied") {
                return false;
            }
            const clientData = await userModel.findOne({ username });
            if (clientData) {
                clientData.isLogin = true;
                return await clientData.save() ? clientData : false;
            }
            const saveData = await userModel({ username, password });
            return await saveData.save() ? saveData : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    register: async (id, data) => {
        try {
            const formmatData = {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                profileImage: data.profileImage,
                gender: data.gender,
                country: data.country,
                town: data.town,
                dob: data.dob,
                isRegisterd: true
            }
            const updatedData = await userModel.findByIdAndUpdate(id, formmatData, { new: true });
            return updatedData.save() ? true : false;
        } catch (error) {
            return false;
        }
    }
}