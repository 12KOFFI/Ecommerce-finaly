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
  const [category, setCategory] = useState("Écouteurs");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [subCategory, setSubCategory] = useState("Haut de gamme");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("bestseller", bestseller);
      
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

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

      if (response.data.success) {
        toast.success("Produit ajouté avec succès !");
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
        toast.error(response.data.message || "Échec de l'ajout du produit");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error(error.response?.data?.message || "Échec de l'ajout du produit. Veuillez réessayer.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Télécharger les images</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => {
            const img = eval(`image${num}`);
            const setImg = eval(`setImage${num}`);
            return (
              <label key={num} htmlFor={`image${num}`}>
                <img
                  className="w-20 cursor-pointer"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt={`Image ${num}`}
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
        <p className="mb-2">Nom du produit</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Saisissez le nom du produit"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description du produit</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Décrivez le produit en détail"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Marque</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Samsung, Apple, Sony..."
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Couleur</p>
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
          <p className="mb-2">Catégorie</p>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Écouteurs">Écouteurs</option>
            <option value="Casques">Casques</option>
            <option value="Montres">Montres Connectées</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Ordinateurs">Ordinateurs</option>
            <option value="Tablettes">Tablettes</option>
            <option value="Caméras">Caméras</option>
            <option value="Jeux vidéos & Consoles">Jeux vidéos & Consoles</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sous-catégorie</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Haut de gamme">Haut de gamme</option>
            <option value="Milieu de gamme">Milieu de gamme</option>
            <option value="Entrée de gamme">Entrée de gamme</option>
            <option value="Promotions">Promotions</option>
            <option value="Nouveautés">Nouveautés</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Prix (€)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="99.99"
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
        <label className="cursor-pointer" htmlFor="bestseller">
          Ajouter aux meilleures ventes
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
