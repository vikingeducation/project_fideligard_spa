import React from "react";
import PropTypes from "prop-types";
import Showable from "./Showable";

const JumbotronFluid = ({ heading, lead }) => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container-fluid">
      <Showable show={!!heading}>
        <p className="display-3">{heading}</p>
      </Showable>
      <Showable show={!!lead}>
        <p className="lead">{lead}</p>
      </Showable>
    </div>
  </div>
);

JumbotronFluid.propTypes = {
  heading: PropTypes.string,
  lead: PropTypes.string
};

export default JumbotronFluid;
