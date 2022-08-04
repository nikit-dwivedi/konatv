const baseUrl = "http://line.premium-dino.com"

module.exports = {
    auth: (username, password) => {
        let url = baseUrl + `/player_api.php?username=${username}&password=${password}`
        return url
    },
}