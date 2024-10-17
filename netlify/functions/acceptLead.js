const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    // Parse o corpo da requisição para JSON
    const { id } = JSON.parse(event.body); // Obtém o ID do lead do corpo da requisição
    const cookieHeader = event.headers['cookie']; // Obtém o cookie do cabeçalho da requisição
    console.log('Cookie recebido:', cookieHeader);
    console.log('ID do lead:', id);

    // Realiza a requisição para aceitar o lead
    const response = await axios.post(`https://primorossi.directlead.com.br/Leads/Aceitar`, 
      new URLSearchParams({ id }), // Passa o ID como parâmetros
      {
        headers: {
          'Cookie': 'ASP.NET_SessionId=0yqldz11zinec1gjycoqctbw', // Usa o cookie que foi passado na requisição
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Erro ao aceitar lead:', error); // Log do erro
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
