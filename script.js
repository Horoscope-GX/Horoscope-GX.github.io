async function askChatGPT() {
  const question = document.getElementById('question').value;
  const responseDiv = document.getElementById('response');
  
  responseDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: question })
    });

    const data = await response.json();
    responseDiv.innerHTML = data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    responseDiv.innerHTML = 'Error fetching response.';
  }
}
