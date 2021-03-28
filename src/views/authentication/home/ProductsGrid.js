import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import styles from "./ProductsGrid.module.scss";
import { connect } from "react-redux";
import { fetchtTemplateList } from "./../../../redux/actions";
const TemplatesGrid = (props) => {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    props.dispatch(fetchtTemplateList());
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      let result = props.crudTemplate.templateList;
      if (result) {
        if (result.code === 200) {
          setTemplates(result.data.templates);
        }
        props.crudTemplate.templateList = null;
      }
    };
    fetchList();
  }, [props.crudTemplate.templateList]);
  return (
    <div className={styles.p__container}>
      <div className="row">
        <div className="col-sm-8">
          <div className="py-3">{templates.length} Templates</div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <input
              type="text"
              name=""
              placeholder="Search template"
              className="form-control"
              id=""
            />
          </div>
        </div>
      </div>
      <div className={styles.p__grid} >
        {templates.map((template) => (
          <ProductItem key={template.id} template={template} />
        ))}
      </div>
      <div className={styles.p__footer}></div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(TemplatesGrid);
