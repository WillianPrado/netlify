const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch('https://primorossi.directlead.com.br/Leads/LeadSemVendedor', {
    method: 'GET',
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
