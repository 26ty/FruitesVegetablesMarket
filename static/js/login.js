$(document).ready(function(){
    $("input").keypress(function(e){
        code = (e.keycode ? e.keycode : e.which);
        if(code == 13){
            $("#login-btn").click()
        }
    });//(7/29)

    $("#login-btn").click(function(e){
        if($("#userId").val() == "" || $("#Password").val() == ""){
            //alert("使用者帳號與密碼不能為空")
            $.confirm({
                title: '錯誤！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '使用者帳號與密碼不能為空！',
                buttons: {
                    確認: {
                        btnClass: 'btn-success',
                        action: function() {
                            
                        }
                    }
                }
            })
        }else{
            $.ajax({
                type:"POST",
                url:"/login?userId=" + $("#userId").val() + "&Password=" + $("#Password").val(),
                success: function(error){
                    if(error == "帳號或密碼錯誤"){
                        $(".error-text").html(error),//改<span>裡的文字
                        alert(error),
                        $("#userId").val(""),
                        $("#Password").val("")
                    }else if(error != "帳號或密碼錯誤"){
                        //location.href = "/",//登入成功跳回首頁
                        //alert("登入成功")
                        $.confirm({
                            title: '成功！',
                            //animation: 'zoom',
                            //closeAnimation: 'scale',
                            content: '登入成功！',
                            buttons: {
                                確認: {
                                    btnClass: 'btn-success',
                                    action: function() {
                                        //alert('已確認');
                                        location.href = "/"
                                        
                                    }
                                }
                            }
                        })
                        
                    }
                }
            });
        }
        
    });
});