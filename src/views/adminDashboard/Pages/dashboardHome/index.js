import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import "./dashboard.css";
// core components
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import CardBody from "./Card/CardBody.js";
import { connect } from "react-redux";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import {
  getOrdersPerDay,
  getOrdersPerMonth,
  getTotalOrdersN
} from "./../../../../redux/actions";
import styles from "./dashboardStyle.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  const [ordersN, changeOrdersN] = useState("");
  const [ordersMonth, changeOrdersMonth] = useState([]);
  const [ordersDay, changeOrdersDay] = useState([]);
 
  useEffect(() => {
    document.title = "Home";
    props.dispatch(getOrdersPerDay());
    props.dispatch(getOrdersPerMonth());
    props.dispatch(getTotalOrdersN());
  }, []);
  useEffect(() => {
    if (props.crudTemplate.ordersPerDay) {
      changeOrdersDay(props.crudTemplate.ordersPerDay);
      props.crudTemplate.ordersPerDay = null;
    }
  }, [props.crudTemplate.ordersPerDay]);
  useEffect(() => {
    if (props.crudTemplate.ordersPerMonth) {
      changeOrdersMonth(props.crudTemplate.ordersPerMonth);
      props.crudTemplate.ordersPerMonth = null;
    }
  }, [props.crudTemplate.ordersPerMonth]);

  useEffect(() => {
    if (props.crudTemplate.getTotalOrdersN) {
      changeOrdersN(props.crudTemplate.getTotalOrdersN);
      props.crudTemplate.getTotalOrdersN = null;
    }
  }, [props.crudTemplate.getTotalOrdersN]);

  const ordersPerDay = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ],
    series: [ordersDay],
  };

  const ordersPerMonth = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [ordersMonth],
  };

  return (
    <div>
      <GridContainer>
          <GridItem xs={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <MonetizationOn />
                </CardIcon>
                <p className={classes.cardCategory}>Total Orders</p>
                <h3 className={classes.cardTitle}>{ordersN}</h3>
              </CardHeader>
            </Card>
          </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                data={ordersPerDay}
                type="Line"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Orders per day</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={ordersPerMonth}
                type="Line"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Orders per months</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}
export default connect(mapStateToProps)(Dashboard);
