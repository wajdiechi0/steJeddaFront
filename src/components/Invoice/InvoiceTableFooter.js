import React,{Fragment} from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "80%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ items }) => {
  const total = items
    .map((item) => item.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <Fragment>

    <View style={styles.row}>
      <Text style={styles.description}>Sub Total</Text>
      <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>VAT rate</Text>
      <Text style={styles.total}>7%</Text>
    </View>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>{((Number.parseFloat(total))*1.07).toFixed(2)}</Text>
      </View>
    </Fragment>
  );
};

export default InvoiceTableFooter;
