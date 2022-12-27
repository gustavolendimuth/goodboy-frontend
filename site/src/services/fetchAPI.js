export default async ({ endpoint, method, token, body }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_PROJECT_API_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return { response, result };
  } catch (error) {
    return { error };
  }
};
