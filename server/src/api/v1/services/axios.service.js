const axios = require("axios").default;
const res = require("express/lib/response");
require("dotenv").config();


async function axiosResponse(response) {
    if (response.status == 200) {
        return response.data;
    } else {
        return false;
    }
}
module.exports = {
    post: async (endpoint, dataa) => {
        let config = {
            method: "post",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
            },
            data: { id_no: dataa },
        };
        let response = await axios(config)
        return axiosResponse(response);
    },
    get: async (endpoint) => {
        let config = {
            method: "get",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let response = await axios(config)
        return axiosResponse(response);
    },
};
