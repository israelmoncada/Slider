
navigatedCallback = function(slide){
    //Navega y coloca hidden a los demas steps menos al primero
    $('.step',slide).removeClass('present past future').addClass('future').eq(0).removeClass('future').addClass('present');
    checkStepButtons(slide);
}

function preloadImages(arrayOfImages, callback){
    var preloadCount =0;
    var i,j;                
    var handleLoad = function(){
        if (++preloadCount === arrayOfImages.length && callback) {
            callback();
        } 
    }; 
    
    for(i=0, j= arrayOfImages.length; i<j;i++){
        (function(img,src){
            img.onload = handleLoad;
            img.onerror = handleLoad;
            img.onabort = handleLoad;
            img.src = src;
        })(new Image(),arrayOfImages[i]);
    }
}

function goStep(evObject){
    var sender = $(evObject.target);
    if (sender.css('opacity') == '0') return;
    var sibling = sender.hasClass('prev')? '.past': '.future';
    var nextClass = sender.hasClass('prev')? 'future': 'past';
    var current = $('.slider .current');
    var presente =$('.step.present', current);
    presente.removeClass('present').addClass(nextClass);
    var target;
    if (sibling == '.future'){
        target = presente.siblings(sibling).first();
    }else{
        target = presente.siblings(sibling).last();
    }
    target.removeClass('past future').addClass('present');
    checkStepButtons(current);
}
function avanzaTema(evObject){
    if (inTransition) return; //exit if in transition
    var sender = $(evObject.target);    
    var goTo = sender.hasClass('anterior')? inSlide-1: inSlide+1;
    goTo = goTo>maxSlides?1:(goTo<1?maxSlides:goTo);
    goToSlide(goTo);
}
function checkStepButtons(slide){
    var presente =$('.step.present', slide);
    $('.navToolbar .next',slide).css('opacity', presente.siblings('.future').length?'1':'0');
    $('.navToolbar .prev',slide).css('opacity', presente.siblings('.past').length?'1':'0');    
}
$(function(){
    $('nav .button').hover((evObject)=>{        
        $(evObject.target).animateCss('jello faster');
    });
    $('.navToolbar .prev, .navToolbar .next').click(goStep);
    $('.navToolbar .home').click(()=>goToSlide(4));
    $('.navToolbar .anterior, .navToolbar .siguiente').click(avanzaTema);
    /*$('#portada nav .button').each( (idx, el) =>{ 
        $(el).after( $('<span>').addClass('tooltip').text( $(el).data('title')));
    });*/
    $('.intro, .intro > *, .creditos').click(()=>goToSlide(inSlide+1));

});

