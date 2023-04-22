function getValidJSON(formData) {
  if (!(formData instanceof FormData)) {
    throw new Error("Some error");
  }
  const data = {};
  formData.forEach((value, key) => {
    data[key] =
      key === "completed" ? (value === "false" ? false : true) : value;
  });
  return data;
}
async function postRequest(url, data) {
  if (!url || typeof url !== "string" || typeof data !== "object") {
    throw new Error("Url is not string");
  }
  const response = await (
    await fetch(url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValidJSON(data)),
    })
  ).json();
  return response;
}
async function deleteRequest(url) {
  if (!url || typeof url !== "string") {
    throw new Error("Url is not string");
  }
  const response = await (
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response;
}
async function getRequest(url) {
  if (!url || typeof url !== "string") {
    throw new Error("Url is not string");
  }
  return await fetch(url, {
    credentials: true,
  });
}

