import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { LinkContainer } from "react-router-bootstrap";
import {
  useAddToCartMutation,
  useCreateCommentMutation,
} from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import { Modal } from "antd";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const handleDragStart = (e) => e.preventDefault();
  const [createComment, { isError, error, isLoading }] =
    useCreateCommentMutation();
  const { navigate } = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
      setComments(data.comment);
    });
  }, []);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  function handleComment(e) {
    e.preventDefault();
    axios
      .post(`/products/comment/${id}`, { user_id: user._id, comment: comment })
      .then(({ data }) => setComments([...comments, data]));
  }
  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product__price">${product.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong> {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "50%", borderRadius: "0", height: "50%" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0],
                  })
                }
              >
                Add to cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/products/${product._id}/edit`}>
              <Button>Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Add to cart"
              body={`${product.name} is in your cart`}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Button type="primary" onClick={showModal}>
          Comment
        </Button>
        <Modal
          title="Comment"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {user && (
            <div className="form-group">
            <Form onSubmit={handleComment}>
              <h4>Leave a comment</h4>
              <Form.Group className="mt-3">
                <Form.Label></Form.Label>
                <Form.Control
                  type="comment"
                  placeholder="Leave a comment"
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" className="btn">
                  Send
                </Button>
              </Form.Group>
            </Form>
          </div>
          )}
          
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => {
                return(
                <tr key={comment.id}>
                <td>{comment?.owner?.name}</td>
                <td>{comment.content}</td>
              </tr>
              );
              })}
            </tbody>
          </Table>
          
        </Modal>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
