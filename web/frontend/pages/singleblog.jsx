import React from 'react';
import { Container, Row, Col, Image, Card, Breadcrumb } from 'react-bootstrap';
import "./assets/css/singleblog.css"; // Import the custom CSS for additional styling

const SingleBlogPage = () => {
  return (
    <Container className="my-5 single-blog-page">
      <Row>
        <Col md={8} className="mx-auto mb-3">
          {/* Breadcrumb for Navigation */}
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/blogs">Blogs</Breadcrumb.Item>
            <Breadcrumb.Item active>Single Blog</Breadcrumb.Item>
          </Breadcrumb>

          {/* Blog Cover Image */}
          <Image 
            src="https://via.placeholder.com/800x400" 
            alt="Blog Cover" 
            className="blog-cover-img rounded" 
            fluid 
          />
          <Card className="border-0 mt-4">
            <Card.Body>
              <Card.Title className="blog-title">How to Create a Modern Blog with React</Card.Title>
              <Card.Subtitle className="text-muted mb-3">By John Doe | December 2, 2024</Card.Subtitle>
              <Card.Text className="blog-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                vel augue sit amet libero sollicitudin interdum. Integer nec
                consectetur elit, a tincidunt est. Suspendisse sit amet justo ut
                sapien ornare bibendum nec non mi.
              </Card.Text>
              <Card.Text className="blog-content">
                Fusce eget convallis enim. Donec vitae sapien vehicula, tincidunt
                ligula eget, cursus elit. Aenean id feugiat quam. Maecenas non
                lacinia nisi, ut fermentum risus. Duis tempor urna ac nisi
                scelerisque, in tincidunt orci euismod.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleBlogPage;
