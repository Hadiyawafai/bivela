import api from "../../api/axios";

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  return await api.get("/categories", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// CREATE CATEGORY
export const createCategory = async (data) => {
  return await api.post("/categories", data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};