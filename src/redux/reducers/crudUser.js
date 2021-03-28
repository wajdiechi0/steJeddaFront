export default function (state={},action) {
    switch (action.type) {
        case 'getUserEmail': return {...state,getUserEmail:action.payload}
        case 'getUserList': return {...state,getUserList:action.payload}
        default: return state;
    }
}