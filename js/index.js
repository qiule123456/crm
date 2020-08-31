$(function (){
    init();
    let $plan =$.Callbacks();///实现发布订阅
    $plan.add((_,baseInfo)=>{
        console.log(baseInfo)
        //渲染用户信息和实现退出登录
        $(".baseBox>span").html(`你好,${baseInfo.name || ''}`)
        //实现退出登录
        $(".baseBox>a").click(async function(){
            let result =await axios.get("/user/signout")
            if(result.code==0){
                window.location.href="login.html"
                return;
            }
            alert("网络不给力")
        })

    })
    $plan.add((power)=>{
        //渲染菜单
        console.log("渲染菜单：",power)
    })
    async function init() {
        let result = await axios.get("/user/login");
        // console.log(result)
        if (result.code !=0){
            alert("你还没登录，请先登录")
            window.location.href="login.html";
            return;
        }
        //代表你登录成功了
        let [power,baseInfo] =await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        // console.log(power)
        // console.log(baseInfo)
        baseInfo.code === 0 ? baseInfo=baseInfo.data : null
        $plan.fire(power,baseInfo)
    }
})





















