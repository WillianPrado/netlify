exports.handler = async (event) => {
    const fetch = (await import('node-fetch')).default; // Importação dinâmica do node-fetch
    console.log('Evento recebido:', event); // Log do evento recebido
    try {
        const { cpf, senha } = JSON.parse(event.body);
        const url = 'https://primorossi.directlead.com.br/Acesso/Entrar';

        const response = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams({ cpf, senha }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const contentType = response.headers.get('Content-Type');

        if (response.ok && contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return {
                statusCode: response.status,
                body: JSON.stringify(data)
            };
        } else {
            const text = await response.text(); // Lê a resposta como texto
            console.log('Resposta não JSON:', text);
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'Não foi possível interpretar a resposta', response: text })
            };
        }
    } catch (error) {
        console.error('Erro no handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao acessar o backend', error: error.message })
        };
    }
};
