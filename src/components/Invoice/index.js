import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Main";
import { getInvoiceData } from "./InvoiceData";
import { withRouter } from "react-router-dom";
import { fetchOrderDetails } from "./../../redux/actions";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  document.title = "Invoice";
  let { id } = useParams();
  const [invoice, changeInvoice] = useState(null);
  useEffect(() => {
    props.dispatch(fetchOrderDetails(id));
  }, []);
  useEffect(() => {
    if (props.crudTemplate.fetchOrderDetails) {
      let result = props.crudTemplate.fetchOrderDetails;
      if (result) {
        if (result.code === 200) {
          changeInvoice(getInvoiceData(result.data))
        }
        props.crudTemplate.fetchOrderDetails = null;
      }
    }
  }, [props.crudTemplate.fetchOrderDetails]);
  if (invoice) {
    return (
      <Fragment>
        <PDFViewer
          width={window.innerWidth}
          height={window.innerHeight}
          className="app"
        >
          <Invoice invoice={invoice} />
        </PDFViewer>
      </Fragment>
    );
  } else {
    return <div />;
  }
}
function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(withRouter(App));
