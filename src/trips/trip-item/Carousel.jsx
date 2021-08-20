import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Col, Row } from 'react-bootstrap';

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const data = [
    {
      label: 'First slide label',
      description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(44).jpg',
    },
    {
      label: 'Second slide label',
      description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(48).jpg',
    },
    {
      label: 'Third slide labelx',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(42).jpg',
    },
  ];
  return (
    <Row style={{ marginTop: '-50px' }}>
      <Col lg={12}>
        <Carousel
          activeIndex={index}
          onSelect={(selectedIndex) => setIndex(selectedIndex)}
          indicators={false}
        >
          {data.map((item) => (
            <Carousel.Item key={item.label}>
              <img className="d-block w-100" src={item.src} alt="First slide" />
              <Carousel.Caption>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}
