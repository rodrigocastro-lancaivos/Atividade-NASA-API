// precisa de tratamento para caso tenha entre 1 e 2 imagens para baixar ate o 3
const axios = require('axios')

const API_KEY = process.env.NASA_API_KEY;

async function buscarApods() { 
    try {
        const response = await axios.get(
            "https://api.nasa.gov/planetary/apod",
            {
                params: {
                    api_key: API_KEY,
                    count: 3
                }
            }
        )

        return response.data;

    } catch (error) {
        console.error('Erro ao buscar APODs:', error);
    }

}

module.exports = {
    buscarApods
}