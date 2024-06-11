exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const body = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    // Use dynamic import instead of require
    const fetch = await import('node-fetch');

    const response = await fetch.default('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: body.prompt,
        max_tokens: 100
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
