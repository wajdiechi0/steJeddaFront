import React from "react";


import "bootswatch/dist/lux/bootstrap.css";

const Layout = ({ title, description, children }) => {
  return (
    <div>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
