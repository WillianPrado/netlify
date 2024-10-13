const axios = require('axios');

exports.handler = async () => {
  try {
    const response = await axios.post('https://primorossi.directlead.com.br/Leads/LeadSemVendedor', { withCredentials: true });
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
