$(document).ready(function(){
    
    $("#buynow-btn").click(function(e){
        $.ajax({
            type:"GET",
            url:"/item?id=" + $("#id").val(),
            success: function(response){
                
                
            }
        });
    });

    //$(".buynow-btn").on('click', function () {
      //  console.log($(this).prop("value"))
    //});
    //1.
    $(".buynow-btn").on("click", function () {
        //$.ajax({
            //type:"GET",
            //url:"/item?id=" + $(this).prop("value"),//顯示不同的id(流水號 )
            //success: function(response){

                location.href="/item?id="+$(this).prop("value")//跳轉頁面
                
            //}
        //});
    });
});