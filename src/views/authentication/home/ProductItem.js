import React, { useState } from "react";
import { formatNumber } from "./../../clientDashboard/Pages/Cart/helpers/utils";
import TemplateDetails from "./TemplateDetails";
const TemplateItem = (props) => {
  const template = props.template;
  const [templateDetailsOpen, setTemplateDetailsOpen] = useState(false);
  return (
    <div className="card card-body" style={{ marginBottom: "10px" }}>
      <img
        style={{ display: "block", margin: "0 auto 10px", maxHeight: "200px" }}
        className="img-fluid"
        src={
          "http://localhost:8080/api/template/loadtemplateimage?img=" +
          template.img
        }
        alt=""
      />
      <p>{template.name}</p>
      <h3 className="text-left">{formatNumber(template.price)}</h3>
      <div className="text-right">
        <button
          onClick={() => {
            setTemplateDetailsOpen(true);
          }}
          className="btn btn-link btn-sm mr-2"
        >
          Details
        </button>
        <a href="/signin">
          <button className="btn btn-primary btn-sm">Buy now</button>
        </a>
      </div>

      <TemplateDetails
        open={templateDetailsOpen}
        close={() => {
          setTemplateDetailsOpen(false);
        }}
        template={template}
      />
    </div>
  );
};

export default TemplateItem;
