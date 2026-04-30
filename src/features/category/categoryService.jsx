import api from "../../api/axios";

/* =======================================================
   GET ALL CATEGORIES
   Endpoint: GET /api/categories
======================================================= */
export const getAllCategories = async () => {
  try {
    const res = await api.get("/categories", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    // ⚠️ IMPORTANT:
    // Because of axios interceptor → res is already "data"
    return res;
  } catch (err) {
    console.error("Category Fetch Error:", err);
    throw err;
  }
};

/* =======================================================
   CREATE CATEGORY
   Endpoint: POST /api/categories
======================================================= */
export const createCategory = async (data) => {
  try {
    const res = await api.post("/categories", data, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (err) {
    console.error("Create Category Error:", err);
    throw err;
  }
};