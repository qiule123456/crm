axios.defaults.baseURL = "http://127.0.0.1:8888";//配置基本请求路径

axios.defaults.withCredentials = true;//配置true后台请求都会带上cookie

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
};
//配置请求拦截器
axios.interceptors.request.use(config =>{
    return config
})
//配置响应拦截器
axios.interceptors.response.use(response =>{
    return response.data;
},reason=>{
    // console.log("----------------------")
    // console.log(reason)
    // console.log("----------------------")
    if (reason.response){
        switch (String(reason.response.status)){
            case"404":
            alert("请求地址不存在")
            break;
            default:
                break;
        }
    }
    return Promise.reject(reason);
}

)








