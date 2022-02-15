import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getTotals } from "../Slices/addToCartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";

function Home() {
  const data = useSelector((state) => state.products.items);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();

  const cartHandler = (item) => {
    dispatch(addToCart(item));
    dispatch(getTotals());
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          {data.map((item) => (
            <Col
              sm
              className="d-flex justify-content-center align-items-between mb-4"
              key={item.id}
            >
              <Card className="d=flex " style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{item.title}</Card.Title>
                  <Button variant="primary" onClick={() => cartHandler(item)}>
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
