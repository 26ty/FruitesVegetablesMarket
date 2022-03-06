$(document).ready(function(){
    $("#output-btn").click(function(e){
        if($("#productName").val() == "" || $("#productPrice").val() == "" ||$("#introduction").val() ==""){
            //alert("未填寫商品資訊")
            $.confirm({
                title: '錯誤！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '未填寫商品資訊',
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
                url:"/creatProduct?productName=" + $("#productName").val() + "&productPrice=" + $("#productPrice").val() + "&introduction=" + $("#introduction").val() + "&productImg=" + $("#prodcutImg").val(),
                success: function(response){
                    $("#productName").val(""),
                    $("#productPrice").val(""),
                    $("#productImg").val(""),
                    $("#introduction").val(""),
                    
                    //alert("建立成功")
                    $.confirm({
                        title: '成功！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '建立成功，去看看你建立的商品!',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                    location.href = "/all"
                                }
                            }
                        }
                    })
                    
                }
                
            });
        }
    })
});