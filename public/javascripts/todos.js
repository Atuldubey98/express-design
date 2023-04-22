const todoForm = document.getElementById("todoForm");
const todosList = document.getElementById("todosList");

async function deleteTodo(id) {
  console.log(typeof id);
  if (!id || typeof id !== "string") {
    throw new Error("Id is not a number");
  }
  const response = await deleteRequest(`/todos/${id}`);
  if (response) window.location.reload();
}

todoForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(todoForm);
  try {
    const todo = await postRequest("/todos", formData);
    if (todo?.id) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
