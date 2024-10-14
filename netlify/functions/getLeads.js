const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const cookieHeader = event.headers['cookie']; // Obtém o cookie do cabeçalho da requisição

    // Realiza a requisição para buscar os leads
    const response = await axios.get('https://primorossi.directlead.com.br/Leads/LeadSemVendedor', {
      headers: {
        'Cookie': cookieHeader, // Usa o cookie que foi passado na requisição
        'Accept': 'application/json'
      },
      withCredentials: true
    });
 
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
