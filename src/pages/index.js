import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AddCategoryModal from "@/components/AddCategoryModal";
import AddAnimalModal from "@/components/AddAnimalModal";
import AnimalCard from "@/components/AnimalCard";

export default function Home() {
  const [cats, setCats] = useState([]);

  const [catID, setCatID] = useState(null);
  const [animals, setAnimals] = useState([]);

  const [categoryShow, setCategoryShow] = useState(false);
  const [animalShow, setAnimalShow] = useState(false);

  const handleCategoryClose = () => setCategoryShow(false);
  const handleCategoryShow = () => setCategoryShow(true);
  const handleAnimalClose = () => setAnimalShow(false);
  const handleAnimalShow = () => setAnimalShow(true);

  useEffect(() => {
    fetchCats();
    fetchAnimals();
  }, []); // Empty dependency array to ensure useEffect runs only once when component mounts

  const fetchCats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/animal/categories"
      );
      setCats(response.data?.catagories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/animals");
      setAnimals(response.data?.animals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAnimalCategoryWise = async (catID) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/animals/${catID}`
      );
      setAnimals(response.data?.animals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (catID) {
      fetchAnimalCategoryWise(catID);
    }
  }, [catID]);

  return (
    <div className="container">
      <Head>
        <title>Next.js App</title>
      </Head>

      <main>
        <div className="main-header">
          <div className="header-category">
            {cats.length > 0 &&
              cats?.map((category, index) => (
                <Button
                  className={`${catID === category?._id ? "active" : ""}`}
                  key={index}
                  onClick={() => setCatID(category?._id)}
                >
                  {category.category_name}
                </Button>
              ))}
          </div>
          <div className="header-modal-btn">
            <Button onClick={handleCategoryShow} className="category-btn">
              Add Category
            </Button>
            <Button onClick={handleAnimalShow} className="animal-btn">
              Add Animal
            </Button>
          </div>
        </div>
        <div className="animal-card-div">
          {animals.length > 0 &&
            animals.map((animal, index) => (
              <AnimalCard animal={animal} key={index} />
            ))}
        </div>

        <AddCategoryModal
          show={categoryShow}
          handleClose={handleCategoryClose}
          fetchCats={fetchCats}
        />
        <AddAnimalModal
          show={animalShow}
          handleClose={handleAnimalClose}
          cats={cats}
          fetchAnimals={fetchAnimals}
        />
      </main>
    </div>
  );
}
