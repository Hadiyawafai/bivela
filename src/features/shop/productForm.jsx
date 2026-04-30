// =======================================================
// src/features/shop/productForm.jsx
// BEAUTIFIED + PRODUCTION READY
// =======================================================

import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "./shopService";
import { getAllCategories } from "../category/categoryService";

export default function ProductForm({ onClose, onSuccess, editData }) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    description: editData?.description || "",
    basePrice: editData?.basePrice || "",
    categoryId: editData?.category?.id || "",
    isActive: editData?.isActive ?? true,
  });

  const [categories, setCategories] = useState([]);
  const [openCat, setOpenCat] = useState(false);

  const [variants, setVariants] = useState(
    editData?.variants || [
      { sku: "", size: "", color: "", price: "", stock: "" },
    ]
  );

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();

        const data =
          res?.data?.data ||
          res?.data?.categories ||
          res?.data ||
          [];

        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  /* ================= VARIANTS ================= */
  const updateVariant = (i, field, value) => {
    const copy = [...variants];
    copy[i][field] = value;
    setVariants(copy);
  };

  const addVariant = () =>
    setVariants([
      ...variants,
      { sku: "", size: "", color: "", price: "", stock: "" },
    ]);

  const removeVariant = (i) =>
    setVariants(variants.filter((_, idx) => idx !== i));

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        basePrice: Number(form.basePrice),
        categoryId: Number(form.categoryId),
        isActive: form.isActive,

        variants: variants.map((v) => ({
          sku: v.sku,
          size: v.size,
          color: v.color,
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      };

      if (editData) {
        await updateProduct(editData.id, payload, images);
      } else {
        await createProduct(payload, images);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = (categories || []).find(
    (c) => c.id === Number(form.categoryId)
  );

  return (
    <div className="fixed inset-0 z-[60] bg-[#F2F0EF] flex justify-center">
      <div className="w-full max-w-4xl px-4 py-5 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-3">
          <h2 className="text-3xl font-serif">
            {editData ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-3">

            <Input
              label="Product Name"
              placeholder="e.g. Luxury Kashmiri Shawl"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              label="Base Price"
              type="number"
              placeholder="e.g. 25000"
              value={form.basePrice}
              onChange={(e) =>
                setForm({ ...form, basePrice: e.target.value })
              }
            />

            {/* CATEGORY */}
            <div className="relative">
              <label className="text-sm">Category</label>

              <div
                onClick={() => setOpenCat(!openCat)}
                className="w-full bg-white border px-3 py-2 mt-1 cursor-pointer"
              >
                {selectedCategory?.name || "Select Category"}
              </div>

              {openCat && (
                <div className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto z-20">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setForm({ ...form, categoryId: cat.id });
                        setOpenCat(false);
                      }}
                      className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTIVE */}
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />
              <label className="text-sm">Active Product</label>
            </div>
          </div>

          {/* DESCRIPTION */}
          <Textarea
            label="Description"
            placeholder="Write detailed product description..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* VARIANTS */}
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-2 bg-white p-2"
              >
                <InputSmall
                  placeholder="SKU"
                  value={v.sku}
                  onChange={(e) =>
                    updateVariant(i, "sku", e.target.value)
                  }
                />
                <InputSmall
                  placeholder="Size"
                  value={v.size}
                  onChange={(e) =>
                    updateVariant(i, "size", e.target.value)
                  }
                />
                <InputSmall
                  placeholder="Color"
                  value={v.color}
                  onChange={(e) =>
                    updateVariant(i, "color", e.target.value)
                  }
                />
                <InputSmall
                  type="number"
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) =>
                    updateVariant(i, "price", e.target.value)
                  }
                />
                <div className="flex gap-1">
                  <InputSmall
                    type="number"
                    placeholder="Stock"
                    value={v.stock}
                    onChange={(e) =>
                      updateVariant(i, "stock", e.target.value)
                    }
                  />

                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="text-red-500 text-xs"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addVariant}
            className="text-sm border px-3 py-1"
          >
            + Add Variant
          </button>

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3"
          >
            {loading ? "Saving..." : editData ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= INPUTS ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input {...props} className="w-full border px-3 py-2 mt-1" />
    </div>
  );
}

function InputSmall(props) {
  return <input {...props} className="border px-2 py-1 text-sm w-full" />;
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <textarea {...props} className="w-full border p-2 mt-1" />
    </div>
  );
}