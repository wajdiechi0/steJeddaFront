import axios from "axios";
export async function login(email, password) {
  let result = await axios
    .post("http://localhost:8080/api/auth/signin", {
      email: email,
      password: password,
    })
    .then((response) => response.data);
  return {
    type: "login",
    payload: result,
  };
}

export async function register(email, password, name, birthdate, phone) {
  let result = await axios
    .post("http://localhost:8080/api/auth/signup", {
      email,
      password,
      phone,
      name,
      birthdate,
      role: "user",
    })
    .then((response) => response.data);
  return {
    type: "register",
    payload: result,
  };
}

export async function uploadTemplateDetails(name, description, price) {
  let result = await axios
    .post("http://localhost:8080/api/template/uploadtemplate", {
      name: name,
      description: description,
      price: price,
    })
    .then((response) => response.data);
  return {
    type: "uploadTemplateDetails",
    payload: result,
  };
}

export async function uploadTemplateImage(image, idTemplate) {
  let formData = new FormData();
  formData.append("image", image);

  let result = await axios
    .post(
      "http://localhost:8080/api/template/uploadtemplateimage?id=" + idTemplate,
      formData
    )
    .then((response) => response.data);
  return {
    type: "uploadTemplateImage",
    payload: result,
  };
}
export async function uploadTemplateFile(file, idTemplate) {
  let formData = new FormData();
  formData.append("file", file);
  let result = await axios
    .post(
      "http://localhost:8080/api/template/uploadtemplatefile?id=" + idTemplate,
      formData
    )
    .then((response) => response.data);
  return {
    type: "uploadTemplateFile",
    payload: result,
  };
}

export async function fetchtTemplateList() {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/fetchtemplatelist")
    .then((response) => response.data);
  return {
    type: "templateList",
    payload: result,
  };
}
export async function loadTemplateImage(img) {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/loadtemplateimage?img=" + img)
    .then((response) => response.data);
  return {
    type: "templateList",
    payload: result,
  };
}
export async function updateTemplate(id, name, description, price, file, img) {
  let updateResult;
  updateResult = await axios
    .post("http://localhost:8080/api/template/updatetemplate", {
      id,
      description,
      name,
      price,
    })
    .then((response) => response.data);
  if (file) {
    let formData = new FormData();
    formData.append("file", file);

    await axios
      .post(
        "http://localhost:8080/api/template/uploadtemplatefile?id=" + id,
        formData
      )
      .then((response) => response.data);
  }
  if (img) {
    let formData = new FormData();
    formData.append("image", img);

    await axios
      .post(
        "http://localhost:8080/api/template/uploadtemplateimage?id=" + id,
        formData
      )
      .then((response) => response.data);
  }
  return {
    type: "updateTemplate",
    payload: updateResult,
  };
}
export async function deleteTemplate(id) {
  let result = await axios
    .post("http://localhost:8080/api/template/deletetemplate", {
      id,
    })
    .then((response) => response.data);
  return {
    type: "deleteTemplate",
    payload: result,
  };
}

export async function addToCart(userId, templateId) {
  let result = await axios
    .post("http://localhost:8080/api/template/addtocart", {
      userId,
      templateId,
    })
    .then((response) => response.data);
  return {
    type: "addToCart",
    payload: result,
  };
}

export async function deleteFromCart(userId, templateId) {
  let result = await axios
    .post("http://localhost:8080/api/template/deletefromcart", {
      userId,
      templateId,
    })
    .then((response) => response.data);
  return {
    type: "deleteFromCart",
    payload: result,
  };
}
export async function clearCart(userId, templateId) {
  let result = await axios
    .post("http://localhost:8080/api/template/clearcart", {
      userId,
    })
    .then((response) => response.data);
  return {
    type: "clearCart",
    payload: result,
  };
}

export async function fetchCart(userId) {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/fetchcart?id=" + userId)
    .then((response) => response.data);
  return {
    type: "fetchCart",
    payload: result,
  };
}

export async function createOrder(userId,templates) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/createorder",{
      userId,
      templates
    })
    .then((response) => response.data);
  return {
    type: "createOrder",
    payload: result,
  };
}
export async function fetchOrders(userId) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/fetchorders",{
      userId,
    })
    .then((response) => response.data);
  return {
    type: "fetchOrders",
    payload: result,
  };
}

export async function fetchAllOrders() {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/fetchallorders")
    .then((response) => response.data);
  return {
    type: "fetchAllOrders",
    payload: result,
  };
}

export async function markAsPaid(orderId) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/markpaidorder",{
      orderId
    })
    .then((response) => response.data);
  return {
    type: "markAsPaidOrder",
    payload: result,
  };
}

export async function cancelOrder(orderId) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/cancelorder",{
      orderId
    })
    .then((response) => response.data);
  return {
    type: "cancelOrder",
    payload: result,
  };
}

export async function fetchMyTemplates(userId) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/fetchmytemplates",{
      userId
    })
    .then((response) => response.data);
  return {
    type: "fetchMyTemplates",
    payload: result,
  };
}

export async function fetchOrderDetails(orderId) {
  let result;
  result = await axios
    .post("http://localhost:8080/api/template/fetchorderdetails",{
      orderId
    })
    .then((response) => response.data);
  return {
    type: "fetchOrderDetails",
    payload: result,
  };
}
export async function getOrdersPerMonth() {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/orderspermonth")
    .then((response) => response.data);
  return {
    type: "ordersPerMonth",
    payload: result,
  };
}

export async function getOrdersPerDay() {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/ordersperday")
    .then((response) => response.data);

  return {
    type: "ordersPerDay",
    payload: result,
  };
}
export async function getTotalOrdersN() {
  let result;
  result = await axios
    .get("http://localhost:8080/api/template/totalOrders")
    .then((response) => response.data.data);
  return {
    type: "getTotalOrdersN",
    payload: result,
  };
}

export async function getUserEmail(id) {
  let result;
  result = await axios
    .get("http://localhost:8080/api/getuseremail?id="+id)
    .then((response) => response.data);
    return result;
}
export async function getUserList() {
  let result;
  result = await axios
    .get("http://localhost:8080/api/getuserlist")
    .then((response) => response.data);

  return {
    type: "getUserList",
    payload: result,
  };
}
