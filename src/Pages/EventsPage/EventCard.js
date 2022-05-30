import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "react-simple-tooltip";

function EventCard(props) {
  const history = useHistory(); // useHistory hook to get history object from react router dom

  const { event } = props;
  const { country, city, name } = event?.venue;
  const date = new Date(event?.datetime);

  const [dateState, setDateState] = useState("");

  useEffect(() => {
    const Month = date?.toDateString()?.split(" ")[1];
    const Date = date?.toDateString()?.split(" ")[2];
    const Year = date?.toDateString()?.split(" ")[3];
    setDateState(`${Date} ${Month}, ${Year}`);
  }, []);

  const eventCardClickHandler = () => {
    window.open(`${event?.url}`);
  };

  return (
    <Wrapper onClick={eventCardClickHandler}>
      <div className="heading">EVENT DETAILS</div>
      <Container className="container-card">
        <Row className="row-card" align="center">
          <Col className="col-card">
            <Row className="row-inner-1">Country</Row>
            <Tooltip
              color="#f5f5f5"
              content={country}
              placement="left"
              offset="2"
            >
              <Row className="row-inner-2">{country}</Row>
            </Tooltip>
          </Col>
          <Col className="col-card">
            <Row className="row-inner-1">City</Row>

            <Tooltip color="#f5f5f5" content={city} placement="left" offset="2">
              <Row className="row-inner-2">{city}</Row>
            </Tooltip>
          </Col>
        </Row>
        <Row className="row-card" align="center">
          <Col className="col-card">
            <Row className="row-inner-1">Venue</Row>
            <Tooltip color="#f5f5f5" content={name} placement="left" offset="2">
              <Row className="row-inner-2">{name}</Row>
            </Tooltip>
          </Col>
          <Col className="col-card">
            <Row className="row-inner-1">Date</Row>
            <Tooltip
              color="#f5f5f5"
              content={dateState}
              placement="left"
              offset="2"
            >
              <Row className="row-inner-2">{dateState}</Row>
            </Tooltip>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default EventCard;

const Wrapper = styled.div`
  height: 160px;
  padding: 20px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05);
  .heading {
    padding-top: 5px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    height: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: 600;
    opacity: 0.7;
  }
  .container-card {
    max-width: 100% !important;
  }
  .row-card {
    height: 65px;
    font-weight: 600;

    .row-inner-1 {
      margin-bottom: 8px;
      font-size: 17px;
      opacity: 0.7;
    }
    .row-inner-2 {
      margin-bottom: 5px;
      font-size: 15px;
      opacity: 0.5;
      width: 100%;
      height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
  .col-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .data-tooltip {
    position: relative;
    cursor: default;
  }
  .data-tooltip::after {
    position: absolute;
    width: auto;
    left: 0;
    content: attr(data-tooltip);
  }
`;
