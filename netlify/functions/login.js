exports.handler = async function (event, context) {
  const fetch = await import('node-fetch').then(mod => mod.default); // Importação dinâmica do fetch
  const url = 'https://primorossi.directlead.com.br/Acesso/Entrar';

  let cpf, senha;

  // Tenta fazer o parse do corpo da requisição
  try {
    const parsedBody = JSON.parse(event.body);  // Recebe o CPF e senha do corpo da requisição
    cpf = parsedBody.cpf;
    senha = parsedBody.senha;
  } catch (error) {
    return {
      statusCode: 400,  // Retorna erro 400 se o corpo da requisição for inválido
      body: JSON.stringify({ error: 'Invalid JSON format in request body' })
    };
  }

  try {
    // Faz a requisição POST com os dados do CPF e senha
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({ cpf, senha }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const responseText = await response.text();

    // Tenta fazer o parse da resposta como JSON
    try {
      const data = JSON.parse(responseText);
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      // Se a resposta não for JSON válido, retorna o texto bruto
      return {
        statusCode: 200,
        body: responseText
      };
    }
  } catch (error) {
    // Retorna um erro 500 se a requisição falhar
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
