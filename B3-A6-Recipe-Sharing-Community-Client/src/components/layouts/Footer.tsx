import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <div className="p-5">
      <p>Copy rights reserved by Taste Tribe {date.getFullYear()}</p>
    </div>
  );
};

export default Footer;
