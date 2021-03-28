import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getUserList } from "../../../../redux/actions";
class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
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
          Customer List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.getUserList && prevProps !== this.props) {
      let result = this.props.crudUser.getUserList;
      if (result) {
        if (result.code === 200) {
          this.setState({
            userList: result.data,
          });
        }
        this.props.crudUser.getUserList = null;
      }
    }
  }

  componentDidMount() {
    document.title = "Customers";
    this.props.dispatch(getUserList());
  }
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudUser,
  };
}
export default connect(mapStateToProps)(Customers);
