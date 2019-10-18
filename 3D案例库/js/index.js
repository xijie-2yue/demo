(function () {
    let oUl = document.querySelector("#main ul.item")
        ,aLi = oUl.children
        ,oCss = document.getElementById("css")
        ,oAlert = document.getElementById("alert")
        ,oAlertTitle = document.querySelector("#alert .title span")
        ,oAlertImg = document.querySelector("#alert .img img")
        ,oAlertAuthor = document.querySelector("#alert .author span")
        ,oAlertInfo = document.querySelector("#alert .info span")
        ,oMain = document.getElementById("main")
        ,oApp = document.getElementById("app")
        ,oFrame = document.querySelector("#iframe iframe")
        ,oBack = document.getElementById("back")
    ;
    let num = 5*5*5;
    //效果集合
    let effect = {
        //层叠 Grid
        grid() {
            if (effect.grid.ifExecut) return;
            let css = '';
            [...aLi].forEach( (ele,i)=>{
                //每个Li的位置
                let tX = (i%25%5-2)*340
                    ,tY = (Math.floor(i%25/5)-2)*300
                    ,tZ = (2-Math.floor(i/25))*800;

                css += `#main ul.item.grid li:nth-child(${i+1}){transform:translate3d(${tX}px,${tY}px,${tZ}px) !important;}`;
            });
            oCss.innerHTML += css;
            effect.grid.ifExecut = true;
        }
        //螺旋 Helix
        ,helix() {
            if (effect.helix.ifExecut) return;
            let css = '';
            //圈数
            let ring = 4;
            [...aLi].forEach( (ele,i)=>{
                //每个Li的位置
                let tY = (i-((num-1)/2+1))*(6/4)*ring
                    ,tZ = 800;
                let rY = i*(ring*360)/num;

                css += `#main ul.item.helix li:nth-child(${i+1}){transform:rotateY(${rY}deg) translateZ(${tZ}px) translateY(${tY}px) !important;}`;
            });
            oCss.innerHTML += css;
            effect.helix.ifExecut = true;
        }
        //球形 Sphere
        ,sphere() {
            if (effect.sphere.ifExecut) return;
            let css = '';
            let arr = [1,5,9,13,15,19,20,15,13,9,5,1];
            [...aLi].forEach((ele,i)=>{

                //取得该li所在层数
                let {layer,which} = f(i);
                let roX = - layer*180/(arr.length-1)+90;
                let trZ = 700;
                let roY = 360/arr[layer]*which + layer*20;

                css += `#main ul.item.sphere li:nth-child(${i+1}){transform:rotateY(${roY}deg) rotateX(${roX}deg) translateZ(${trZ}px) !important;}`;
            });
            oCss.innerHTML += css;
            effect.sphere.ifExecut = true;
            //封装 获取layer层数和which每层第几个 的函数
            function f(i) {
                let sum = 0;
                let result = {};
                for (let j=0;j<arr.length;j++) {
                    sum += arr[j];
                    if (sum > i) {
                        result.layer = j;
                        result.which = arr[j]-(sum-i);
                        return result;
                    }
                }
            }
        }
        //元素周期表 Table
        ,table() {
            if (effect.table.ifExecut) return;
            let css = '';
            //中心点
            let midY = Math.ceil(num/18)/2+2-1.5
                ,midX = 18/2-0.5;
            let coord = [
                {x:0,y:0}
                ,{x:17,y:0}
                ,{x:0,y:1}
                ,{x:1,y:1}
                ,{x:12,y:1}
                ,{x:13,y:1}
                ,{x:14,y:1}
                ,{x:15,y:1}
                ,{x:16,y:1}
                ,{x:17,y:1}
                ,{x:0,y:2}
                ,{x:1,y:2}
                ,{x:12,y:2}
                ,{x:13,y:2}
                ,{x:14,y:2}
                ,{x:15,y:2}
                ,{x:16,y:2}
                ,{x:17,y:2}
            ];
            [...aLi].forEach( (ele,i)=>{

                let x = i<18?coord[i].x:i%18
                    ,y = i<18?coord[i].y:Math.floor(i/18)+2;

                let tX = (x-midX)*170
                    ,tY = (y-midY)*210;

                css += `#main ul.item.table li:nth-child(${i+1}){transform:translate(${tX}px) translateY(${tY}px) !important;}`;
            });
            oCss.innerHTML += css;
            effect.table.ifExecut = true;
        }
    };
    //初始布局 生成Li
    (function () {
        //建立文档碎片
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < num; i++) {
            let ranX = Math.floor(Math.random()*6000-3000)
                ,ranY = Math.floor(Math.random()*6000-3000)
                ,ranZ = Math.floor(Math.random()*10000-5000);

            //li的数据
            let theData = data[i] || {
                title : 'Title'
                ,author : '细界'
                ,time : '????-??-??'
                ,topic : '待添加'
                ,dec : '待添加'
                ,img : 'img/wait.jpg'
            };
            //创建li标签
            let oLi = document.createElement('li');
            oLi.innerHTML = `
                <p class="title">${theData.title}</p>
                <p class="author">${theData.author}</p>
                <p class="time">${theData.time}</p>`;
            oLi.style.transform = `translate3d(${ranX}px,${ranY}px,${ranZ}px)`;

            //创建li的点击事件
            oLi.onclick = function(e) {
                //防止冒泡
                e.stopPropagation()
                //给弹窗层添加内容
                oAlertTitle.innerHTML = theData.topic;
                oAlertImg.src = theData.img;
                oAlertAuthor.innerHTML = `作者：${theData.author}`;
                oAlertInfo.innerHTML = theData.dec;

                //显示弹窗层
                oAlert.style.transition = '0s';
                oAlert.style.transform = 'scale(2)';
                oAlert.style.opacity = '1';
                oAlert.offsetLeft; //重绘
                oAlert.style.transition = '.3s';
                oAlert.style.transform = 'scale(1)';

                //点击弹窗层的事件
                oAlert.onclick = function (e) {
                    e.stopPropagation();
                    if ( theData.src ) {
                        oApp.classList.add('right');
                        oFrame.src = theData.src;
                    }
                }
            };

            //将新li存入文档碎片
            fragment.appendChild(oLi);
        }
        oUl.appendChild(fragment);
        oUl.offsetLeft;//重绘
        //初始布局改成 grid
        oUl.className = 'item grid';
        effect.grid();
    })();
    //弹窗层的隐藏
    (function () {
        oMain.onclick = hide;
        document.onkeydown = function (e) {
            if (e.keyCode === 27) {
                if (oAlert.style.opacity === '0') return;
                //隐藏动画
                oAlert.style.transition = '.8s';
                oAlert.style.transform = 'scale(0) rotateY(270deg)';
                oAlert.style.opacity = '0';
            }
        };
        function hide() {
            if (oAlert.style.opacity === '0') return;
            //隐藏动画
            oAlert.style.transition = '.8s';
            oAlert.style.transform = 'scale(0) rotateY(270deg)';
            oAlert.style.opacity = '0';
        };
    })();
    //back点击
    (function () {
        oBack.onclick = function () {
            oApp.classList.remove('right');
        }
    })();
    //鼠标拖拽和滚轮滑动放大缩小
    (function () {

        let lastX,lastY  //初始的位置
            ,nowX,nowY  //移动到的位置
            ,moveX=0,moveY=0 //位置变化量
            ,timer = null;

        let rY = 0
            ,rX = 0
            ,tZ = -2000;

        //鼠标滑动事件
        document.onmousedown = function (e) {

            //停止可能还没结束的动画
            cancelAnimationFrame(timer);

            //获取的初始位置
            lastX = e.pageX;
            lastY = e.pageY;

            this.onmousemove = function (e) {

                //鼠标移动后的位置
                nowX = e.pageX;
                nowY = e.pageY;
                //元素位置的变化量
                moveX = nowX - lastX;
                moveY = nowY - lastY;
                //元素的变化后的位置
                rY += moveX/10;
                rX -= moveY/10;
                //重置鼠标的初始位置
                lastX = nowX;
                lastY = nowY;

                oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
            }
        };
        document.onmouseup = function () {
            this.onmousemove = null;
            //惯性
            !function m() {
                moveX *= 0.95;
                moveY *= 0.95;
                if (Math.abs(moveX) <= 0.5) moveX = 0.5;
                if (Math.abs(moveY) <= 0.5) moveY = 0.5;
                rY += moveX/5;
                rX -= moveY/5;
                oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                if ( moveX===0.5 && moveY===0.5 ) return;
                timer = requestAnimationFrame(m);
            }();
        };

        //滚轮滚动事件
        wheel(document,function (e,d) {
            //元素初始的位置
            let sTrZ = tZ;
            //元素变化有的位置
            tZ = sTrZ + d*100;
            //tZ的最大最小值
            tZ = Math.min(tZ,0);
            tZ = Math.max(tZ,-4000);
            oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
        });
        /*
        @params
            * dom对象
            * 事件函数
                第一个形参是事件对象e
                第二个形参代表方位
        @return
            * undefined
         */
        function wheel(ele,fun) {
            if (document.createElement("div").onmousewheel === null) {
                //标准浏览器   e.wheelDelta 上滑+120 ，下滑-120
                ele.addEventListener('mousewheel',function (e) {
                    var d = Math.floor(e.wheelDelta/120);
                    fun.call(this,e,d);
                });
            }else{
                //火狐浏览器   e.delta 上滑-3 ，下滑+3
                ele.addEventListener('DOMMouseScroll',function (e) {
                    var d = -e.delta/3;
                    fun.call(this,e,d);
                });
            }
        };
    })();
    //左下按钮的点击
    (function () {

        let aBtn = document.querySelectorAll("#main ul.btn li");
        let effArr = ['table','sphere','helix','grid'];
        aBtn.forEach((ele,i)=>{
            ele.onclick = function () {
                let name = effArr[i];
                oUl.className = 'item ' + name;
                effect[ name ]();
            };
        })

    })();
})();