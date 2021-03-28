import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import OrderDone from "@material-ui/icons/Done";
import OrderNotDone from "@material-ui/icons/History";
import Cancel from "@material-ui/icons/Cancel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  fetchAllOrders,
  cancelOrder,
  markAsPaid,
  getUserEmail,
} from "../../../../redux/actions";
import CancelConfirmation from "./../../../authentication/components/DeleteConfirmation";
import MarkPaidConfirmation from "./../../../authentication/components/DeleteConfirmation";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      disabled: false,
      cancelConfirmationOpen: false,
      markPaidConfirmationOpen: false,
    };
  }

  cancelOrder = (id) => {
    this.setState({
      disabled: true,
    });
    this.props.dispatch(cancelOrder(id));
    window.location.reload();
  };
  markAsPaid = (id) => {
    this.setState({
      disabled: true,
    });
    this.props.dispatch(markAsPaid(id));
    window.location.reload();
  };
  render() {
    const style = {
      display: "flex",
      justifyContent: "center",
    };
    return (
      <div>
        <Typography variant="h4" style={style}>
          Order List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Order id</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Customer email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Templates</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <FormControl style={{ minWidth: 120 }}>
                    <Select defaultValue={"saddsa"}>
                      {row.templates.map((template) => (
                        <MenuItem value={template.name} key={template.id}>
                          {template.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {row.state === "waiting" ? (
                    <OrderNotDone />
                  ) : row.state === "paid" ? (
                    <OrderDone style={{ color: "green" }} />
                  ) : (
                    <Cancel style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "green",
                      fontWeight: "bold",
                    }}
                    disabled={this.state.disabled}
                    onClick={() => {
                      this.setState({
                        rowId: row.id,
                        markPaidConfirmationOpen: true,
                      });
                    }}
                  >
                    Mark as paid
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                    disabled={this.state.disabled}
                    onClick={() => {
                      this.setState({
                        rowId: row.id,
                        cancelConfirmationOpen: true,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </TableCell>

                <TableCell>
                  <Link href={"/invoice/" + row.id}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Download bill
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CancelConfirmation
          open={this.state.cancelConfirmationOpen}
          close={() => {
            this.setState({ cancelConfirmationOpen: false });
          }}
          function={() => {
            this.cancelOrder(this.state.rowId);
          }}
        />

        <MarkPaidConfirmation
          open={this.state.markPaidConfirmationOpen}
          close={() => {
            this.setState({ markPaidConfirmationOpen: false });
          }}
          function={() => {
            this.markAsPaid(this.state.rowId);
          }}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudTemplate.fetchAllOrders && prevProps !== this.props) {
      let result = this.props.crudTemplate.fetchAllOrders;
      const fetchOrders = async () => {
        if (result) {
          let orders = result.data;
          for (let i = 0; i < orders.length; i++) {
            let email = await getUserEmail(orders[i].id);
            orders[i].email = email.data;
            orders[i].date =
              orders[i].date.split("T")[0] +
              "  " +
              orders[i].date.split("T")[1].split(":")[0] +
              ":" +
              orders[i].date.split("T")[1].split(":")[1];
          }
          this.setState({
            orders: orders,
          });
          this.props.crudTemplate.fetchAllOrders = null;
        }
      };
      fetchOrders();
    }
    if (this.props.crudTemplate.cancelOrder && prevProps !== this.props) {
      let result = this.props.crudTemplate.cancelOrder;
      if (result) {
        if (result.code === 200) {
          window.location.reload();
        }
        this.props.crudTemplate.cancelOrder = null;
      }
    }
    if (this.props.crudTemplate.markAsPaidOrder && prevProps !== this.props) {
      let result = this.props.crudTemplate.markAsPaidOrder;
      if (result) {
        if (result.code === 200) {
          window.location.reload();
        }
        this.props.crudTemplate.markAsPaidOrder = null;
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchAllOrders());
    document.title = "Orders";
  }
}

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(Orders);
