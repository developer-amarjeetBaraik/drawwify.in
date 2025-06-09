
export const fetchWrapper = ({ url, method = "GET", body = null }) => {
  try {
    const data = fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`
      },
      body: body ? JSON.stringify(body) : null
    }).then((res) => res.json())
      .then(res => {
        return res
      })
      .catch((err) => console.log(err))

  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
  console.log(data)
  return data
};
