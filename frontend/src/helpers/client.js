const sendQuery = async (query, auth = {}) => {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        ...auth,
      },
    });
    const { data } = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed');
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { sendQuery };
