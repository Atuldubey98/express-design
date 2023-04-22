const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.onclick = async () => {
  try {
    const response = await (
      await fetch("/users/logout", {
        method: "post",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
    ).json();
    if (response) {
        window.location.replace("/users/login");
    }
  } catch (error) {
    console.log(error);
  }
};
