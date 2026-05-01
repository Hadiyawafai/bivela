import api from "../../api/axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
};

// =======================================================
// GET ALL PRODUCTS
// =======================================================
export const getAllProducts = async () => {
  return await api.get("/products", { headers });
};

// =======================================================
// GET SINGLE PRODUCT
// =======================================================
export const getProductById = async (id) => {
  return await api.get(`/products/${id}`, { headers });
};

// =======================================================
// DELETE PRODUCT
// =======================================================
export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`, { headers });
};

// =======================================================
// CREATE PRODUCT
// =======================================================
export const createProduct = async (
  productData,
  images = []
) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob(
      [JSON.stringify(productData)],
      {
        type: "application/json",
      }
    )
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.post(
    "/products",
    formData,
    {
      headers: {
        ...headers,
        // DO NOT set Content-Type manually
      },
    }
  );
};

// =======================================================
// UPDATE PRODUCT
// =======================================================
export const updateProduct = async (
  id,
  productData,
  images = []
) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob(
      [JSON.stringify(productData)],
      {
        type: "application/json",
      }
    )
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        ...headers,
        // DO NOT set Content-Type manually
      },
    }
  );
};