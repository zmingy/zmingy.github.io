$(function () {
    //搜索切换
    (function () {
        var aLi = $("#menu li");
        var oText = $("#search").find(".form .text");
        var arrText = [
            "例如：山西征豪车消费税",
            "例如：医药代表30年：离开还是坚守",
            "例如：共享电动单车不符上牌标准 北京官方紧急叫停",
            "例如：张勇任江西统战部常务副部长",
            "例如：长江南京段附近3艘船失火 致4人死亡",
            "例如：新基因技术或让猛犸象复活 两年有望培养成功",
        ];

        var iNow = 0;
        oText.val(arrText[iNow]);

        aLi.each(function (index) {
            $(this).click(function () {
                //console.log(index);
                aLi.attr("class","gradient");
                $(this).attr("class","active");

                iNow = index
                oText.val(arrText[iNow]);
            });
        });
        oText.focus(function () {
            //console.log(arrText[iNow]);
            if($(this).val() == arrText[iNow]){
                $(this).val("");
            };
        });
        oText.blur(function () {
            if($(this).val() == ""){
                oText.val(arrText[iNow]);
            };
        });

    })();

    //update文字滚动
    (function (){
        var oDiv = $(".update");
        var oUl = oDiv.find("ul");
        var iH = 0;
        var arrData = [{"name":"萱萱","time":7,"title":"写了一篇新文章","url":"www.baidu.com"},
            {"name":"红红","time":13,"title":"多地养老金上调 快看你家乡涨了多少？","url":"www.baidu.com"},
            {"name":"可可","time":15,"title":"台湾看不起大陆 那只是夜郎自大 ","url":"www.baidu.com"},
            {"name":"莉莉","time":22,"title":"男子在ATM机上查余额 隔壁机器吐9300元现金","url":"www.baidu.com"}
        ];
        var str = "";
        var oBtnUp = $("#updateUpBtn");
        var oBtnDown = $("#updateDownBtn");
        var iNow = 0;
        var timer = null;

        for(var i=0;i<arrData.length;i++){
            str += "<li><a href="+arrData[i].url+"><strong>"+arrData[i].name+"</strong><span>"+arrData[i].time+"分钟前</span>"+arrData[i].title+"</a></li>";
            console.log(str);
        };
        oUl.html(str);
        iH = oUl.find("li").height();
        console.log(iH);

        oBtnUp.click(function () {
            doMove(-1);
        });
        oBtnDown.click(function () {
            doMove(1);
        });

        oDiv.hover(function () {
            clearInterval(timer);
        }, autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                doMove(-1);
            },1500);
        };
        autoPlay();

        function doMove(num) {
            iNow += num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow = 0;
            };
            if(iNow>0){
                iNow = -(arrData.length-1);
            };
            oUl.stop().animate({"top":iH*iNow},1000);
        }
    })();

    //options 选项卡切换
    (function () {
        fnTab($(".tabNav1"),$(".tabCon1"));
        fnTab($(".tabNav2"),$(".tabCon2"));

        function fnTab(oNav,aCon) {
            var aEle = oNav.children();
            aCon.hide().eq(0).show();

            aEle.each(function (index) {
                $(this).click(function () {
                    aEle.removeClass("active").addClass("gradient");
                    $(this).removeClass("gradient").addClass("active");
                    aEle.find("a").attr("class","triangle_down_red");
                    $(this).find("a").attr("class","triangle_down_gray");

                    aCon.hide().eq(index).show();
                });
            });
        };
    })();
    //自动播放的焦点图
    (function () {
        var oDiv = $("#fade");
        var aUlLi = oDiv.find("ul li");
        var aOlLi = oDiv.find("ol li");
        var oP = oDiv.find("p");
        var arr = ["爸爸去哪儿啦","大眼萌妹子","美女如云"];
        var iNow = 2;
        var timer = null;

        fnFade();

        aOlLi.click(function () {
            iNow = $(this).index();
            fnFade();
        });

        oDiv.hover(function () {
            clearInterval(timer)
        },autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                iNow++;
                iNow%=arr.length;
                fnFade();
            },2000)
        }
        autoPlay();

        function fnFade() {
            aUlLi.each(function (i) {
                if(i!=iNow){
                    aUlLi.eq(i).fadeOut().css("zIndex",1);
                    aOlLi.eq(i).removeClass("active");
                }else{
                    aUlLi.eq(i).fadeIn().css("zIndex",2);
                    aOlLi.eq(i).addClass("active");
                }
            });
            oP.text(arr[iNow]);
        }
    })();

    //日历提示说明
    (function () {
        var aSpan = $(".calendar h3 span");
        var aImg = $(".calendar .img");
        var oPrompt = $(".today_info");
        var oImg = oPrompt.find("img");
        var oStrong = oPrompt.find("strong");
        var oP = oPrompt.find("p");

        aImg.hover(function () {
            var iTop = $(this).parent().position().top()-30;
            var iLeft = $(this).parent().position().left()+55;
            var index = $(this).parent().index()%aSpan.size();

            //console.log($(this).parent().index()%aSpan.size());

            console.log(iTop);
            oPrompt.show().css({"left":iLeft,"top":iTop});
            oP.text($(this).attr("info"));
            oImg.attr("src",$(this).attr("src"));
            oStrong.text(aSpan.eq(index).text());
        },function () {
            oPrompt.hide();
        })

    })();

    //BBS论坛高亮显示
    $(".bbs ol li").mouseover(function () {
        $(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");
    });

    //鼠标提示效果
    (function () {
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：上海<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];

        $(".hot_area li").mouseover(function () {
            if($(this).index() == 0){
                return;
            }

            $(".hot_area li p").remove();

            //console.log($(this).width()-12);

            $(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
        })
    })();
});
