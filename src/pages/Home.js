import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-grid";
import { toast } from "react-toastify";
import { deleteContact, setFilter } from "../redux/features/videoSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props}>
      <br></br>
      <center>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
        <Modal.Body className="video-responsive" style={{ height: "220px" }}>
          <iframe
            src={props.src}
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            title="videoHere"
          ></iframe>
        </Modal.Body>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </center>
      <br></br>
    </Modal>
  );
}

const Home = () => {
  const { contacts, filter } = useSelector((state) => state.contact);
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch();
  const onDeleteContact = (id) => {
    if (window.confirm("Are you sure that you wanted to delete this Video ?")) {
      dispatch(deleteContact(id));
      toast.success("Video Deleted Succesfully");
    }
  };

  // const setModal = (props) =>{
  //   <MyVerticallyCenteredModal
  //   show={modalShow}
  //   onHide={() => setModalShow(false)}
  //   src={props.link}
  //   title={props.title}
  // />
  // };
  // const filterData = (value) => {};

  return (
    <div style={{ marginTop: "30px" }}>
      <Link to="/addContact">
        <Button variant="outline-dark" className="btn btn-contact">
          Add Video
        </Button>
      </Link>
      <br></br>
      <br></br>
      <div>
        <label>Filter by Categories : </label>
        <br></br>
        <br></br>
        <Button
          variant="dark"
          className="btn btn-entertainment"
          onClick={() => dispatch(setFilter("Entertainment"))}
        >
          Entertainment
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="dark"
          className="btn btn-educational"
          onClick={() => dispatch(setFilter("Educational"))}
        >
          Educational
        </Button>
        <br></br>
        <br></br>
        <Button
          variant="success"
          className="brn btn-reset"
          onClick={() => dispatch(setFilter("All"))}
        >
          Reset
        </Button>
      </div>
      &nbsp;&nbsp;&nbsp;
      {contacts
        .filter((item) => {
          if (filter === "All") {
            return item;
          } else {
            return item.category === filter;
          }
        })
        .map((item, index) => {
          return (
            <Container style={{ marginBelow: "10px" }}>
              <center>
                <Card style={{ width: "70vw", borderColor: "grey" }}>
                  <Card.Body>
                    <Card.Title>Video Title: {item.title}</Card.Title>
                    <Card.Title>Category: {item.category}</Card.Title>
                    <Card.Text>
                      Video Link: <Card.Link>{item.link}</Card.Link>
                    </Card.Text>

                    <br></br>
                    <div>
                      <Link to={`/update/${item.id}`}>
                        <Button
                          variant="outline-success"
                          className="btn btn-edit"
                        >
                          Edit
                        </Button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        variant="outline-danger"
                        className="btn btn-delete"
                        onClick={() => onDeleteContact(item.id)}
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      {/* <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view">View</button>
                </Link> */}
                      <Button
                        variant="outline-primary"
                        className="btn btn-modal"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  src={item.link}
                  title={item.title}
                />
                &nbsp;&nbsp;&nbsp;
              </center>
            </Container>
          );
        })}
    </div>
  );
};

export default Home;
