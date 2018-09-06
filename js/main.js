var inSlide=1;
var maxSlides;
var inTransition= false;
var currentDuration;
var defInAnimation = 'fadeInDown';
var defOutAnimation = 'fadeOutDown';
var navigatedCallback = (slide)=>{};

function goToSlide(number){
    inTransition = true;
    var inAnimation, outAnimation;
    var current = $('.slider .current');
    inAnimation = current.data('in')||defInAnimation;
    outAnimation = current.data('out')||defOutAnimation;

    $('.slider .current').removeClass(inAnimation).addClass(outAnimation);
    setTimeout( ()=>{        
        var target = $('.slider .slide').eq(number-1);
        var tInAnimation = target.data('in')||defInAnimation;
        current.addClass('hidden').removeClass('animated current ' + inAnimation + ' ' + outAnimation);
        target.removeClass('hidden').addClass('animated current ' + tInAnimation);
        inSlide = number;
        inTransition = false;
        if (navigatedCallback){
            navigatedCallback(target);
        }
    },getDuration(current));
}

function getDuration(slide){ 
    var durations = "slow slower fast faster".split(/\s+/);
    var vDurations = [2000,3000,800,500,1000];
    var clases =  $(slide).attr('class').split(/\s+/);    
    var idxDuration; 
    $.each( durations, (indx,duration, value )=>{        
        idxDuration = clases.indexOf(duration)>=0?indx:4;
        return (idxDuration==4);
    });    
    return vDurations[idxDuration];
}

function navigate(evObject){
    if (inTransition) return; //exit if in transition
    var sender = $(evObject.target);    
    var goTo = sender.hasClass('prev')? inSlide-1: inSlide+1;
    goTo = goTo>maxSlides?1:(goTo<1?maxSlides:goTo);    
    goToSlide(goTo);
}
function navGo(evObject){
    if (inTransition) return; //exit if in transition
    var sender = $(evObject.target);
    var go = sender.data('go');        
    sender.animateCss('rubberBand faster', ()=>{        
        goToSlide(go);
    });
}

$(function(){ 
    maxSlides = $('.slider .slide').length;
    var inAnimated = $('.slider .slide').eq(0).data('in') || defInAnimation;
    $('.slider .slide').addClass('hidden').eq(0).removeClass('hidden').addClass('animated current ' + inAnimated);
    inTransition=false;
    $('.navigation .button').click(navigate);
    $('nav .button').click(navGo);
});