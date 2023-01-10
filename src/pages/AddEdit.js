import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { addContact, updateContact, getContact } from "../redux/features/videoSlice";
import { useDispatch , useSelector} from "react-redux";

const initialState = {
  title: "",
  category: "",
  link: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { title, category, link } = state;

  const { contact } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getContact(id));
    setState({...contact});
  }, [dispatch, id, contact]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !category || !link) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        dispatch(addContact(state));
        toast.success("Video Details Added Succesfully");
      } else {
        dispatch(updateContact(state));
        toast.success("Video Details Updated Succesfully");
      }

      setTimeout(() => history.push("/"), 500);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Video Title ..."
          value={title || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Category</label>
        <select
          className="dropdown"
          name="category"
          onChange={handleDropdownChange}
        >
          <option>Please Select Status</option>
          <option
            value="Entertainment"
            selected={category === "Entertainment" ? category : ""}
          >
            Entertainment
          </option>
          <option
            value="Educational"
            selected={category === "Educational" ? category : ""}
          >
            Educational
          </option>
        </select>

        <label htmlFor="link">Video Link</label>
        <input
          type="link"
          id="link"
          name="link"
          placeholder="Video link ..."
          value={link || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
