import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "./../../../components/CustomButton";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import DeleteConfirmation from "./../../../components/DeleteConfirmation";

import { connect } from "react-redux";
import {
  fetchtTemplateList,
  deleteTemplate,
} from "./../../../../redux/actions";
import AddTemplate from "./components/AddTemplate/index.js";
import EditTemplate from "./components/EditTemplate/index.js";
class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateList: [],
      disabled: false,
      pageNumber: 1,
      editTemplate: {},
      template: null,
      editTemplateOpen: false,
      addTemplateOpen: false,
      rowId: 0,
      deleteConfirmationOpen: false,
    };
  }

  deleteTemplate(templateId) {
    this.props.dispatch(deleteTemplate(templateId));
  }

  style = {
    display: "flex",
    justifyContent: "center",
  };
  render() {
    return (
      <div>
        <Typography variant="h4" style={this.style}>
          Template List
        </Typography>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#9c27b0", color: "#fff" }}
            onClick={() => {
              this.setState({ addTemplateOpen: true });
            }}
          >
            Add a template
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>File</TableCell>
              <TableCell />
              <TableCell />
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
                      style={{ width: 300,resize: 'none' }}
                      aria-label="maximum height"
                      disabled
                      defaultValue={row.description}
                    />
                  </TableCell>
                  <TableCell>{row.price}$</TableCell>
                  <TableCell>
                    <a
                      href={
                        "http://localhost:8080/api/template/downloadtemplate?file=" +
                        row.file
                      }
                    >
                      {row.file}
                    </a>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        this.setState({
                          editTemplate: row,
                          editTemplateOpen: true,
                        });
                      }}
                    >
                      <CreateIcon style={{ color: "#0033cc" }} />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => {
                        this.setState({
                          rowId: row.id,
                          deleteConfirmationOpen: true,
                        });
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <AddTemplate
          open={this.state.addTemplateOpen}
          from={JSON.parse(localStorage.getItem("user")).type}
          close={() => {
            this.setState({ addTemplateOpen: false });
          }}
        />

        <EditTemplate
          open={this.state.editTemplateOpen}
          template={this.state.editTemplate}
          close={() => {
            this.setState({ editTemplateOpen: false });
          }}
        />

        <DeleteConfirmation
          open={this.state.deleteConfirmationOpen}
          close={() => {
            this.setState({ deleteConfirmationOpen: false });
          }}
          function={() => {
            this.deleteTemplate(this.state.rowId);
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    document.title = "Templates";
    this.props.dispatch(fetchtTemplateList());
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const fetchList = async () => {
      let result = this.props.crudTemplate.templateList;
      if (result && prevProps !== this.props) {
        if (result.code === 200) {
          this.setState({
            templateList: result.data.templates,
          });
        }
        this.props.crudTemplate.templateList = null;
      }
      result = this.props.crudTemplate.deleteTemplate;
      if (result && prevProps !== this.props) {
        if (result.code === 200) {
          location.reload();
        }
        this.props.crudTemplate.deleteTemplate = null;
      }
    };
    fetchList();
  }
}
function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(Templates);
