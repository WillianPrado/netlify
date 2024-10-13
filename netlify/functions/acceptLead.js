const axios = require('axios');

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  try {
    const response = await axios.post(`https://primorossi.directlead.com.br/Leads/Aceitar?id=${id}`, {}, { withCredentials: true });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
