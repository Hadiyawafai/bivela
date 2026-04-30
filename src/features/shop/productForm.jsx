// =======================================================
// src/features/shop/productForm.jsx
// FINAL FIXED VERSION
// =======================================================

import React, { useState } from "react";
import { createProduct, updateProduct } from "./shopService";

export default function ProductForm({
  onClose,
  onSuccess,
  editData,
}) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    description: editData?.description || "",
    basePrice: editData?.basePrice || "",
    categoryId: editData?.category?.id || "",   // ✅ FIXED HERE
  });

  const [variants, setVariants] = useState(
    editData?.variants || [
      {
        size: "",
        color: "",
        price: "",
        stock: "",
      },
    ]
  );

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateVariant = (index, field, value) => {
    const copy = [...variants];
    copy[index][field] = value;
    setVariants(copy);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", color: "", price: "", stock: "" },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        description: form.description,
        basePrice: Number(form.basePrice),
        categoryId: Number(form.categoryId), // ✅ FIXED HERE

        variants: variants.map((v) => ({
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
    } catch (error) {
      alert("Failed to save product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#F2F0EF] overflow-y-auto pt-24">

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-14">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-3xl md:text-5xl"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            {editData ? "Edit Product" : "Add Product"}
          </h2>

          <button onClick={onClose} className="text-3xl">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          <SectionTitle title="Basic Information" />

          <Input
            label="Product Name"
            placeholder="Luxury Shawl"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Textarea
            label="Description"
            placeholder="Write product description..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="Base Price"
              type="number"
              placeholder="25000"
              value={form.basePrice}
              onChange={(e) =>
                setForm({ ...form, basePrice: e.target.value })
              }
            />

            {/* ✅ ONLY CHANGE: Category ID instead of name */}
            <Input
              label="Category ID"
              type="number"
              placeholder="1"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
            />
          </div>

          {/* VARIANTS */}
          <SectionTitle title="Variants" />

          {variants.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-black/10 rounded-xl p-4 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  label="Size"
                  placeholder="Large"
                  value={item.size}
                  onChange={(e) =>
                    updateVariant(index, "size", e.target.value)
                  }
                />

                <Input
                  label="Color"
                  placeholder="Black"
                  value={item.color}
                  onChange={(e) =>
                    updateVariant(index, "color", e.target.value)
                  }
                />

                <Input
                  label="Price"
                  type="number"
                  placeholder="30000"
                  value={item.price}
                  onChange={(e) =>
                    updateVariant(index, "price", e.target.value)
                  }
                />

                <Input
                  label="Stock"
                  type="number"
                  placeholder="10"
                  value={item.stock}
                  onChange={(e) =>
                    updateVariant(index, "stock", e.target.value)
                  }
                />
              </div>

              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-500 text-sm"
                >
                  Remove Variant
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="border border-black px-5 py-2 text-sm uppercase tracking-[0.2em]"
          >
            Add Variant
          </button>

          {/* IMAGES */}
          <SectionTitle title="Images" />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setImages(Array.from(e.target.files))
            }
            className="w-full border border-black/10 bg-white p-3 rounded-lg"
          />

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-4 text-sm uppercase tracking-[0.30em]"
            style={{ fontFamily: "Cardo, serif" }}
          >
            {loading
              ? "Saving..."
              : editData
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function SectionTitle({ title }) {
  return (
    <h3 className="text-xl border-b border-black/10 pb-2">
      {title}
    </h3>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-white border border-black/10 px-4 py-3 rounded-lg outline-none focus:border-black"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <textarea
        rows="5"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-white border border-black/10 px-4 py-3 rounded-lg resize-none outline-none focus:border-black"
      />
    </div>
  );
}