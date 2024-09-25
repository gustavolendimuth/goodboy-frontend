export default async (id) => {
  const token = process.env.REACT_APP_PROJECT_ACCESS_TOKEN;
  const url = new URL(process.env.REACT_APP_PROJECT_MERCADO_PAGO_URL);
  url.pathname = `/V1/payments/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return { response, result };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
