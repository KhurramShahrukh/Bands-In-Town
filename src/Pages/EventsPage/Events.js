import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

// Local imports
import { searchArtistService, searchEventsService } from "../../API/Services";
import { AppContext } from "../../Contexts/AppContext";
import ArtistCard from "../SearchPage/ArtistCard";
import ArtistCardLoader from "../SearchPage/ArtistCardLoader";
import EventCard from "./EventCard";
import EventCardLoader from "./EventCardLoader";

function Events() {
  const history = useHistory(); // useHistory hook to get history object from react router dom
  const { searchedArtistName } = useContext(AppContext); // useContext hook to get the app state from the AppContext

  const artistName =
    searchedArtistName === ""
      ? sessionStorage.getItem("searchValue") ?? ""
      : searchedArtistName;
  // get the artist name from the app context state
  // In case of page refresh, get from artist name from sessionStorage to persist data on page refresh
  // If sessionStorage value is null or undefined set value to empty string to avoid null value error

  // Local States
  const [artistsData, setartistsData] = React.useState([]); // state for all artists data
  const [artistsDataLoading, setArtistsDataLoading] = React.useState(false); // State to track loading status of artists data
  const [eventsData, setEventsData] = React.useState([]); // State for all events
  const [eventsCount, setEventsCount] = React.useState(0); // State for number of events
  const [eventsCardLoading, setEventsCardLoading] = React.useState(false); // State to track loading status of artists data

  const backToSearchPageHandler = () => {
    history.push("/");
  };

  useEffect(() => {
    // this is called when the component is mounted

    // call API for artist details
    setArtistsDataLoading(true);
    if (artistName?.length > 0) {
      searchArtistService(artistName)
        .then((res) => {
          setartistsData(res.data);
          setArtistsDataLoading(false);
        })
        .catch((err) => {
          setArtistsDataLoading(false);
        });
    } else {
      setArtistsDataLoading(false);
    }

    // call API for artist events
    setEventsCardLoading(true);
    if (artistName?.length > 0) {
      searchEventsService(artistName)
        .then((res) => {
          setEventsData(res.data);
          setEventsCount(res.data?.length);
          setEventsCardLoading(false);
        })
        .catch((err) => {
          setEventsCardLoading(false);
        });
    } else {
      setEventsCardLoading(false);
    }

    if (artistName?.length === 0) {
      // if artist name is empty when the user refreshes the page, redirect to search page
      history.push("/");
    }
  }, []);

  return (
    <Wrapper>
      <Text onClick={backToSearchPageHandler} className="back-text">
        <IoIosArrowBack className="icon" />
        Back to results
      </Text>
      <Container className="container" fluid>
        <Row justify="start">
          {artistsDataLoading ? (
            <Col md={6} lg={4}>
              <ArtistCardLoader />
            </Col>
          ) : (
            <Col md={6} lg={4}>
              <ArtistCard artist={artistsData} />
            </Col>
          )}
        </Row>
      </Container>
      {eventsCardLoading ? (
        <Text>{`Fetching upcoming event(s)...`}</Text>
      ) : (
        <Text>{`${eventsCount} upcoming event(s)`}</Text>
      )}
      <Container className="container container-events" fluid>
        <Row className="row" justify="start" gutterWidth={10}>
          {eventsCardLoading ? (
            <>
              <Col className="col" md={6} lg={4}>
                <EventCardLoader />
              </Col>
              <Col className="col" md={6} lg={4}>
                <EventCardLoader />
              </Col>
              <Col className="col" md={6} lg={4}>
                <EventCardLoader />
              </Col>
            </>
          ) : (
            eventsData?.length > 0 &&
            eventsData?.map((event, index) => {
              return (
                <Col className="col" key={index} md={6} lg={4}>
                  <EventCard key={index} event={event} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </Wrapper>
  );
}

export default Events;

const Wrapper = styled.div`
  .icon {
    vertical-align: text-bottom;
    margin-right: 5px;
    margin-bottom: 1px;
  }
  .container {
    margin: 25px 0;
    padding-left: 0 !important;
    padding-right: 0 !important;
    &.container-events {
      margin: 0;
    }
  }
  .col {
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  padding: 25px 0;
  display: flex;
  justify-content: start;
  font-weight: 600;
  opacity: 0.7;
  &.back-text {
    display: inline;
    padding: 0;
    cursor: pointer;
  }
`;
