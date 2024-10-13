exports.handler = async function (event, context) {
  const fetch = await import('node-fetch').then(mod => mod.default);
  const url = 'https://primorossi.directlead.com.br/Leads/LeadSemVendedor';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authority': 'primorossi.directlead.com.br',
        'cookie': event.headers.cookie || '', // Captura o cookie enviado
      }
    });

    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: responseText
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
