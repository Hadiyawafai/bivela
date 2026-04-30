// // =======================================================
// // src/features/shop/shopService.jsx
// // FINAL UPDATED PRODUCT API FILE
// // =======================================================

// import api from "../../api/axios";

// // Common headers
// const headers = {
//   "ngrok-skip-browser-warning": "true",
// };

// // =======================================================
// // GET ALL PRODUCTS
// // =======================================================
// export const getAllProducts = async () => {
//   try {
//     const res = await api.get("/products", { headers });
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// // =======================================================
// // GET SINGLE PRODUCT
// // =======================================================
// export const getProductById = async (id) => {
//   try {
//     const res = await api.get(`/products/${id}`, { headers });
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// // =======================================================
// // DELETE PRODUCT
// // =======================================================
// export const deleteProduct = async (id) => {
//   try {
//     const res = await api.delete(`/products/${id}`, { headers });
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// // =======================================================
// // CREATE PRODUCT
// // =======================================================
// export const createProduct = async (
//   productData,
//   images = []
// ) => {
//   try {
//     const formData = new FormData();

//     // JSON Product Object
//     formData.append(
//       "product",
//       new Blob(
//         [JSON.stringify(productData)],
//         {
//           type: "application/json",
//         }
//       )
//     );

//     // Multiple Images
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     const res = await api.post(
//       "/products",
//       formData,
//       {
//         headers: {
//           ...headers,
//           "Content-Type":
//             "multipart/form-data",
//         },
//       }
//     );

//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// // =======================================================
// // UPDATE PRODUCT
// // =======================================================
// export const updateProduct = async (
//   id,
//   productData,
//   images = []
// ) => {
//   try {
//     const formData = new FormData();

//     formData.append(
//       "product",
//       new Blob(
//         [JSON.stringify(productData)],
//         {
//           type: "application/json",
//         }
//       )
//     );

//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     const res = await api.put(
//       `/products/${id}`,
//       formData,
//       {
//         headers: {
//           ...headers,
//           "Content-Type":
//             "multipart/form-data",
//         },
//       }
//     );

//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// =======================================================
// src/features/shop/shopService.jsx
// CLEAN + CONSISTENT + PRODUCTION READY
// =======================================================

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
export const createProduct = async (productData, images = []) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productData)], {
      type: "application/json",
    })
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.post("/products", formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

// =======================================================
// UPDATE PRODUCT
// =======================================================
export const updateProduct = async (id, productData, images = []) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productData)], {
      type: "application/json",
    })
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.put(`/products/${id}`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
};