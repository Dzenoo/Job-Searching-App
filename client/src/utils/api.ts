import axios from "axios";

type AxiosHeadersConfig = {
  [key: string]: string;
};
const DEFAULT_API_URL = "http://localhost:7000";

export const postApiHandler = <T>(
  url: string,
  data: {} | FormData,
  token?: string,
  contentType: string = "application/json"
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${DEFAULT_API_URL}/${url}`, data, { headers })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const patchApiHandler = <T>(
  url: string,
  data: {},
  token?: string
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .patch(`${DEFAULT_API_URL}/${url}`, JSON.stringify(data), { headers })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const deleteApiHandler = <T>(
  url: string,
  token?: string
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .delete(`${DEFAULT_API_URL}/${url}`, { headers })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getApiHandler = <T>(url: string, token?: string): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(`${DEFAULT_API_URL}/${url}`, { headers })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
