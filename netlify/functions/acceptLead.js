const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const id = event.queryStringParameters.id;

  const response = await fetch(`https://primorossi.directlead.com.br/Leads/Aceitar?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
