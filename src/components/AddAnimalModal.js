import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { useState } from "react";

const AddAnimalModal = ({ cats, show, handleClose,fetchAnimals }) => {
  const [newAnimal, setNewAnimal] = useState(null);
  const [newCatID, setNewCatID] = useState(null);

  const addAnimal = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("fileInput"); // Assuming you have an input element with id 'fileInput'
    formData.append("animalImage", fileInput.files[0]);
    formData.append("animal_name", newAnimal);
    formData.append("animal_category", newCatID);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/animals",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response
      console.log("File uploaded successfully", response.data);
      if(response.data==="Animal saved successfully!"){
        fetchAnimals();
        handleClose()
      }
    } catch (error) {
      // Handle error
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addAnimal}>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Select Category
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setNewCatID(e.target.value)}
            >
              <option selected>Select a Category</option>
              {cats.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
             Animal Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewAnimal(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="fileInput" className="form-label">
              Animal Image
            </label>
            <input class="form-control" type="file" id="fileInput" />
          </div>
          <div className="form-btn">
            {" "}
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAnimalModal;
