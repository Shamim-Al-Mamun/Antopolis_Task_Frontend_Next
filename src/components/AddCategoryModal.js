import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { useState } from "react";

const AddCategoryModal = ({ show, handleClose,fetchCats }) => {
  const [newCat, setNewCat] = useState(null);

  const addCat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/animal/categories",
        {
          category_name: newCat,
        }
      );
  
      if(response.data!=""){
        fetchCats();
        handleClose()
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addCat}>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
             Category Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewCat(e.target.value)}
            />
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

export default AddCategoryModal;
