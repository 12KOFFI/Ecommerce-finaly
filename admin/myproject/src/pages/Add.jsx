import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Écouteur");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Backend URL:", backendUrl);
      console.log("Token:", token || localStorage.getItem("token"));

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("bestseller", bestseller);
      
      if (image1) {
        console.log("Image 1 size:", image1.size, "bytes");
        formData.append("image1", image1);
      }
      if (image2) {
        console.log("Image 2 size:", image2.size, "bytes");
        formData.append("image2", image2);
      }
      if (image3) {
        console.log("Image 3 size:", image3.size, "bytes");
        formData.append("image3", image3);
      }
      if (image4) {
        console.log("Image 4 size:", image4.size, "bytes");
        formData.append("image4", image4);
      }

      console.log("Sending data to:", `${backendUrl}/api/product/add`);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token: token || localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBrand("");
        setColor("");
      } else {
        console.error("Server error:", response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      toast.error(error.response?.data?.message || "Failed to upload product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => {
            const img = eval(`image${num}`);
            const setImg = eval(`setImage${num}`);
            return (
              <label key={num} htmlFor={`image${num}`}>
                <img
                  className="w-20 cursor-pointer"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                  id={`image${num}`}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="write content here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Brand</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Samsung, Apple, Sony..."
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Color</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Noir, Blanc, Rouge..."
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Écouteur">Écouteur</option>
            <option value="Casques">Casques</option>
            <option value="Montres">Montres</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Ordinateur">Ordinateur</option>
            <option value="Camera">Camera</option>
            <option value="Accessoire">Accessoire</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer " htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded"
      >
        AJOUTER
      </button>
    </form>
  );
};

export default Add;
