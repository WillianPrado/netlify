exports.handler = async (event) => {
    const fetch = (await import('node-fetch')).default; // Importação dinâmica do node-fetch
    const { cpf, senha } = JSON.parse(event.body);
    const url = 'https://primorossi.directlead.com.br/Acesso/Entrar';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ cpf, senha }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const data = await response.json();
  
      return {
        statusCode: response.status,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erro ao acessar o backend', error: error.message })
      };
    }
  };
  