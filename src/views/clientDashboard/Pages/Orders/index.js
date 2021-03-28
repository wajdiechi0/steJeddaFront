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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { fetchOrders } from "../../../../redux/actions";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

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
              <TableCell style={{ fontWeight: "bold" }}>Templates</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <FormControl style={{ minWidth: 120 }}>
                    <Select >
                      {row.templates.map((template) => (
                        <MenuItem  key={template.id}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudTemplate.fetchOrders && prevProps !== this.props) {
      let result = this.props.crudTemplate.fetchOrders;
      if (result) {
        let orders = result.data;
        for (let i = 0; i < orders.length; i++) {
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
        this.props.crudTemplate.fetchOrders = null;
      }
    }
  }
  componentDidMount() {
    this.props.dispatch(
      fetchOrders(JSON.parse(localStorage.getItem("user")).id)
    );
    document.title = "Orders";
  }
}

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(Orders);
