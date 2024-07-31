import axios from "axios";

export function addQueryParams(urlString, queryParams) {
  const query = Object.keys(queryParams)
    .map((k) => {
      if (Array.isArray(queryParams[k])) {
        return queryParams[k].map((val) => `${k}[]=${val}`).join("&");
      }
      return `${k}=${queryParams[k]}`;
    })
    .join("&");
  return `${urlString}?${query}`;
}

export function request(
  method,
  url,
  data,
  authorized = true,
  contentType = "application/json"
) {
  return new Promise(async (resolve, reject) => {
    const headers = { "content-type": contentType };
    // const body = data;

    if (authorized) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const token = userInfo?.access_token;

      if (token) {
        headers.Authorization = `Bearer ${token}`;
        axios({
          method,
          url,
          data,
          headers,
          responseType: "json",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error("Unauthorized"));
        // window.location.href = "/login";
      }
    } else {
      axios({
        method,
        url,
        data,
        headers,
        // responseType: "json",
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export const getErrorBody = (error) => {
  let response = {};
  try {
    response = error.response;
  } catch (err) {
    response = {};
  }
  response = response || {};
  const outputErrorBody = {
    ...response.data,
    status: response.status ? response.status : 408,
  };
  return outputErrorBody;
};

const getBaseApi = () => {
  // let env = process.env.NODE_ENV;
  // if (env == 'production') return process.env.PRODUCTION_SERVER;
  // else if (env == 'staging')
  //   return process.env.STAGING_SERVER;

  return process.env.NEXT_PUBLIC_API
    ? process.env.NEXT_PUBLIC_API
    : "https://backend.ecelliitr.org";
};

export const BASE_API = getBaseApi();
export const getUrl = (relUrl) => `${BASE_API}${relUrl}`;

function getBaseImgUrl() {
  const env = process.env.NODE_ENV;
  if (env === "production" || env === "staging" || env === "dev") return "";
  else {
    return process.env.NEXT_PUBLIC_DEV_SERVER;
  }
}

export const BASE_IMG_URL = getBaseImgUrl();
