import React from "react";
import ContentLoader from "react-content-loader";

const EventCardLoader = (props) => (
  <ContentLoader
    style={{
      backgroundColor: "#ffffff",
      boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
    }}
    speed={2}
    width={"100%"}
    height={200}
    backgroundColor="#e4e7e7"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="10%" y="25" rx="5" ry="5" width="35%" height="20" />
    <rect x="10%" y="70" rx="5" ry="5" width="25%" height="15" />
    <rect x="10%" y="95" rx="5" ry="5" width="25%" height="15" />
    <rect x="50%" y="70" rx="5" ry="5" width="25%" height="15" />
    <rect x="50%" y="95" rx="5" ry="5" width="25%" height="15" />
    <rect x="10%" y="135" rx="5" ry="5" width="25%" height="15" />
    <rect x="10%" y="160" rx="5" ry="5" width="25%" height="15" />
    <rect x="50%" y="135" rx="5" ry="5" width="25%" height="15" />
    <rect x="50%" y="160" rx="5" ry="5" width="25%" height="15" />
  </ContentLoader>
);

export default EventCardLoader;
