import React from "react";
class NotFoundComponent extends React.Component {

  render() {
    return (
      <div > <h1>404 not found</h1>
      </div>
    );
  }

  componentDidMount() {
    document.title = "404";
  }
}


export default NotFoundComponent;
