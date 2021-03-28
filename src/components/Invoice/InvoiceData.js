export function getInvoiceData(orderDetails) {
  const invoice = {
    id: orderDetails.id,
    invoice_no: orderDetails.id,
    balance: "$2,283.74",
    company: "MANTRIX",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: orderDetails.date.split("T")[0],
    items: orderDetails.templates,
  };
  return invoice;
}
