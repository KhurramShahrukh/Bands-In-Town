import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const ArtistCardLoader = (props) => {
  const [mQuery, setMQuery] = useState(window.innerWidth > 768 ? true : false);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setMQuery(window.innerWidth > 768 ? true : false);
    });
    // this is the cleanup function to remove the listener
    return () =>
      window.removeEventListener("resize", function (event) {
        setMQuery(window.innerWidth > 768 ? true : false);
      });
  }, []);

  return (
    <ContentLoader
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
      }}
      speed={2}
      width={"100%"}
      height={mQuery ? 100 : 160}
      backgroundColor="#e4e7e7"
      foregroundColor="#ffffff"
      {...props}
    >
      {mQuery ? (
        <>
          <rect x="90" y="35" rx="5" ry="5" width="30%" height="10" />
          <rect x="90" y="55" rx="5" ry="5" width="50%" height="10" />
          <circle cx="50" cy="50" r="35" />
        </>
      ) : (
        <>
          <circle cx="50%" cy="50" r="40" />
          <rect x="35%" y="100" rx="5" ry="5" width="30%" height="10" />
          <rect x="25%" y="120" rx="5" ry="5" width="50%" height="10" />
        </>
      )}
    </ContentLoader>
  );
};

export default ArtistCardLoader;
