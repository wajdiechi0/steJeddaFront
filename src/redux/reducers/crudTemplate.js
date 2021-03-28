export default function (state={},action) {
    switch (action.type) {
        case 'uploadTemplateDetails': return {...state,uploadTemplateDetailsResult:action.payload}
        case 'uploadTemplateImage': return {...state,uploadTemplateImageResult:action.payload}
        case 'uploadTemplateFile': return {...state,uploadTemplateFileResult:action.payload}
        case 'templateList': return {...state,templateList:action.payload}
        case 'updateTemplate': return {...state,updateTemplate:action.payload}
        case 'deleteTemplate': return {...state,deleteTemplate:action.payload}
        case 'addToCart': return {...state,addToCart:action.payload}
        case 'deleteFromCart': return {...state,deleteFromCart:action.payload}
        case 'fetchCart': return {...state,fetchCart:action.payload}
        case 'clearCart': return {...state,clearCart:action.payload}
        case 'createOrder': return {...state,createOrder:action.payload}
        case 'fetchOrders': return {...state,fetchOrders:action.payload}
        case 'fetchAllOrders': return {...state,fetchAllOrders:action.payload}
        case 'cancelOrder': return {...state,cancelOrder:action.payload}
        case 'markAsPaidOrder': return {...state,markAsPaidOrder:action.payload}
        case 'fetchMyTemplates': return {...state,fetchMyTemplates:action.payload}
        case 'fetchOrderDetails': return {...state,fetchOrderDetails:action.payload}
        case 'ordersPerDay': return {...state,ordersPerDay:action.payload}
        case 'ordersPerMonth': return {...state,ordersPerMonth:action.payload}
        case 'getTotalOrdersN': return {...state,getTotalOrdersN:action.payload}
        default: return state;
    }
}