/*
$(document).ready(function(){

    $("#register").click(function(e){
        if($("#userName").val() == "" || $("#userId").val() == "" || $("#Password").val() == "")
        {

        }else if($("#userId").val() == $("#Password").val()){
            $.confirm({
                title:'錯誤!',
                animation:'zoom',
                closeAnimation:'scale',
                content:'帳號與密碼不得相同!',
                buttons:{
                    確認:{
                        btnClass:'btn-success',
                                action:function(){
                                    $("#userName").val("")
                                    $("#userPassword").val("")
                                }
                        }
                    }
            })
        }else{
            data={
                userId:$("#userId").val(),
                Password:$("#Password").val(),
                userName:$("#userName").val()
            }
            $.ajax({
                type:"POST",
                url:"/register?userId=" + $("#userId").val() + "&Password=" + $("#Password").val() + "&userName=" + $("#userName").val() + "&permission=" + $("#permission").val(),//導回資料庫
                data:JSON.stringify(data),
                async:false,//同步非同步
                contentType:"application/json",
                datatype:JSON, 
                success:function(data_0){

                    if(data_0.code == "001"){
                        data_2={
                            userId:$("#userId").val(),
                            type:"1"
                        }
                        $.ajax({
                            type:"POST",
                            url:"/register?userId=" + $("#userId").val() + "&Password=" + $("#Password").val() + "&userName=" + $("#userName").val() + "&permission=" + $("#permission").val(),//導回資料庫
                            data:JSON.stringify(data_2),
                            async:false,//同步非同步
                            contentType:"application/json",
                            datatype:JSON,
                            success:function(data_5){
                                $.confirm({
                                    title:'成功',
                                    animation:'zoom',
                                    closeAnimation:'scale',
                                    content:'請去信箱驗證會員',
                                    button:{
                                        確認:{
                                            btnClass:'btn-success',
                                            action:function(){
                                                location.href = "/"
                                            }
                                        }
                                    }
                                })
                            }
                        });
                    }else if(data_0.code=="005"){
                        $.confirm({
                            title:'錯誤',
                            animation:'zoom',
                            closeAnimation:'該帳號已被註冊',
                            button:{
                                確認:{
                                    btnClass:'btn-success',
                                    action:function(){
                                        $("#userId").val("")
                                    }
                                }
                            }
                        })
                    }else if(data_0.code == "0041"){
                        $.confirm({
                            title:'錯誤',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            content:'姓名未填',
                            button:{
                                確認:{
                                    btnClass:'btn-success',
                                    action:function(){
                                    }
                                }
                            }
                        })
                    }else if(data_0.code=="0042"){
                        $.confirm({
                            title:'錯誤',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            content:'帳號未填',
                            button:{
                                確認:{
                                    btnClass:'btn-success',
                                    action:function(){
                                    }
                                }
                            }
                        })
                    }else if(data_0=="0043"){
                        $.confirm({
                            title: '錯誤！',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            content: '密碼未填！',
                            buttons: {
                                確認: {
                                    btnClass: 'btn-success',
                                    action: function() {
                                    }
                                }
                            }
                        })
                    }else{
                        $.confirm({
                            title: '錯誤！',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            content: '發生未知錯誤，請稍後再試！',
                            buttons: {
                                確認: {
                                    btnClass: 'btn-success',
                                    action: function() {
                                    }
                                }
                            }
                        })
                    }
                }
            });
        }
    });

});*/

$(document).ready(function () {
    $("input").keypress(function(e){
        code = (e.keycode ? e.keycode : e.which);
        if(code == 13){
            $("#register-btn").click()
        }
    });//按enter直接跳轉頁面

    $("#register-btn").click(function (e) {
        if($("#userName").val() == "" || $("#userId").val() == "" || $("#Password").val() == ""){
            //alert("請輸入使用者名稱、帳號及密碼!")
            $.confirm({
                title: '錯誤！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '請輸入使用者名稱、帳號及密碼!',
                buttons: {
                    確認: {
                        btnClass: 'btn-success',
                        action: function() {
                        }
                    }
                }
            })
        }else if($("#userId").val() == $("#Password").val()){
            alert("帳號與密碼不得相同!")
            $("#userId").val("")//清空帳號
            $("#Password").val("")//清空密碼
        }else{
            $.ajax({
                type: "POST",
                url: "/register?userId=" + $("#userId").val() + "&Password=" + $("#Password").val() + "&userName=" + $("#userName").val() + "&permission=" + $("#permission").val(),
                success: function (response) {
                    $(".text-account").html("成功！"),
                    $("#userName").val(""),//清除值
                    $("#userId").val(""),
                    $("#Password").val(""),
                    //location.href = "/login",//跳回登入頁面
                    //alert("註冊成功，立即登入")
                    $.confirm({
                        title: '成功！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '註冊成功，立即登入',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                    location.href = "/login"
                                    
                                }
                            }
                        }
                    })
                    
                }
                
            });
            
        }
        
    });
});
