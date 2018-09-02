var clockUpdate;
var round=0;

function setRound(value){
    round=value;
	var roundElem = document.getElementById("round")
    roundElem.innerHTML= "Runde "+round;
}

function increaseRound(){
    stopClock();
    setRound(round+1);
    initClock();
    startClock();
}

function setClock(minute, second){
    if (minute<10) minute="0"+minute;
    if (second<10) second="0"+second ;
	var clockElem = document.getElementById("clock");
	clockElem.innerHTML= minute+":"+second;
}

function initClock(){
	setClock(0,0);
}

function clearIntervals(){
    for (var i = 1; i < 1000; i++){
        window.clearInterval(i);
    }
}

function startClock(){
    var date=new Date();
    var start=date.getTime()/1000;
                    
    clearIntervals();
    clockUpdate = setInterval(
        function(){ 
            var now = new Date().getTime()/1000;
            var diff=now-start;

            var minute=parseInt(diff / 60);
            var second=parseInt(diff % 60);
		    setClock(minute,second);
        }, 
        1000
    );
}

function stopClock(){
    clearIntervals();
}

$( document ).ready(
    function() {
        initClock();
        setRound(1);

        $("#round").click(
            function() {
                increaseRound();
            }
        );

        $("#clock").click(
            function(){
                stopClock();
                initClock();
                startClock();
            }
        );
    }
)

