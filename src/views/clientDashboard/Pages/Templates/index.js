import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { fetchMyTemplates } from "./../../../../redux/actions";
class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateList: [],
    };
  }

  style = {
    display: "flex",
    justifyContent: "center",
  };
  render() {
    return (
      <div>
        <Typography variant="h4" style={this.style}>
          My templates
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.templateList.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <img
                      width={50}
                      height={50}
                      src={
                        row.img &&
                        "http://localhost:8080/api/template/loadtemplateimage?img=" +
                          row.img
                      }
                      alt="SD"
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell style={{ width: 300 }}>
                    <TextareaAutosize
                      rowsMax={4}
                      style={{ width: 300, resize: "none" }}
                      aria-label="maximum height"
                      disabled
                      defaultValue={row.description}
                    />
                  </TableCell>
                  <TableCell>{row.price}$</TableCell>
                  <TableCell>
                    <Link
                      href={
                        "http://localhost:8080/api/template/downloadtemplate?file=" +
                        row.file
                      }
                    >
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
                        Download template
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  componentDidMount() {
    document.title = "Templates";
    this.props.dispatch(
      fetchMyTemplates(JSON.parse(localStorage.getItem("user")).id)
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let result = this.props.crudTemplate.fetchMyTemplates;
    if (result && prevProps !== this.props) {
      if (result.code === 200) {
        this.setState({
          templateList: result.data,
        });
        console.log(result.data);
      }
      this.props.crudTemplate.fetchMyTemplates = null;
    }
  }
}
function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(Templates);
