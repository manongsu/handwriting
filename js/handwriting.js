/*画板执行函数*/
function handwriting(lineWidth,strokeStyle){
    var myCanvas = document.getElementById("handwriting");
    var handwriting = myCanvas.getContext('2d');
    var isDown = 0;
    function down(event,$this) {
        isDown = 1;
        var ev = event || window.event;
        var x0 = ev.clientX - $this[0].offsetLeft;
        var y0 = ev.clientY - $this[0].offsetTop;
        handwriting.beginPath();
        handwriting.moveTo(x0, y0)
    }
    function move(event,$this,isDown) {
        if(isDown==1){
            var ev = event || window.event;
            var x = ev.clientX - $this[0].offsetLeft;
            var y = ev.clientY - $this[0].offsetTop;
            draw(handwriting,x,y,lineWidth,strokeStyle);
        }else{

        }
    }
    function up() {
        isDown = 0;
    }
    function draw(cxt,x,y,lineWidth,strokeStyle) {
        /*根据坐标点画圆，容易出现断点*/
        /*cxt.fillStyle="#FF0000";
        cxt.beginPath();
        cxt.arc(x,y,4,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();*/
        /*画线，解决断点问题*/

        cxt.lineWidth = lineWidth;//线条的宽度
        cxt.strokeStyle = strokeStyle;//线条的颜色
        cxt.lineTo(x, y);//从x0,y0到x1,y1画一条线
        cxt.stroke();//画线

    }
    /*mouse事件*/
    $("#handwriting").mousedown(function (event) {
        down(event,$(this));
    });
    $("#handwriting").mousemove(function (event) {
        move(event,$(this),isDown)
    });
    $("*").mouseup(function () {
        up()
    });
    /*touch事件*/

}
/*画笔颜色*/
function setColor(penWidth,penColor) {
    $(".colorInput").change(function () {
        penColor = $(this)[0].value;
        handwriting(penWidth,penColor)
    });
}
/*画笔粗细*/
function setWidth(penWidth,penColor) {
    $(".widthInput").change(function () {
        penWidth = $(this).val();
        handwriting(penWidth,penColor)
    });
}
$(function () {
    setColor($(".widthInput").val(),$(".colorInput")[0].value);
    setWidth($(".widthInput").val(),$(".colorInput")[0].value);
    handwriting($(".widthInput").val(),$(".colorInput")[0].value)
})