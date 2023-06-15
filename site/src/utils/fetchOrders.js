export default async ({ endpoint, method, token, body }) => {
  const url = new URL(process.env.REACT_APP_PROJECT_API_URL);
  url.pathname = endpoint;
  const Token = process.env.REACT_APP_PROJECT_API_TOKEN;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return { response, result };
  } catch (error) {
    console.log('Fetch Orders Error: ', error);
    return { error };
  }
};
