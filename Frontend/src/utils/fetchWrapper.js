import { getAccessTokenSilently } from "@auth0/auth0-react";


export const fetchWrapper = async ({ url, method = "GET", body = null, token = null }) => {
  try {
    const authToken = token || await getAccessTokenSilently();

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Error ${response.status}: ${response.statusText}`);
    }

    if (response.status !== 204) {
      return await response.json();
    } else {
      return null; // For no-content responses
    }
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
};
