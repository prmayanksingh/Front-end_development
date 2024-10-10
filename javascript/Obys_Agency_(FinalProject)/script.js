function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimation(){
    var h5text = document.querySelector("#line1-part1 h5")

var tl = gsap.timeline();
tl.from(".line h1, .line h2",{
    y:150,
    stagger:0.25,
    duration:0.6,
    delay:0.5
})

tl.to(".line h2", {
    animationName:"anime",
    opacity:1
})

tl.from("#line1-part1", {
    opacity:0,
    onStart: function(){
        var grow = 0;
        setInterval(function(){
            if(grow < 100) h5text.innerHTML = grow++
            else h5text.innerHTML = grow 
        },34)
    }
})

tl.from("#loader h4",{
    opacity:0
})

tl.to(".line h2",{
    opacity:0
})

tl.to("#loader", {
    opacity:0,
    duration:1,
    delay:0,
})

tl.from("#page1", {
    y:1200,
    opacity:0,
    delay:0.4,
    duration:1,
    ease: "power4.out"
})

tl.to("#loader", {
    display:"none"
})

tl.from("#nav",{
    opacity:0
})

tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero3 h3, #hero4 h1, #hero-num h4",{
    y:140,
    stagger:0.1
})

tl.from("#hero1 , #page2" ,{
    opacity:0,
},"-=1.2")

}
function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#crsr", {
            left:dets.x,
            top:dets.y
        })
    })
    
    Shery.makeMagnet("#nav-part2 h4");
}
loadingAnimation();
// cursorAnimation();
locomotiveAnimation();













