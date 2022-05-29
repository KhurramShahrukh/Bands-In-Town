import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

// Local imports
import { searchArtistService } from "../../API/Services";
import { AppContext } from "../../Contexts/AppContext";
import ArtistCard from "./ArtistCard";
import ArtistCardLoader from "./ArtistCardLoader";

function Search() {
  const { searchedArtistName, setSearchedArtistName } = useContext(AppContext); // useContext hook to get the app state from the AppContext

  // Local States
  const [searchValue, setSearchValue] = React.useState(
    sessionStorage.getItem("searchValue") || "" // Initialize searchValue to sessionStorage value or empty string
  );
  const [artistsData, setartistsData] = React.useState([]); // state for all artists data
  const [artistsDataLoading, setArtistsDataLoading] = React.useState(false); // State to track loading status of artists data
  const [apiErrorMsg, setApiErrorMsg] = React.useState(""); // State to track error message from API call

  const inputFieldChangeHandler = (event) => {
    if (event.target.value === "") {
      resetStates(); // Reset states function called if search value is empty
    }
    setSearchValue(event.target.value);
    sessionStorage.setItem("searchValue", event.target.value); // store value in sessionStorage to persist the search value on refresh
  };

  const resetStates = () => {
    // reset states to initial values
    setartistsData([]);
    setArtistsDataLoading(false);
    setSearchedArtistName("");
    setApiErrorMsg("");
  };

  const searchArtistHandler = (e) => {
    if (e.key === "Enter") {
      setSearchedArtistName(searchValue); // update previous searched value
      setArtistsDataLoading(true);
      searchArtistService(searchValue)
        .then((res) => {
          setartistsData([res.data]);
          setArtistsDataLoading(false);
          setApiErrorMsg(""); // reset error message
        })
        .catch((err) => {
          setApiErrorMsg(err.message);
          setArtistsDataLoading(false);
        });
    }
  };

  useEffect(() => {
    // this is called when the component is mounted
    const searchArtistState = sessionStorage.getItem("searchValue"); // get the search value from sessionStorage
    if (searchArtistState?.length > 0) {
      // if the search value is not empty
      setSearchedArtistName(searchArtistState); // update previous searched value
      setArtistsDataLoading(true);
      searchArtistService(searchArtistState)
        .then((res) => {
          // search for the artist
          setartistsData([res.data]);
          setArtistsDataLoading(false);
          setApiErrorMsg(""); // reset error message
        })
        .catch((err) => {
          setApiErrorMsg(err.message);
          setArtistsDataLoading(false);
        });
    } else {
      resetStates(); // reset states function called if search value is empty
    }
  }, []);

  return (
    <Wrapper>
      <div className="input-field-icon">
        <input
          className="input-field"
          placeholder="Search artist"
          value={searchValue}
          onChange={inputFieldChangeHandler}
          onKeyDown={searchArtistHandler}
        />
        <IoIosSearch className="icon" />
      </div>
      {searchValue === "" ? (
        <></>
      ) : (
        <>
          {artistsDataLoading ? (
            <Text className="text-style">{`Fetching results for "${searchValue}"...`}</Text>
          ) : artistsData[0] === "" ? (
            <Text className="text-style">{`No Result found for "${searchedArtistName}"`}</Text>
          ) : (
            searchedArtistName?.length > 0 &&
            apiErrorMsg === "" && (
              <Text className="text-style">{`${artistsData?.length} Result(s) found for "${searchedArtistName}"`}</Text>
            )
          )}
          {!artistsDataLoading && apiErrorMsg !== "" && (
            <Text className="text-style">{`Something went wrong. Please try again.`}</Text>
          )}
          <Container className="container" fluid>
            <Row justify="start" gutterWidth={10}>
              {artistsDataLoading ? (
                <>
                  <Col className="col" md={6} lg={4}>
                    <ArtistCardLoader />
                  </Col>
                  <Col className="col" md={6} lg={4}>
                    <ArtistCardLoader />
                  </Col>
                  <Col className="col" md={6} lg={4}>
                    <ArtistCardLoader />
                  </Col>
                </>
              ) : (
                artistsData[0] !== "" &&
                artistsData?.length > 0 &&
                artistsData?.map((artist, index) => {
                  return (
                    <Col className="col" md={6} lg={4} key={index}>
                      <ArtistCard artist={artist} />
                    </Col>
                  );
                })
              )}
            </Row>
          </Container>
        </>
      )}
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  .input-field-icon {
    position: relative;
    .input-field {
      width: 100%;
      padding: 15px 0px;
      text-indent: 20px;
      font-weight: 600;
      font-size: 14px;
      opacity: 0.6;
      border: none;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05);
      &:focus {
        outline: none;
      }
    }
    .icon {
      position: absolute;
      right: 15px;
      top: 10px;
      width: 25px;
      height: 25px;
      color: grey;
      opacity: 0.8;
    }
  }
  .container {
    margin-bottom: 15px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .col {
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  margin: 4em 0 2em 0;
  display: flex;
  justify-content: start;
  font-weight: 600;
  opacity: 0.7;
`;
