const mb=document.getElementById('menuBtn');
const nav=document.getElementById('mobileNav');
if(mb&&nav)mb.addEventListener('click',()=>nav.classList.toggle('show'));
const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
