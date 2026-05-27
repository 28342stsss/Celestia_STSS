import { useEffect, useRef, useState } from "react";
import { schoolLogo, partyEmblem } from "./logos";

const css = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Kanit:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600&display=swap');
:root{
  --night-0:#05071c;
  --night-1:#0a0e2e;
  --night-2:#121a47;
  --night-3:#1c2660;
  --violet:#2a2566;
  --silver-1:#f4f7ff;
  --silver-2:#c8d4f0;
  --silver-3:#8fa0cf;
  --gold-1:#f6e3a8;
  --gold-2:#e9c573;
  --gold-3:#c79a44;
  --ink:#dfe6ff;
  --ink-dim:#9aa7d6;
  --glass:rgba(28,38,96,.35);
  --glass-brd:rgba(180,200,255,.16);
  --glow-gold:rgba(233,197,115,.45);
  --glow-blue:rgba(120,160,255,.35);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  font-family:'Sarabun',sans-serif;
  background:var(--night-0);
  color:var(--ink);
  overflow-x:hidden;
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
}
/* ===== Cosmic backdrop ===== */
.sky{position:fixed;inset:0;z-index:-3;
  background:
    radial-gradient(ellipse 120% 80% at 80% -10%, #3a2f7a 0%, transparent 45%),
    radial-gradient(ellipse 90% 70% at 10% 0%, #1a2a6b 0%, transparent 40%),
    radial-gradient(ellipse 140% 120% at 50% 110%, #2a1f55 0%, transparent 50%),
    linear-gradient(180deg, #070a24 0%, #0a0e30 35%, #0c1238 60%, #080a26 100%);
}
.stars,.stars2,.stars3{position:fixed;inset:-50%;z-index:-2;}
#starCanvas{position:fixed;inset:0;z-index:-2;pointer-events:none}
.nebula{position:fixed;z-index:-2;border-radius:50%;filter:blur(80px);opacity:.5;pointer-events:none}
.nebula.a{width:480px;height:480px;top:-120px;right:-80px;background:radial-gradient(circle,rgba(120,90,220,.5),transparent 70%)}
.nebula.b{width:520px;height:520px;bottom:8%;left:-140px;background:radial-gradient(circle,rgba(60,110,210,.4),transparent 70%)}
.grain{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

/* shooting star */
.shooter{position:fixed;top:14%;left:-10%;width:160px;height:1px;z-index:-1;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.9));
  filter:drop-shadow(0 0 6px #fff);transform:rotate(18deg);opacity:0;
  animation:shoot 9s ease-in 3s infinite;}
@keyframes shoot{0%{opacity:0;transform:translate(0,0) rotate(18deg)}4%{opacity:1}12%{opacity:0;transform:translate(120vw,40vh) rotate(18deg)}100%{opacity:0}}

/* ===== shared ===== */
.wrap{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;z-index:2}
.section{padding:90px 0;position:relative}
.kicker{font-family:'Kanit',sans-serif;font-weight:500;letter-spacing:.28em;text-transform:uppercase;
  font-size:.72rem;color:var(--gold-2);display:flex;align-items:center;justify-content:center;gap:.7em;margin-bottom:14px}
.kicker::before,.kicker::after{content:"✦";color:var(--gold-3);font-size:.8em}
.eyebrow{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--silver-3);font-size:1.05rem}
h2.title{font-family:'Kanit',sans-serif;font-weight:600;font-size:clamp(1.7rem,4vw,2.6rem);
  text-align:center;color:var(--silver-1);letter-spacing:.01em;line-height:1.2;
  text-shadow:0 0 28px rgba(150,180,255,.3)}
.divider{width:120px;height:1px;margin:22px auto 8px;
  background:linear-gradient(90deg,transparent,var(--gold-2),transparent);position:relative}
.divider::after{content:"✦";position:absolute;top:50%;left:50%;transform:translate(-50%,-55%);
  color:var(--gold-2);font-size:.7rem;text-shadow:0 0 8px var(--glow-gold)}

/* reveal animation */
.reveal{opacity:0;transform:translateY(34px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.reveal.in{opacity:1;transform:none}

/* ===== NAV ===== */
nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:14px 28px;backdrop-filter:blur(14px);background:rgba(7,10,36,.55);
  border-bottom:1px solid rgba(180,200,255,.08);transition:padding .3s,background .3s}
nav.shrunk{padding:9px 28px;background:rgba(7,10,36,.82)}
.brand{display:flex;align-items:center;gap:11px}
.brand img{width:34px;height:34px;border-radius:50%;object-fit:cover;
  box-shadow:0 0 0 1px rgba(233,197,115,.5),0 0 14px rgba(233,197,115,.4)}
.brand b{font-family:'Cinzel',serif;font-weight:700;letter-spacing:.14em;font-size:1rem;
  background:linear-gradient(180deg,#fff,#aebde8);-webkit-background-clip:text;background-clip:text;color:transparent}
.nav-links{display:flex;gap:26px}
.nav-links a{font-family:'Kanit',sans-serif;font-weight:300;font-size:.86rem;color:var(--ink-dim);
  text-decoration:none;letter-spacing:.04em;transition:color .25s;position:relative}
.nav-links a::after{content:"";position:absolute;left:0;bottom:-5px;width:0;height:1px;background:var(--gold-2);transition:width .3s}
.nav-links a:hover{color:var(--silver-1)}
.nav-links a:hover::after{width:100%}
@media(max-width:760px){.nav-links{display:none}}

/* ===== HERO ===== */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:120px 24px 70px;position:relative}
.hero-affil{font-family:'Kanit',sans-serif;font-weight:400;color:var(--silver-2);font-size:clamp(.95rem,2.4vw,1.15rem);
  letter-spacing:.02em;display:flex;align-items:center;gap:.6em;justify-content:center;flex-wrap:wrap}
.hero-affil .dot{color:var(--gold-2)}
.hero-sub{font-family:'Kanit',sans-serif;font-weight:300;color:var(--gold-1);letter-spacing:.18em;
  font-size:clamp(.82rem,2vw,1rem);margin-top:6px}
.wordmark{font-family:'Cinzel',serif;font-weight:800;
  font-size:clamp(3.4rem,15vw,9.5rem);line-height:.95;letter-spacing:.04em;margin:18px 0 6px;
  background:linear-gradient(180deg,#ffffff 0%,#dce6ff 30%,#9fb2e6 55%,#e9c573 80%,#c79a44 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 4px 30px rgba(150,180,255,.45)) drop-shadow(0 0 10px rgba(233,197,115,.3));
  position:relative}
.wordmark .glint{position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.85) 50%,transparent 60%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  background-size:300% 100%;animation:glint 6s ease-in-out infinite}
@keyframes glint{0%,55%{background-position:160% 0}80%,100%{background-position:-60% 0}}
.tagline-en{font-family:'Cinzel',serif;font-weight:500;letter-spacing:.34em;color:var(--silver-2);
  font-size:clamp(.6rem,2vw,.95rem);margin-top:2px;text-transform:uppercase;
  display:flex;align-items:center;gap:.9em;justify-content:center;flex-wrap:wrap}
.tagline-en .s{color:var(--gold-2)}
.hero-quote{max-width:640px;margin:42px auto 0;font-family:'Kanit',sans-serif;font-weight:300;
  font-size:clamp(1.05rem,2.6vw,1.35rem);color:var(--silver-1);line-height:1.7;position:relative}
.hero-quote::before{content:"\\201C";font-family:'Cinzel',serif;position:absolute;left:50%;top:-46px;
  transform:translateX(-50%);font-size:4rem;color:var(--gold-3);opacity:.55}
.scroll-cue{margin-top:54px;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--ink-dim);
  font-family:'Kanit',sans-serif;font-weight:300;font-size:.78rem;letter-spacing:.2em}
.mouse{width:22px;height:36px;border:1px solid var(--silver-3);border-radius:12px;position:relative}
.mouse::after{content:"";position:absolute;left:50%;top:7px;width:3px;height:7px;border-radius:2px;
  background:var(--gold-2);transform:translateX(-50%);animation:wheel 1.8s ease-in-out infinite}
@keyframes wheel{0%{opacity:0;transform:translate(-50%,0)}40%{opacity:1}100%{opacity:0;transform:translate(-50%,12px)}}

/* orbit emblem */
.emblem{position:relative;width:min(340px,68vw);height:min(340px,68vw);margin:6px auto 4px}
.ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(180,200,255,.18)}
.ring.r2{inset:34px;border-color:rgba(233,197,115,.25);border-style:dashed}
.ring.r3{inset:74px;border-color:rgba(180,200,255,.12)}
.orbit{position:absolute;inset:0;animation:spin 26s linear infinite}
.orbit.rev{animation:spin 38s linear infinite reverse}
.orbit .planet{position:absolute;top:-5px;left:50%;width:10px;height:10px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%,#fff,var(--gold-2));box-shadow:0 0 14px var(--glow-gold);transform:translateX(-50%)}
.orbit.rev .planet{background:radial-gradient(circle at 30% 30%,#fff,#8fb4ff);box-shadow:0 0 14px var(--glow-blue)}
@keyframes spin{to{transform:rotate(360deg)}}
.emblem .core{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.emblem .core .moon{font-family:'Cinzel',serif;font-size:clamp(4rem,18vw,8rem);font-weight:700;
  background:linear-gradient(180deg,#fff,#9fb2e6 60%,#c79a44);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 20px rgba(150,180,255,.5))}
.emblem .twinkle{position:absolute;color:#fff;font-size:.9rem;animation:tw 2.6s ease-in-out infinite;z-index:1}
@keyframes tw{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
.party-badge{width:74%;height:74%;border-radius:50%;object-fit:cover;
  box-shadow:0 0 0 1px rgba(233,197,115,.45),0 0 42px rgba(120,160,255,.5),0 0 80px -12px rgba(233,197,115,.45);
  animation:badgeFloat 6s ease-in-out infinite}
@keyframes badgeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}

/* paired logos */
.logo-pair{display:flex;align-items:center;justify-content:center;gap:26px;margin-bottom:20px}
.logo-pair figure{display:flex;flex-direction:column;align-items:center;gap:9px}
.logo-pair img{width:74px;height:74px;border-radius:50%;object-fit:cover;
  box-shadow:0 0 0 1px rgba(233,197,115,.5),0 0 22px rgba(233,197,115,.35)}
.logo-pair figcaption{font-family:'Kanit',sans-serif;font-weight:300;font-size:.78rem;color:var(--ink-dim);letter-spacing:.04em}
.logo-pair .pair-sep{color:var(--gold-2);font-size:1.1rem;align-self:flex-start;margin-top:24px;text-shadow:0 0 10px var(--glow-gold)}

/* ===== VISION + IDENTITY band ===== */
.band{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
@media(max-width:780px){.band{grid-template-columns:1fr;gap:30px}}
.vcard{background:var(--glass);border:1px solid var(--glass-brd);border-radius:20px;padding:34px 32px;
  backdrop-filter:blur(10px);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 24px 50px -30px rgba(0,0,0,.8)}
.vcard h3{font-family:'Kanit',sans-serif;font-weight:600;color:var(--gold-1);font-size:1.25rem;
  letter-spacing:.16em;text-transform:uppercase;display:flex;align-items:center;gap:.5em;margin-bottom:14px}
.vcard h3 svg{width:20px;height:20px}
.vcard p{font-family:'Sarabun',sans-serif;font-weight:300;color:var(--ink);font-size:1.05rem;line-height:1.85}
.vcard .th-name{font-family:'Kanit',sans-serif;font-weight:500;color:var(--silver-1);font-size:1.3rem;margin-bottom:8px}

/* ===== VALUES grid ===== */
.values{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:48px}
@media(max-width:900px){.values{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.values{grid-template-columns:1fr}}
.vtile{background:linear-gradient(165deg,rgba(28,38,96,.55),rgba(12,18,52,.5));
  border:1px solid var(--glass-brd);border-radius:16px;padding:26px 20px;text-align:center;
  position:relative;overflow:hidden;backdrop-filter:blur(8px);transition:transform .4s,border-color .4s,box-shadow .4s}
.vtile::before{content:"";position:absolute;inset:0;border-radius:16px;padding:1px;
  background:linear-gradient(160deg,rgba(233,197,115,.5),transparent 45%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .4s}
.vtile:hover{transform:translateY(-7px);border-color:rgba(233,197,115,.4);
  box-shadow:0 26px 50px -28px rgba(120,150,255,.6),0 0 30px -10px var(--glow-gold)}
.vtile:hover::before{opacity:1}
.vtile .letter{font-family:'Cinzel',serif;font-weight:800;font-size:2.7rem;line-height:1;
  background:linear-gradient(180deg,#fff,#9fb2e6);-webkit-background-clip:text;background-clip:text;color:transparent;
  text-shadow:0 0 22px rgba(150,180,255,.4)}
.vtile .ico{width:46px;height:46px;margin:14px auto 12px;display:flex;align-items:center;justify-content:center;
  border-radius:50%;background:radial-gradient(circle,rgba(233,197,115,.16),transparent 70%);
  border:1px solid rgba(233,197,115,.3)}
.vtile .ico svg{width:24px;height:24px}
.vtile .vname{font-family:'Kanit',sans-serif;font-weight:600;letter-spacing:.14em;font-size:.82rem;
  color:var(--gold-1);text-transform:uppercase;margin-bottom:8px}
.vtile .vdesc{font-family:'Sarabun',sans-serif;font-weight:300;font-size:.86rem;color:var(--ink-dim);line-height:1.65}

/* ===== POLICY ===== */
.policy-wrap{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:46px}
@media(max-width:780px){.policy-wrap{grid-template-columns:1fr}}
.policy{display:flex;gap:16px;align-items:flex-start;background:var(--glass);border:1px solid var(--glass-brd);
  border-radius:14px;padding:20px 22px;backdrop-filter:blur(8px);transition:transform .35s,border-color .35s}
.policy:hover{transform:translateX(6px);border-color:rgba(233,197,115,.35)}
.policy .num{flex:none;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-family:'Cinzel',serif;font-weight:700;color:var(--night-0);font-size:1rem;
  background:radial-gradient(circle at 30% 30%,var(--gold-1),var(--gold-3));box-shadow:0 0 16px var(--glow-gold)}
.policy p{font-family:'Sarabun',sans-serif;font-weight:300;color:var(--ink);font-size:1rem;line-height:1.7}

/* ===== CTA ===== */
.cta{text-align:center;padding:100px 24px}
.cta .big{font-family:'Kanit',sans-serif;font-weight:600;font-size:clamp(1.6rem,5vw,3rem);line-height:1.3;
  background:linear-gradient(180deg,#fff,#bcd 55%,#e9c573);-webkit-background-clip:text;background-clip:text;color:transparent;
  text-shadow:0 0 40px rgba(150,180,255,.25)}
.cta .em{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;color:var(--gold-1)}
.cta .sub{font-family:'Kanit',sans-serif;font-weight:300;color:var(--silver-2);font-size:1.15rem;margin-top:24px;letter-spacing:.02em}
.cta .vote{font-family:'Cinzel',serif;font-weight:700;letter-spacing:.3em;font-size:clamp(1.3rem,5vw,2.2rem);
  margin-top:10px;background:linear-gradient(180deg,#fff,#9fb2e6);-webkit-background-clip:text;background-clip:text;color:transparent}
.btn{display:inline-block;margin-top:38px;font-family:'Kanit',sans-serif;font-weight:500;letter-spacing:.14em;
  font-size:.95rem;color:var(--gold-1);text-decoration:none;padding:15px 42px;border-radius:50px;
  border:1px solid rgba(233,197,115,.5);background:linear-gradient(180deg,rgba(233,197,115,.12),rgba(233,197,115,.04));
  position:relative;overflow:hidden;transition:color .3s,box-shadow .3s,transform .3s}
.btn:hover{color:var(--night-0);transform:translateY(-2px);box-shadow:0 14px 40px -12px var(--glow-gold)}
.btn::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--gold-1),var(--gold-3));
  transform:scaleY(0);transform-origin:bottom;transition:transform .35s;z-index:-1}
.btn:hover::before{transform:scaleY(1)}

/* ===== FOOTER ===== */
footer{border-top:1px solid rgba(180,200,255,.1);padding:44px 24px 38px;text-align:center;position:relative;z-index:2}
footer .f-logo{width:58px;height:58px;border-radius:50%;object-fit:cover;margin:0 auto 16px;
  box-shadow:0 0 0 1px rgba(233,197,115,.5),0 0 22px rgba(233,197,115,.35)}
footer .f-name{font-family:'Kanit',sans-serif;font-weight:500;color:var(--silver-1);font-size:1.05rem}
footer .f-tag{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--silver-3);margin-top:6px;
  display:flex;align-items:center;gap:.7em;justify-content:center;font-size:1rem}
footer .f-tag .s{color:var(--gold-2)}
footer .f-meta{font-family:'Sarabun',sans-serif;font-weight:300;color:var(--ink-dim);font-size:.8rem;margin-top:18px;letter-spacing:.03em}

/* ===== MEMBERS ===== */
.lead-card{max-width:360px;margin:48px auto 14px;background:linear-gradient(165deg,rgba(40,52,120,.55),rgba(14,20,56,.55));
  border:1px solid rgba(233,197,115,.35);border-radius:22px;padding:34px 30px 30px;text-align:center;
  backdrop-filter:blur(10px);position:relative;overflow:hidden;
  box-shadow:0 30px 60px -34px rgba(120,150,255,.7),0 0 40px -14px var(--glow-gold)}
.lead-card::before{content:"";position:absolute;inset:0;border-radius:22px;padding:1px;
  background:linear-gradient(160deg,rgba(233,197,115,.7),transparent 50%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude}
.lead-tag{font-family:'Kanit',sans-serif;font-weight:600;letter-spacing:.2em;font-size:.74rem;
  color:var(--gold-1);text-transform:uppercase;margin-bottom:18px}
.members-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:30px}
@media(max-width:900px){.members-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:640px){.members-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:380px){.members-grid{grid-template-columns:1fr}}
.mcard{background:var(--glass);border:1px solid var(--glass-brd);border-radius:16px;padding:24px 16px 20px;
  text-align:center;backdrop-filter:blur(8px);transition:transform .35s,border-color .35s,box-shadow .35s}
.mcard:hover{transform:translateY(-6px);border-color:rgba(233,197,115,.4);
  box-shadow:0 24px 46px -28px rgba(120,150,255,.6),0 0 26px -10px var(--glow-gold)}
.mcard.vacant{opacity:.62;border-style:dashed}
.mcard.vacant:hover{transform:translateY(-3px)}
.avatar{width:92px;height:92px;border-radius:50%;margin:0 auto 16px;position:relative;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  background:radial-gradient(circle at 50% 30%,#28346e,#0c1238 75%);
  box-shadow:0 0 0 1px rgba(233,197,115,.4),0 0 22px -4px var(--glow-blue),inset 0 2px 8px rgba(0,0,0,.5)}
.lead-card .avatar{width:118px;height:118px;box-shadow:0 0 0 2px rgba(233,197,115,.55),0 0 34px -4px var(--glow-gold)}
.avatar img{width:100%;height:100%;object-fit:cover}
.avatar svg{width:52%;height:52%;opacity:.8}
.avatar .av-star{position:absolute;top:8px;right:12px;color:var(--gold-2);font-size:.7rem;
  filter:drop-shadow(0 0 4px var(--glow-gold))}
.m-pos{font-family:'Kanit',sans-serif;font-weight:500;letter-spacing:.06em;font-size:.82rem;
  color:var(--gold-1);margin-bottom:7px}
.lead-card .m-pos{font-size:1.05rem;letter-spacing:.04em}
.m-name{font-family:'Kanit',sans-serif;font-weight:500;color:var(--silver-1);font-size:1.02rem;line-height:1.35}
.lead-card .m-name{font-size:1.45rem}
.m-nick{font-family:'Sarabun',sans-serif;font-weight:300;color:var(--ink-dim);font-size:.86rem;margin-top:3px}
.m-name.tba{color:var(--silver-3);font-weight:300;font-style:italic;font-size:.92rem}`;

// ===== รายชื่อสมาชิกพรรค (แก้ชื่อ/เพิ่มรูปได้ที่นี่) =====
// อยากใส่รูปจริง: เพิ่ม photo: "/รูป.jpg" (วางไฟล์ในโฟลเดอร์ public)
const president = { pos: "ประธานพรรค", name: "ศิวกร รอดแจ่ม", nick: "วา", photo: "" };

const members = [
  { pos: "รองประธาน (ม.ต้น)", name: "", nick: "", photo: "" },
  { pos: "รองประธาน (ม.ปลาย)", name: "ชินกฤต สุวรรณแว่นทอง", nick: "จักรกฤต", photo: "" },
  { pos: "เลขานุการ", name: "ศรัณยพงศ์ สุทธิมาศ", nick: "เมเจอร์", photo: "" },
  { pos: "ฝ่ายวิชาการ", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายจริยธรรม", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายปฏิคม", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายกีฬา", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายบันเทิง", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายอาคารสถานที่", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายศิลป์", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายประชาสัมพันธ์", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายโสตทัศนูปกรณ์", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายงบประมาณ", name: "", nick: "", photo: "" },
  { pos: "ฝ่ายประเมินผล", name: "", nick: "", photo: "" },
];

// avatar จำลอง (silhouette) — ใช้เมื่อยังไม่มีรูปจริง
function Avatar({ photo, alt }) {
  return (
    <div className="avatar">
      <span className="av-star">✦</span>
      {photo ? (
        <img src={photo} alt={alt} />
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c8d4f0" strokeWidth="1.4">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        </svg>
      )}
    </div>
  );
}

export default function Celestia() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const [shrunk, setShrunk] = useState(false);

  // shrink nav on scroll
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal-on-scroll
  useEffect(() => {
    const els = rootRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const sibs = [...e.target.parentElement.querySelectorAll(".reveal")];
            e.target.style.transitionDelay = ((sibs.indexOf(e.target) % 4) * 0.08) + "s";
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // starfield canvas
  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv.getContext("2d");
    let stars = [];
    let raf;
    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      const n = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random(),
        s: Math.random() * 0.02 + 0.004,
        c: Math.random() > 0.85 ? "233,197,115" : "200,220,255",
      }));
    };
    const draw = () => {
      cx.clearRect(0, 0, cv.width, cv.height);
      for (const st of stars) {
        st.a += st.s;
        const o = 0.35 + Math.abs(Math.sin(st.a)) * 0.65;
        cx.beginPath();
        cx.arc(st.x, st.y, st.r, 0, 7);
        cx.fillStyle = "rgba(" + st.c + "," + o + ")";
        cx.shadowBlur = st.r * 4;
        cx.shadowColor = "rgba(" + st.c + ",.8)";
        cx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <style>{css}</style>

      <div className="sky" />
      <canvas id="starCanvas" ref={canvasRef} />
      <div className="nebula a" />
      <div className="nebula b" />
      <div className="shooter" />
      <div className="grain" />

      <nav id="nav" className={shrunk ? "shrunk" : ""}>
        <div className="brand">
          <img src={partyEmblem} alt="ตราพรรค CELESTIA" />
          <b>CELESTIA</b>
        </div>
        <div className="nav-links">
          <a href="#vision">วิสัยทัศน์</a>
          <a href="#members">สมาชิก</a>
          <a href="#values">ค่านิยม</a>
          <a href="#policy">นโยบาย</a>
          <a href="#join">ร่วมเลือก</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-affil">
          <span>พรรคสภานักเรียน</span>
          <span className="dot">✦</span>
          <span>โรงเรียนสตรีทุ่งสง</span>
        </div>
        <div className="hero-sub">แสงดาวแห่งอนาคต เพื่อทุกคน</div>

        <h1 className="wordmark">
          CELESTIA<span className="glint">CELESTIA</span>
        </h1>
        <div className="tagline-en">
          <span className="s">✦</span> Together, We Shine Beyond The Sky <span className="s">✦</span>
        </div>

        <div className="emblem">
          <div className="ring" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="orbit">
            <span className="planet" />
          </div>
          <div className="orbit rev">
            <span className="planet" />
          </div>
          <span className="twinkle" style={{ top: "18%", left: "24%" }}>✦</span>
          <span className="twinkle" style={{ top: "30%", right: "18%", animationDelay: ".6s" }}>✧</span>
          <span className="twinkle" style={{ bottom: "22%", left: "30%", animationDelay: "1.1s" }}>✦</span>
          <span className="twinkle" style={{ bottom: "28%", right: "26%", animationDelay: "1.6s" }}>✧</span>
          <div className="core">
            <span className="moon">☾</span>
          </div>
        </div>

        <p className="hero-quote">
          เพราะทุกคนคือดวงดาวที่สำคัญ
          <br />
          มาร่วมกันเปล่งประกาย สร้างฟ้าใหม่ไปด้วยกัน
        </p>

        <div className="scroll-cue">
          <span>เลื่อนลง</span>
          <div className="mouse" />
        </div>
      </header>

      {/* VISION + IDENTITY */}
      <section className="section" id="vision">
        <div className="wrap">
          <div className="kicker reveal">วิสัยทัศน์ของเรา</div>
          <h2 className="title reveal">มุ่งสร้างฟ้าใหม่ ให้ทุกดวงดาวได้ส่องแสง</h2>
          <div className="divider reveal" />
          <div className="band" style={{ marginTop: "46px" }}>
            <div className="vcard reveal">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Vision
              </h3>
              <p>
                มุ่งมั่นพัฒนาโรงเรียนให้เป็น{" "}
                <strong style={{ color: "var(--silver-1)", fontWeight: 500 }}>พื้นที่แห่งโอกาส</strong>{" "}
                ที่ทุกคนมีความสุข และเติบโตไปด้วยกัน
              </p>
            </div>
            <div className="vcard reveal" id="identity">
              <div className="th-name">✦ เราคือ Celestia</div>
              <p>
                พรรค{" "}
                <strong style={{ color: "var(--gold-1)", fontWeight: 500 }}>ของนักเรียน เพื่อนักเรียน โดยนักเรียน</strong>{" "}
                ที่พร้อมรับฟังทุกเสียง และลงมือทำจริง เพื่ออนาคตของพวกเรา
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="section" id="members">
        <div className="wrap">
          <div className="kicker reveal">ทีมงานของเรา</div>
          <h2 className="title reveal">สมาชิกพรรค CELESTIA</h2>
          <div className="divider reveal" />

          {/* ประธาน — การ์ดเด่น */}
          <div className="lead-card reveal">
            <div className="lead-tag">✦ ผู้นำพรรค ✦</div>
            <Avatar photo={president.photo} alt={president.name || president.pos} />
            <div className="m-pos">{president.pos}</div>
            <div className="m-name">{president.name || "รอประกาศรายชื่อ"}</div>
            {president.nick && <div className="m-nick">({president.nick})</div>}
          </div>

          {/* สมาชิกที่เหลือ */}
          <div className="members-grid">
            {members.map((m, i) => (
              <div key={i} className={"mcard reveal" + (m.name ? "" : " vacant")}>
                <Avatar photo={m.photo} alt={m.name || m.pos} />
                <div className="m-pos">{m.pos}</div>
                {m.name ? (
                  <>
                    <div className="m-name">{m.name}</div>
                    {m.nick && <div className="m-nick">({m.nick})</div>}
                  </>
                ) : (
                  <div className="m-name tba">รอประกาศรายชื่อ</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" id="values">
        <div className="wrap">
          <div className="kicker reveal">ค่านิยมที่เรายึดมั่น</div>
          <h2 className="title reveal">8 แสงดาวแห่ง C·E·L·E·S·T·I·A</h2>
          <div className="divider reveal" />
          <div className="values">
            <div className="vtile reveal">
              <div className="letter">C</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
                </svg>
              </div>
              <div className="vname">Creative</div>
              <div className="vdesc">สร้างสรรค์สิ่งใหม่ คิดนอกกรอบ พัฒนาอย่างไม่หยุดยั้ง</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">E</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <circle cx="7" cy="8" r="2.4" />
                  <circle cx="17" cy="8" r="2.4" />
                  <path d="M3 19c0-2.5 1.8-4 4-4s4 1.5 4 4M13 19c0-2.5 1.8-4 4-4s4 1.5 4 4" />
                </svg>
              </div>
              <div className="vname">Equality</div>
              <div className="vdesc">เท่าเทียม รับฟังทุกเสียง ให้เกียรติกันและกัน</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">L</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
                </svg>
              </div>
              <div className="vname">Leadership</div>
              <div className="vdesc">ผู้นำที่ดี กล้าคิด กล้าทำ นำด้วยใจ</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">E</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </div>
              <div className="vname">Energy</div>
              <div className="vdesc">พลังบวก ความมุ่งมั่น ไม่หยุดพัฒนา</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">S</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M12 21s-7-4.5-9-9c-1.2-2.7.4-5.5 3-5.5 1.8 0 3 1.2 3.5 2.2C13 5.7 14.2 4.5 16 4.5c2.6 0 4.2 2.8 3 5.5" />
                </svg>
              </div>
              <div className="vname">Support</div>
              <div className="vdesc">ซัพพอร์ตนักเรียนทุกคนในทุกด้าน ไม่ทิ้งใครไว้ข้างหลัง</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">T</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <circle cx="12" cy="7" r="2.4" />
                  <circle cx="5" cy="10" r="2" />
                  <circle cx="19" cy="10" r="2" />
                  <path d="M8 19c0-2.5 1.8-4 4-4s4 1.5 4 4M2 18c0-2 1.3-3.2 3-3.2M22 18c0-2-1.3-3.2-3-3.2" />
                </svg>
              </div>
              <div className="vname">Teamwork</div>
              <div className="vdesc">ร่วมมือ ร่วมใจ ทำงานเป็นทีม สร้างสิ่งที่ยิ่งใหญ่</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">I</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M12 2l2 6 6 .5-4.6 4 1.6 6L12 15l-5 3.5 1.6-6L4 8.5 10 8l2-6z" />
                </svg>
              </div>
              <div className="vname">Inspiration</div>
              <div className="vdesc">เป็นแรงบันดาลใจ ที่จุดประกายความฝัน ให้เป็นจริง</div>
            </div>

            <div className="vtile reveal">
              <div className="letter">A</div>
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e9c573" strokeWidth="1.5">
                  <path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4zM6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3" />
                </svg>
              </div>
              <div className="vname">Achievement</div>
              <div className="vdesc">มุ่งสู่ความสำเร็จ พัฒนาต่อเนื่อง เพื่ออนาคตที่ดีกว่า</div>
            </div>
          </div>
        </div>
      </section>

      {/* POLICY */}
      <section className="section" id="policy">
        <div className="wrap">
          <div className="kicker reveal">สิ่งที่เราจะลงมือทำ</div>
          <h2 className="title reveal">นโยบายหลักของเรา</h2>
          <div className="divider reveal" />
          <div className="policy-wrap">
            <div className="policy reveal"><div className="num">1</div><p>พัฒนาสวัสดิการและสิ่งอำนวยความสะดวกในโรงเรียน</p></div>
            <div className="policy reveal"><div className="num">2</div><p>จัดกิจกรรมที่หลากหลาย สร้างสรรค์ และมีคุณภาพ</p></div>
            <div className="policy reveal"><div className="num">3</div><p>ส่งเสริมสุขภาพกายและใจของนักเรียน</p></div>
            <div className="policy reveal"><div className="num">4</div><p>สร้างพื้นที่รับฟังความคิดเห็นอย่างเท่าเทียม</p></div>
            <div className="policy reveal"><div className="num">5</div><p>ผลักดันสิ่งแวดล้อมที่ดีและยั่งยืน</p></div>
            <div className="policy reveal"><div className="num">6</div><p>เชื่อมความสัมพันธ์ทุกระดับชั้น ให้เป็นหนึ่งเดียว</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="join">
        <div className="wrap">
          <div className="kicker reveal" style={{ marginBottom: "26px" }}>ก้าวต่อไปด้วยกัน</div>
          <div className="big reveal">
            รวมพลังดั่งหมู่ดาว
            <br />
            ส่องทางอนาคต <span className="em">ไปด้วยกัน</span>
          </div>
          <div className="sub reveal">ร่วมเลือก ร่วมเปลี่ยนแปลง ไปกับพวกเรา</div>
          <div className="vote reveal">CELESTIA</div>
          <a href="#" className="btn reveal">✦ เลือกพรรค CELESTIA ✦</a>
        </div>
      </section>

      <footer>
        <div className="logo-pair">
          <figure>
            <img src={partyEmblem} alt="ตราพรรค CELESTIA" />
            <figcaption>พรรค CELESTIA</figcaption>
          </figure>
          <span className="pair-sep">✦</span>
          <figure>
            <img src={schoolLogo} alt="โลโก้โรงเรียนสตรีทุ่งสง" />
            <figcaption>โรงเรียนสตรีทุ่งสง</figcaption>
          </figure>
        </div>
        <div className="f-name">พรรคสภานักเรียน · โรงเรียนสตรีทุ่งสง</div>
        <div className="f-tag">
          <span className="s">✦</span> Celestia — Together, We Shine Beyond The Sky <span className="s">✦</span>
        </div>
        <div className="f-meta">© CELESTIA · แสงดาวแห่งอนาคต เพื่อทุกคน</div>
      </footer>
    </div>
  );
}
