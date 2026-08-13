(function(){
    function safe(fn,name){try{fn();}catch(e){console.warn('init failed:',name,e);}}

    safe(function navScroll(){
        var nav=document.getElementById('nav');
        if(!nav)return;
        window.addEventListener('scroll',function(){
            if(window.scrollY>40){nav.classList.add('scrolled');}
            else{nav.classList.remove('scrolled');}
        },{passive:true});
    },'navScroll');

    safe(function revealOnScroll(){
        var items=Array.prototype.slice.call(document.querySelectorAll('.reveal'));
        if(!items.length)return;
        if(!('IntersectionObserver' in window)){
            items.forEach(function(el){el.classList.add('in');});
            return;
        }
        var io=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        },{threshold:0.05,rootMargin:'0px 0px -40px 0px'});
        items.forEach(function(el){io.observe(el);});
        setTimeout(function(){items.forEach(function(el){el.classList.add('in');});},6000);
    },'revealOnScroll');
})();
