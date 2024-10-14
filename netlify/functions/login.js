const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const cookieHeader = event.headers['cookie']; // Obtém o cookie do cabeçalho da requisição

    // Realiza o login
    const response = await axios.post('https://primorossi.directlead.com.br/Acesso/Entrar', 
      new URLSearchParams({
        cpf: requestBody.cpf,
        senha: requestBody.senha
      }).toString(), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader // Envia o cookie que foi passado na requisição
        },
        withCredentials: true
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login realizado com sucesso',
        cookies: response.headers['set-cookie'], // Retorna os cookies, se necessário
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
