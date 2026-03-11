const mb=document.getElementById('menuBtn');
const mobile=document.getElementById('mobileNav');
if(mb&&mobile) mb.addEventListener('click',()=>mobile.classList.toggle('show'));

const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// animated counters
const counters=document.querySelectorAll('[data-count]');
const animateCounter=(el)=>{
  const target=+el.dataset.count; let cur=0;
  const step=Math.max(1,Math.ceil(target/40));
  const id=setInterval(()=>{cur+=step; if(cur>=target){cur=target;clearInterval(id);} el.textContent=cur;},25);
};
counters.forEach(animateCounter);

// tilt effect
const tilts=document.querySelectorAll('.tilt');
tilts.forEach(card=>{
  card.addEventListener('mousemove',(e)=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width; const y=(e.clientY-r.top)/r.height;
    const rx=(.5-y)*6, ry=(x-.5)*8;
    card.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='perspective(700px) rotateX(0) rotateY(0)');
});

// lightweight animated background dots
const c=document.getElementById('bg-canvas');
const ctx=c.getContext('2d');
let w,h,pts=[];
function resize(){w=c.width=innerWidth;h=c.height=innerHeight;pts=Array.from({length:Math.min(80,Math.floor(w/20))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}));}
addEventListener('resize',resize); resize();
function draw(){ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(132,182,255,.35)';
  pts.forEach(p=>{p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2); ctx.fill();});
  for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy); if(d<120){ctx.strokeStyle=`rgba(120,176,255,${(1-d/120)*.18})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();}}
  requestAnimationFrame(draw);
}
draw();
