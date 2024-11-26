import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "react-simple-tooltip";

function ArtistCard(props) {
  const history = useHistory();
  const { artist } = props;
  const fbUrl = artist?.facebook_page_url?.split("www.")[1];

  const artistCardClickHandler = () => {
    history.push(`/events`);
  };

  const fbLinkClickHandler = (e) => {
    e.stopPropagation();
    window.open(artist?.facebook_page_url, "_blank");
  };

  return (
    <Wrapper onClick={artistCardClickHandler}>
      <img src={artist?.image_url} className="img-style" />
      <div className="card-details">
        <Tooltip color="#f5f5f5" content={artist?.name || ""}>
          <div className="artist-name">{artist?.name}</div>
        </Tooltip>
        <div className="fb-url" onClick={fbLinkClickHandler}>
          {fbUrl}
        </div>
      </div>
    </Wrapper>
  );
}

export default ArtistCard;

const Wrapper = styled.div`
  height: 80px;
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05);
  // Medium devices (landscape tablets, 768px and below)
  @media only screen and (max-width: 768px) {
    height: 160px;
    flex-direction: column;
  }
  .img-style {
    background-image: url(artist?.thumb_url);
    width: 60px;
    height: 60px;
    background-size: contain;
    background-position: center;
    border-radius: 50%;
    // Medium devices (landscape tablets, 768px and below)
    @media only screen and (max-width: 768px) {
      width: 80px;
      height: 80px;
      margin-top: 5px;
    }
  }
  .card-details {
    margin-left: 10px;
    opacity: 0.7;
    // Medium devices (landscape tablets, 768px and below)
    @media only screen and (max-width: 768px) {
      margin-left: 0;
      text-align: center;
    }
    .artist-name {
      font-size: 16px;
      font-weight: 600;
      width: 100%;
      height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      // Medium devices (landscape tablets, 768px and below)
      @media only screen and (max-width: 768px) {
        padding: 15px 0 5px 0;
      }
    }
    .fb-url {
      width: 100%;
      height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`;
