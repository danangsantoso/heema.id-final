import React, { useState, useEffect, useRef } from "react";

const C = {
  navy:"#08111f",navy2:"#0d1b30",navy3:"#142545",navy4:"#1c3358",navy5:"#264470",navy6:"#3a5b8a",
  gold:"#d4af37",goldLt:"#f0d97a",goldDk:"#9c7a26",goldDeep:"#6b5018",goldGlow:"#d4af3722",goldSoft:"#d4af3711",
  text:"#f1f5fb",textDim:"#a8bdd8",textMute:"#6e85a8",textFaint:"#42587a",
  red:"#e85d5d",redBg:"#3a1818",green:"#3dd68c",greenBg:"#0d3322",
  blue:"#5fa8e8",blueBg:"#0e2840",purple:"#b18cf0",purpleBg:"#241640",
};

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Inter',system-ui,sans-serif;background:${C.navy};color:${C.text};-webkit-font-smoothing:antialiased;letter-spacing:-0.005em;}
    ::-webkit-scrollbar{width:5px;height:5px;}::-webkit-scrollbar-thumb{background:${C.navy5};border-radius:8px;}
    ::selection{background:${C.gold}44;color:${C.goldLt};}
    .serif{font-family:'Cormorant Garamond',serif;letter-spacing:-0.01em;}
    .font-num{font-variant-numeric:tabular-nums;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes slideR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes diamondPulse{0%,100%{filter:drop-shadow(0 0 8px ${C.gold}66)}50%{filter:drop-shadow(0 0 16px ${C.gold}aa)}}
    @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 ${C.gold}55}50%{box-shadow:0 0 0 8px ${C.gold}00}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes skeletonShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes ringIn{0%{transform:scale(0);opacity:0}50%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}
    .fu{animation:fadeUp .5s cubic-bezier(.22,.94,.32,1) both;}
    .fu1{animation:fadeUp .5s .07s cubic-bezier(.22,.94,.32,1) both;}
    .fu2{animation:fadeUp .5s .14s cubic-bezier(.22,.94,.32,1) both;}
    .fu3{animation:fadeUp .5s .21s cubic-bezier(.22,.94,.32,1) both;}
    .fu4{animation:fadeUp .5s .28s cubic-bezier(.22,.94,.32,1) both;}
    .fi{animation:fadeIn .3s ease both;}
    .si{animation:scaleIn .3s cubic-bezier(.34,1.56,.64,1) both;}
    .slide-r{animation:slideR .35s cubic-bezier(.22,.94,.32,1) both;}
    .float{animation:float 3.5s ease-in-out infinite;}
    .diamond-pulse{animation:diamondPulse 2.8s ease-in-out infinite;}
    .pulse-gold{animation:pulseGold 2s ease-in-out infinite;}
    .bounce{animation:bounce 1.5s ease-in-out infinite;}
    .ring-in{animation:ringIn .5s cubic-bezier(.34,1.56,.64,1) both;}
    .skeleton{background:linear-gradient(90deg,${C.navy3} 0%,${C.navy4} 50%,${C.navy3} 100%);background-size:200% 100%;animation:skeletonShimmer 1.5s ease-in-out infinite;border-radius:8px;}
    .press{transition:transform .12s,opacity .12s;cursor:pointer;}
    .press:active{transform:scale(.96);opacity:.9;}
    .lift{transition:all .25s cubic-bezier(.22,.94,.32,1);}
    .lift:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.4);border-color:${C.gold}55;}
    .gold-shimmer{background:linear-gradient(120deg,${C.goldDk} 10%,${C.goldLt} 40%,${C.gold} 60%,${C.goldDk} 90%);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
    .bg-pattern{background-image:radial-gradient(circle at 50% 50%, ${C.gold}07 1px, transparent 1px),radial-gradient(circle at 0 0, ${C.gold}05 1px, transparent 1px);background-size:28px 28px,56px 56px;}
    .bg-pattern-fine{background-image:radial-gradient(circle at 1px 1px, ${C.gold}10 0.5px, transparent 1px);background-size:16px 16px;}
    .gold-divider{height:1px;background:linear-gradient(90deg,transparent,${C.gold}55,transparent);}
    input,select,textarea,button{font-family:inherit;}
    input::placeholder,textarea::placeholder{color:${C.textFaint};}
    input[type=date]::-webkit-calendar-picker-indicator{filter:invert(1) sepia(1) saturate(2) hue-rotate(20deg);opacity:.6;cursor:pointer;}
    select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='%23d4af37'%3E%3Cpath d='M6 9L1 4h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:32px;appearance:none;-webkit-appearance:none;}
    .spin{animation:spin 1s linear infinite;}
    input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
    input[type=number]{-moz-appearance:textfield;}
    @media (max-width:640px){
      body{font-size:14px;}
      .no-mobile{display:none;}
    }
    .safe-bottom{padding-bottom:env(safe-area-inset-bottom,0);}
    button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid ${C.gold};outline-offset:2px;}
    .ring-active{box-shadow:0 0 0 2px ${C.gold},0 0 0 4px ${C.gold}33;}
  `}</style>
);

const storage = {
  async get(key, def=null) {
    try {
      if (window.storage) { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : def; }
      const v = localStorage.getItem(key); return v ? JSON.parse(v) : def;
    } catch { return def; }
  },
  async set(key, val) {
    try { if (window.storage) await window.storage.set(key, JSON.stringify(val)); else localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }
};

function usePersist(key, initial) {
  const [val, setVal] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { storage.get(key).then(v => { if (v !== null) setVal(v); setLoaded(true); }); }, [key]);
  useEffect(() => { if (loaded) storage.set(key, val); }, [key, val, loaded]);
  return [val, setVal];
}

const fmt = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n||0);
const fmtS = n => { if(!n||n===0) return "0"; if(n>=1e9) return `${(n/1e9).toFixed(1).replace(/\.0$/,"")}M`; if(n>=1e6) return `${(n/1e6).toFixed(1).replace(/\.0$/,"")}Jt`; if(n>=1e3) return `${(n/1e3).toFixed(0)}Rb`; return String(n); };
const fmtNum = n => new Intl.NumberFormat("id-ID").format(n||0);
const fmtDate = d => new Date(d).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"});
const fmtDateLong = d => new Date(d).toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const today = () => new Date().toISOString().split("T")[0];
const uid = () => Date.now() + Math.floor(Math.random()*1000);
const parseAmount = s => Number(String(s).replace(/\D/g,"")) || 0;
const fmtAmountInput = s => { const n = parseAmount(s); return n === 0 ? "" : fmtNum(n); };

// Animated counter hook
function useCountUp(target, duration=600) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    const start = val, diff = target - start, t0 = Date.now();
    if(Math.abs(diff) < 1) { setVal(target); return; }
    let raf;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + diff * e));
      if(p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

// Keyboard shortcut hook
function useKey(key, handler, deps=[]) {
  useEffect(() => {
    const fn = e => { if(e.key === key) handler(e); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Google Sign-In: real Supabase OAuth + mock fallback for local demo
// Production: redirects to Google → returns to app with session
import { supabase as _supabaseClient } from "./lib/supabase";

const MOCK_GOOGLE_ACCOUNTS = [
  {nama:"Hasan Maulana",email:"hasan@gmail.com",picture:"H",telepon:"0812-9876-5432"},
  {nama:"Aisyah Putri",email:"aisyah.putri@gmail.com",picture:"A",telepon:"0813-1234-5678"},
  {nama:"Muhammad Rizki",email:"rizki.muh@gmail.com",picture:"M",telepon:"0856-7890-1234"},
];

// Check if real Supabase Google OAuth is available (env var set)
const HAS_SUPABASE_AUTH = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const googleSignIn = async (role) => {
  // If Supabase is configured, use real Google OAuth
  if (HAS_SUPABASE_AUTH) {
    try {
      const { data, error } = await _supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + window.location.pathname,
          queryParams: { access_type: "offline", prompt: "consent" },
          // Pass role intent via metadata (used by handle_new_user trigger)
          data: { role: role || "jamaah" },
        },
      });
      if (error) throw error;
      // signInWithOAuth redirects browser - this returns void
      return null; // caller should handle redirect-back scenario
    } catch (e) {
      console.warn("Supabase Google OAuth failed, falling back to mock:", e);
    }
  }
  // Fallback: mock for local demo
  return new Promise((resolve) => {
    const account = MOCK_GOOGLE_ACCOUNTS[Math.floor(Math.random() * MOCK_GOOGLE_ACCOUNTS.length)];
    setTimeout(() => resolve(account), 900);
  });
};

// Handle OAuth callback - resolve session into app state
const handleOAuthCallback = async () => {
  if (!HAS_SUPABASE_AUTH) return null;
  try {
    const { data: { session } } = await _supabaseClient.auth.getSession();
    if (!session?.user) return null;
    const user = session.user;
    return {
      nama: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0],
      email: user.email,
      picture: user.user_metadata?.avatar_url || user.user_metadata?.picture,
      telepon: user.phone || "",
      googleAuth: true,
      supabaseUserId: user.id,
      role: user.user_metadata?.role || "jamaah",
    };
  } catch (e) {
    console.warn("OAuth callback resolution failed:", e);
    return null;
  }
};

const SEED_TRX = [
  {id:1,type:"pemasukan",kategori:"Infaq Jumat",jumlah:3250000,tanggal:"2025-05-09",catatan:"Kotak infaq sholat Jumat",program:null,donatur:"Jamaah Umum"},
  {id:2,type:"pemasukan",kategori:"Donasi",jumlah:5000000,tanggal:"2025-05-08",catatan:"Donasi renovasi H. Mahmud",program:"Renovasi Atap",donatur:"H. Mahmud Fauzi"},
  {id:3,type:"pengeluaran",kategori:"Operasional",jumlah:850000,tanggal:"2025-05-07",catatan:"Listrik & air bulan April",program:null},
  {id:4,type:"pemasukan",kategori:"Zakat Fitrah",jumlah:14500000,tanggal:"2025-05-06",catatan:"Zakat fitrah 1446 H",program:null,donatur:"Jamaah"},
  {id:5,type:"pengeluaran",kategori:"Kegiatan",jumlah:3800000,tanggal:"2025-05-05",catatan:"Buka bersama anak yatim",program:"Santunan Yatim"},
  {id:6,type:"pemasukan",kategori:"Wakaf",jumlah:10000000,tanggal:"2025-05-03",catatan:"Wakaf pembangunan menara",program:"Menara Masjid",donatur:"Kel. H. Ridwan"},
  {id:7,type:"pengeluaran",kategori:"Renovasi",jumlah:9500000,tanggal:"2025-05-02",catatan:"Material genteng & besi",program:"Renovasi Atap"},
  {id:8,type:"pemasukan",kategori:"Infaq Jumat",jumlah:2900000,tanggal:"2025-04-25",catatan:"Kotak infaq Jumat",program:null,donatur:"Jamaah Umum"},
  {id:9,type:"pengeluaran",kategori:"Gaji/Honor",jumlah:2500000,tanggal:"2025-04-29",catatan:"Honor Imam & Muadzin",program:null},
  {id:10,type:"pemasukan",kategori:"Donasi",jumlah:1500000,tanggal:"2025-04-28",catatan:"Transfer Bu Sari",program:null,donatur:"Sari Wulandari"},
];
const SEED_PROG = [
  {id:1,nama:"Renovasi Atap",anggaran:50000000,terpakai:9500000,status:"aktif",deskripsi:"Renovasi total atap masjid",ikon:"🏗️",warna:C.gold},
  {id:2,nama:"Santunan Yatim",anggaran:10000000,terpakai:3800000,status:"aktif",deskripsi:"Santunan rutin anak yatim",ikon:"🤲",warna:C.green},
  {id:3,nama:"Menara Masjid",anggaran:80000000,terpakai:10000000,status:"aktif",deskripsi:"Pembangunan menara 15m",ikon:"🕌",warna:C.blue},
  {id:4,nama:"AC Ruang Utama",anggaran:25000000,terpakai:0,status:"rencana",deskripsi:"Pemasangan 4 unit AC",ikon:"❄️",warna:C.purple},
  {id:5,nama:"Perpustakaan",anggaran:15000000,terpakai:15000000,status:"selesai",deskripsi:"Pengadaan buku & rak",ikon:"📚",warna:C.textMute},
];
const SEED_DONATUR = [
  {id:1,nama:"H. Mahmud Fauzi",telepon:"0812-3456-7890",email:"",total:15000000,kali:3,terakhir:"2025-05-08",heema_account:false},
  {id:2,nama:"Sari Wulandari",telepon:"0898-7654-3210",email:"",total:3500000,kali:5,terakhir:"2025-04-28",heema_account:false},
  {id:3,nama:"Kel. H. Ridwan",telepon:"0811-1222-333",email:"",total:10000000,kali:1,terakhir:"2025-05-03",heema_account:false},
  {id:4,nama:"Jamaah Al-Ikhlas",telepon:"-",email:"",total:42000000,kali:24,terakhir:"2025-05-09",heema_account:false},
  {id:5,nama:"Hasan Maulana",telepon:"0812-9876-5432",email:"hasan@gmail.com",total:500000,kali:1,terakhir:"2025-04-20",heema_account:true,googleAuth:true},
];
const SEED_MASJID = [
  {id:"m1",nama:"Masjid Al-Ikhlas",slug:"al-ikhlas-jakarta",kota:"Jakarta Selatan",alamat:"Jl. Merdeka No. 12, Kebayoran Baru",status:"aktif",plan:"pro",users:4,trx:127,saldo:42500000,email:"admin@al-ikhlas.id",tgl:"2024-08-10",lat:-6.2440,lng:106.7989,foto:null,onboarded:true},
  {id:"m2",nama:"Masjid Baitul Makmur",slug:"baitul-makmur-bdg",kota:"Bandung",alamat:"Jl. Asia Afrika No. 88",status:"aktif",plan:"basic",users:3,trx:54,saldo:18750000,email:"admin@baitulmakmur.id",tgl:"2024-10-22",lat:-6.9218,lng:107.6091,foto:null,onboarded:true},
  {id:"m3",nama:"Masjid Nurul Iman",slug:"nurul-iman-sby",kota:"Surabaya",alamat:"Jl. Pemuda No. 25",status:"trial",plan:"gratis",users:1,trx:12,saldo:5200000,email:"admin@nuruliman.id",tgl:"2025-04-30",lat:-7.2575,lng:112.7521,foto:null,onboarded:true},
  {id:"m4",nama:"Masjid Ar-Rahman",slug:"ar-rahman-medan",kota:"Medan",alamat:"Jl. Sisingamangaraja No. 100",status:"aktif",plan:"basic",users:5,trx:89,saldo:31000000,email:"admin@ar-rahman.id",tgl:"2024-12-01",lat:3.5952,lng:98.6722,foto:null,onboarded:true},
  {id:"m5",nama:"Masjid Al-Hidayah",slug:"al-hidayah-mks",kota:"Makassar",alamat:"Jl. Sultan Hasanuddin No. 45",status:"suspend",plan:"basic",users:2,trx:0,saldo:8900000,email:"admin@alhidayah.id",tgl:"2024-09-15",lat:-5.1477,lng:119.4327,foto:null,onboarded:true},
  {id:"m6",nama:"Masjid At-Taqwa",slug:"at-taqwa-yogya",kota:"Yogyakarta",alamat:"Jl. Malioboro No. 33",status:"trial",plan:"gratis",users:1,trx:8,saldo:3100000,email:"admin@attaqwa.id",tgl:"2025-05-01",lat:-7.7956,lng:110.3695,foto:null,onboarded:true},
];
const SEED_USERS = [
  {id:"u1",nama:"Ahmad Fauzi",email:"ahmad@al-ikhlas.id",role:"admin",login:"2025-05-09 08:32",aktif:true},
  {id:"u2",nama:"Siti Rahayu",email:"siti@al-ikhlas.id",role:"bendahara",login:"2025-05-09 07:14",aktif:true},
  {id:"u3",nama:"M. Ridwan",email:"ridwan@al-ikhlas.id",role:"ketua",login:"2025-05-08 19:45",aktif:true},
  {id:"u4",nama:"Fatimah N.",email:"fatimah@al-ikhlas.id",role:"viewer",login:"2025-05-07 11:00",aktif:false},
];
const SEED_PROFILE = {nama_masjid:"Masjid Al-Ikhlas",alamat:"Jl. Merdeka No. 12",kota:"Jakarta Selatan",telepon:"021-1234567",email:"admin@al-ikhlas.id",website:"https://al-ikhlas.id",nama_admin:"Ahmad Fauzi"};
const SEED_PREFS = {wa:true,publik:true,reminder:false};
const SEED_NOTIFS = [
  {id:1,judul:"Transaksi baru tercatat",pesan:"Donasi Rp 5.000.000 dari H. Mahmud",waktu:"5 menit lalu",read:false,icon:"💰",warna:C.gold},
  {id:2,judul:"Laporan bulanan siap",pesan:"Laporan keuangan April 2025 telah dibuat",waktu:"2 jam lalu",read:false,icon:"📊",warna:C.blue},
  {id:3,judul:"Anggota tim baru",pesan:"Fatimah N. bergabung sebagai Viewer",waktu:"1 hari lalu",read:true,icon:"👤",warna:C.purple},
];
const SEED_AUDIT = [
  {id:1,user:"Super Admin",aksi:"AKTIFKAN_MASJID",target:"Masjid Nurul Iman",ip:"103.45.12.8",waktu:"2025-05-09 09:14"},
  {id:2,user:"Super Admin",aksi:"SUSPEND_MASJID",target:"Masjid Al-Hidayah",ip:"103.45.12.8",waktu:"2025-05-09 08:42"},
  {id:3,user:"Super Admin",aksi:"UBAH_PAKET",target:"Masjid Istiqomah → Pro",ip:"103.45.12.8",waktu:"2025-05-08 16:30"},
  {id:4,user:"Super Admin",aksi:"LOGIN",target:"superadmin@heema.id",ip:"103.45.12.8",waktu:"2025-05-09 08:00"},
];

// Donasi publik dari jamaah ke masjid (pending/confirmed)
const SEED_DONASI_PUBLIK = [
  {id:1,masjid_id:"m1",program:"Renovasi Atap",jamaah_nama:"Budi Santoso",jamaah_email:"budi@email.com",jumlah:500000,metode:"Transfer BCA",pesan:"Semoga renovasi berjalan lancar",status:"confirmed",tanggal:"2025-05-09"},
  {id:2,masjid_id:"m1",program:"Santunan Yatim",jamaah_nama:"Anonim",jamaah_email:"-",jumlah:1000000,metode:"QRIS",pesan:"",status:"confirmed",tanggal:"2025-05-08"},
  {id:3,masjid_id:"m1",program:null,jamaah_nama:"Hasan Maulana",jamaah_email:"hasan@email.com",jumlah:250000,metode:"Transfer Mandiri",pesan:"Untuk infaq umum",status:"pending",tanggal:"2025-05-09"},
];

// Akun jamaah (publik)
const SEED_JAMAAH = {nama:"Hasan Maulana",email:"hasan@email.com",telepon:"0812-9876-5432"};
const SEED_JAMAAH_DONASI = [
  {id:1,masjid_id:"m1",masjid_nama:"Masjid Al-Ikhlas",program:"Renovasi Atap",jumlah:500000,metode:"Transfer BCA",status:"confirmed",tanggal:"2025-04-20",ref:"HRA-A1B2C3D4"},
  {id:2,masjid_id:"m2",masjid_nama:"Masjid Baitul Makmur",program:null,jumlah:250000,metode:"QRIS",status:"confirmed",tanggal:"2025-04-15",ref:"HRA-E5F6G7H8"},
];
const PLANS = [
  {id:"gratis",nama:"Gratis",harga:0,fitur:["50 transaksi/bulan","2 pengguna","Dashboard dasar","Email support"]},
  {id:"basic",nama:"Basic",harga:49000,fitur:["500 transaksi/bulan","5 pengguna","Export PDF & Excel","Multi-admin","Laporan publik"]},
  {id:"pro",nama:"Pro",harga:149000,popular:true,fitur:["Transaksi unlimited","User unlimited","Notif WhatsApp","Custom domain","API Access","Support 24/7"]},
];
const KAT_IN  = ["Infaq Jumat","Donasi","Zakat Fitrah","Zakat Maal","Wakaf","Infaq Ramadhan","Lainnya"];
const KAT_OUT = ["Operasional","Kegiatan","Renovasi","Gaji/Honor","Pembelian","Sosial","Lainnya"];
const EMOJIS = ["🕌","🏗️","🤲","📚","❄️","💧","🌙","🎓","📿","🌿","🍽️","🎁"];
const COLORS = [C.gold,C.green,C.blue,C.purple,C.red,"#fb923c","#34d399","#facc15"];
const statusColor = {aktif:C.green,trial:C.gold,suspend:C.red,expired:C.textMute};
const statusBg    = {aktif:C.greenBg,trial:"#3a2a08",suspend:C.redBg,expired:"#1a2030"};
const statusLabel = {aktif:"Aktif",trial:"Trial",suspend:"Suspend",expired:"Expired"};
const roleColor   = {admin:C.gold,bendahara:C.blue,ketua:C.purple,viewer:C.textMute};
const roleLabel   = {admin:"Admin",bendahara:"Bendahara",ketua:"Ketua",viewer:"Viewer"};
const MONTHS = [{v:"01",l:"Januari"},{v:"02",l:"Februari"},{v:"03",l:"Maret"},{v:"04",l:"April"},{v:"05",l:"Mei"},{v:"06",l:"Juni"},{v:"07",l:"Juli"},{v:"08",l:"Agustus"},{v:"09",l:"September"},{v:"10",l:"Oktober"},{v:"11",l:"November"},{v:"12",l:"Desember"}];

let toastSetter = null;
const toast = (msg, type="success") => { if(toastSetter) toastSetter({msg,type,id:Date.now()}); };
function ToastHost() {
  const [t, setT] = useState(null);
  useEffect(()=>{ toastSetter = setT; return ()=>{toastSetter=null;}; }, []);
  useEffect(()=>{ if(t){ const x=setTimeout(()=>setT(null),2800); return ()=>clearTimeout(x);} }, [t]);
  if(!t) return null;
  const colors = {success:C.green,error:C.red,info:C.blue,gold:C.gold};
  const bgs = {success:C.greenBg,error:C.redBg,info:C.blueBg,gold:C.goldGlow};
  const icons = {success:"✓",error:"⚠",info:"ℹ",gold:"💎"};
  const col = colors[t.type], bg = bgs[t.type];
  return (
    <div className="fixed top-4 right-4 z-[100] slide-r">
      <div className="px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl" style={{background:bg,border:`1px solid ${col}66`,boxShadow:`0 8px 24px rgba(0,0,0,.4),0 0 0 1px ${col}33`,minWidth:240,maxWidth:360}}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{background:col+"22",color:col}}>{icons[t.type]}</div>
        <div className="text-sm font-semibold flex-1" style={{color:C.text}}>{t.msg}</div>
      </div>
    </div>
  );
}

let confirmSetter = null;
const confirmDialog = (opts) => new Promise(res => { if(confirmSetter) confirmSetter({...opts, resolve:res}); else res(false); });
function ConfirmHost() {
  const [c, setC] = useState(null);
  useEffect(()=>{ confirmSetter = setC; return ()=>{confirmSetter=null;}; }, []);
  if(!c) return null;
  const close = (v) => { c.resolve(v); setC(null); };
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 fi" style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden si bg-pattern-fine" style={{background:C.navy3,border:`1px solid ${c.danger?C.red:C.gold}55`}}>
        <div className="p-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3" style={{background:c.danger?C.redBg:C.goldGlow,border:`1px solid ${c.danger?C.red:C.gold}44`}}>{c.icon||(c.danger?"⚠":"❓")}</div>
          <div className="font-bold text-lg serif" style={{color:C.text}}>{c.title}</div>
          <div className="text-sm mt-1" style={{color:C.textDim}}>{c.message}</div>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <button onClick={()=>close(false)} className="press flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{background:C.navy4,color:C.textDim,border:`1px solid ${C.navy5}`}}>{c.cancelText||"Batal"}</button>
          <button onClick={()=>close(true)} className="press flex-1 py-2.5 rounded-lg text-sm font-bold" style={c.danger?{background:`linear-gradient(135deg,#7f1d1d,${C.red})`,color:"#fff"}:{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}}>{c.okText||"Konfirmasi"}</button>
        </div>
      </div>
    </div>
  );
}

const GoogleLogo = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const GoogleBtn = ({onClick, disabled, label="Lanjutkan dengan Google", full=true}) => (
  <button onClick={onClick} disabled={disabled} className={`press rounded-lg font-semibold text-sm py-2.5 transition-all inline-flex items-center justify-center gap-2.5 ${full?"w-full":""} ${disabled?"opacity-60 cursor-not-allowed":""}`}
    style={{background:"#fff",color:"#1a1a1a",border:`1.5px solid ${C.navy5}`,boxShadow:`0 2px 8px rgba(0,0,0,.15)`}}
    onMouseEnter={e=>!disabled&&(e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,.25)")}
    onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.15)"}>
    {disabled ? <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full spin"/> : <GoogleLogo size={18}/>}
    {label}
  </button>
);

const HeemaLogo = ({size=40, animate=false}) => (
  <div className={animate?"diamond-pulse":""} style={{width:size,height:size}}>
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id="dg1" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor={C.goldLt}/><stop offset="50%" stopColor={C.gold}/><stop offset="100%" stopColor={C.goldDk}/></linearGradient></defs>
      <path d="M24 4 L42 18 L24 44 L6 18 Z" fill="url(#dg1)" stroke={C.goldLt} strokeWidth="0.5"/>
      <path d="M24 4 L14 18 L24 18 Z" fill={C.goldLt} opacity="0.85"/>
      <path d="M24 4 L34 18 L24 18 Z" fill={C.goldDk} opacity="0.5"/>
      <path d="M6 18 L14 18 L24 4 Z" fill={C.gold}/>
      <path d="M42 18 L34 18 L24 4 Z" fill={C.goldDeep}/>
      <path d="M14 18 L24 44 L24 18 Z" fill={C.gold}/>
      <path d="M34 18 L24 44 L24 18 Z" fill={C.goldDk}/>
      <path d="M6 18 L24 44 L14 18 Z" fill={C.goldDeep} opacity="0.7"/>
      <path d="M42 18 L24 44 L34 18 Z" fill={C.goldDeep} opacity="0.9"/>
      <path d="M24 4 L24 44" stroke={C.goldLt} strokeWidth="0.5" opacity="0.6"/>
      <circle cx="20" cy="12" r="0.8" fill={C.goldLt}/>
    </svg>
  </div>
);

const I = {
  home:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M3 9l7-6 7 6v8a1 1 0 01-1 1h-3.5v-5h-5v5H4a1 1 0 01-1-1V9z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trx:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M3 8h11M9 17V3m6 14l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  prog:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M7 4H5a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1h-2M7 4a1 1 0 011-1h4a1 1 0 011 1M7 4a1 1 0 001 1h4a1 1 0 001-1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  lap:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M3 17v-5a1 1 0 011-1h2a1 1 0 011 1v5M9 17V8a1 1 0 011-1h0a1 1 0 011 1v9M15 17v-3a1 1 0 011-1h0a1 1 0 011 1v3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  team:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><circle cx="7" cy="6" r="3"/><path d="M2 17v-1a3 3 0 013-3h4a3 3 0 013 3v1M14 8a3 3 0 100-6M14 13a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  don:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M10 17s-6-4-6-9a3 3 0 016-1 3 3 0 016 1c0 5-6 9-6 9z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  set:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><circle cx="10" cy="10" r="2"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" strokeLinecap="round"/></svg>,
  bell:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M12 17H8v1a2 2 0 004 0v-1zm-2-9a4 4 0 00-4 4v3h8v-3a4 4 0 00-4-4zm0-3v2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  search:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M17 17l-3.5-3.5" strokeLinecap="round"/></svg>,
  plus:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>,
  x:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 5l10 10M5 15L15 5" strokeLinecap="round"/></svg>,
  chev:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  edit:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3"><path d="M9 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V8M11 2l3 3-7 7H4v-3l7-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trash:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3"><path d="M2 4h12M5 4V2a1 1 0 011-1h4a1 1 0 011 1v2M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  up:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M8 12V4M4 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  down:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M8 4v8M4 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  logout:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M13 4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3M9 14l-4-4 4-4M5 10h10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pdf:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2zM9 2v4h4M5 9h6M5 11h4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  excel:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M2 7h12M6 3v10M10 3v10" strokeLinecap="round"/></svg>,
  map:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M2 5l5-2 6 2 5-2v13l-5 2-6-2-5 2V5zM7 3v15M13 5v15" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pin:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M10 17s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="7" r="2"/></svg>,
  clock:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  list:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round"/></svg>,
  upload:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M10 12V3M5 8l5-5 5 5M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const Chip = ({label,color,bg,size="md"}) => (
  <span className={`inline-flex items-center font-semibold ${size==="sm"?"px-2 py-0.5 text-[10px]":"px-2.5 py-1 text-[11px]"}`}
    style={{color,background:bg||color+"18",border:`1px solid ${color}33`,borderRadius:6}}>{label}</span>
);
const GoldBadge = ({children,sm}) => (
  <span className={`inline-flex items-center font-bold uppercase tracking-wider ${sm?"px-1.5 py-0.5 text-[9px]":"px-2 py-0.5 text-[10px]"}`}
    style={{background:`linear-gradient(135deg,${C.goldDk},${C.goldLt})`,color:C.navy,borderRadius:4,letterSpacing:"0.08em"}}>{children}</span>
);
const Avatar = ({nama,size=36,gold}) => (
  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0 select-none"
    style={{width:size,height:size,fontSize:size*0.38,background:gold?`linear-gradient(135deg,${C.goldDeep},${C.goldDk})`:`linear-gradient(135deg,${C.navy3},${C.navy4})`,color:gold?C.goldLt:C.gold,border:`1.5px solid ${gold?C.gold:C.gold+"44"}`,boxShadow:gold?`0 4px 12px ${C.goldGlow}`:"none"}}>
    {nama?.[0]?.toUpperCase()||"?"}
  </div>
);
const Divider = ({className=""}) => <div className={`gold-divider ${className}`}/>;
const GoldBtn = ({children,onClick,outline,sm,disabled,className="",full,icon}) => {
  const baseStyle = sm?"px-3.5 py-2 text-xs":"px-5 py-2.5 text-sm";
  if(outline) return (
    <button onClick={onClick} disabled={disabled} className={`press font-semibold rounded-lg inline-flex items-center justify-center gap-1.5 ${baseStyle} ${full?"w-full":""} ${disabled?"opacity-40 cursor-not-allowed":""} ${className}`}
      style={{border:`1.5px solid ${C.gold}`,color:C.gold,background:"transparent"}}
      onMouseEnter={e=>!disabled&&(e.currentTarget.style.background=C.goldSoft)}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{icon}{children}</button>
  );
  return (
    <button onClick={onClick} disabled={disabled} className={`press font-bold rounded-lg inline-flex items-center justify-center gap-1.5 ${baseStyle} ${disabled?"opacity-40 cursor-not-allowed":""} ${full?"w-full":""} ${className}`}
      style={{background:`linear-gradient(135deg,${C.goldDk} 0%,${C.gold} 50%,${C.goldLt} 100%)`,color:"#1a1208",boxShadow:`0 4px 14px ${C.goldGlow}, inset 0 1px 0 ${C.goldLt}66`}}>{icon}{children}</button>
  );
};
const NavyBtn = ({children,onClick,sm,danger,className="",full,icon}) => (
  <button onClick={onClick} className={`press font-semibold rounded-lg inline-flex items-center justify-center gap-1.5 ${sm?"px-3.5 py-2 text-xs":"px-5 py-2.5 text-sm"} ${full?"w-full":""} ${className}`}
    style={{background:danger?C.redBg:C.navy3,color:danger?C.red:C.textDim,border:`1px solid ${danger?C.red+"44":C.navy5}`}}
    onMouseEnter={e=>{e.currentTarget.style.background=danger?"#4a1c1c":C.navy4;}}
    onMouseLeave={e=>{e.currentTarget.style.background=danger?C.redBg:C.navy3;}}>{icon}{children}</button>
);
const FieldLabel = ({children,sub}) => (
  <div className="mb-1.5 flex items-baseline justify-between">
    <label style={{color:C.textMute,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>{children}</label>
    {sub && <span className="text-[10px]" style={{color:C.textFaint}}>{sub}</span>}
  </div>
);
const Input = ({label,sub,value,onChange,placeholder,type="text",icon,autoFocus}) => (
  <div>
    {label && <FieldLabel sub={sub}>{label}</FieldLabel>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] pointer-events-none" style={{color:C.textMute}}>{icon}</span>}
      <input type={type} value={value||""} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
        className="w-full rounded-lg text-sm py-2.5 transition-all focus:outline-none"
        style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text,paddingLeft:icon?"2.5rem":"0.875rem",paddingRight:"0.875rem"}}
        onFocus={e=>{e.target.style.borderColor=C.gold+"99";e.target.style.background=C.navy4;}}
        onBlur={e=>{e.target.style.borderColor=C.navy5;e.target.style.background=C.navy3;}}/>
    </div>
  </div>
);
const Textarea = ({label,value,onChange,placeholder,rows=3}) => (
  <div>
    {label && <FieldLabel>{label}</FieldLabel>}
    <textarea value={value||""} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full rounded-lg text-sm py-2.5 px-3 focus:outline-none resize-none"
      style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text}}
      onFocus={e=>{e.target.style.borderColor=C.gold+"99";}}
      onBlur={e=>{e.target.style.borderColor=C.navy5;}}/>
  </div>
);
const Select = ({label,value,onChange,children}) => (
  <div>
    {label && <FieldLabel>{label}</FieldLabel>}
    <select value={value} onChange={e=>onChange&&onChange(e.target.value)}
      className="w-full rounded-lg text-sm py-2.5 px-3 focus:outline-none"
      style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text}}>{children}</select>
  </div>
);
const Card = ({children,className="",style={},gold}) => (
  <div className={`rounded-2xl ${className}`} style={{background:C.navy3,border:`1px solid ${gold?C.gold+"55":C.navy5}`,boxShadow:gold?`0 0 0 1px ${C.goldGlow},0 8px 24px rgba(0,0,0,.3)`:"0 4px 16px rgba(0,0,0,.2)",...style}}>{children}</div>
);
const Toggle = ({value,onChange}) => (
  <div onClick={()=>onChange(!value)} className="w-10 h-5 rounded-full relative press flex-shrink-0" style={{background:value?C.gold:C.navy5,boxShadow:value?`0 0 8px ${C.goldGlow}`:"none",transition:"background .2s"}}>
    <div className="absolute top-0.5 w-4 h-4 rounded-full" style={{background:"#fff",left:value?"22px":"2px",boxShadow:"0 1px 3px rgba(0,0,0,.4)",transition:"left .2s"}}/>
  </div>
);

const EmptyState = ({icon="📭",title,desc,action}) => (
  <div className="py-12 px-6 text-center">
    <div className="text-5xl mb-3 opacity-40 bounce inline-block">{icon}</div>
    <div className="font-bold serif text-lg" style={{color:C.textDim}}>{title}</div>
    {desc && <div className="text-xs mt-1 mb-4 max-w-xs mx-auto" style={{color:C.textMute}}>{desc}</div>}
    {action}
  </div>
);

const AnimatedNum = ({value,prefix="",format=fmt,className="",style={}}) => {
  const v = useCountUp(value, 700);
  return <span className={className} style={style}>{prefix}{format(v)}</span>;
};

const Skeleton = ({w="100%",h=16,r=8}) => <div className="skeleton" style={{width:w,height:h,borderRadius:r}}/>;

function Modal({open,onClose,title,subtitle,accent=C.gold,children,size="md"}) {
  useEffect(()=>{ if(open) document.body.style.overflow="hidden"; return()=>{document.body.style.overflow="";}; },[open]);
  useEffect(()=>{
    if(!open) return;
    const h = e => { if(e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if(!open) return null;
  const maxW = {sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg"}[size];
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center fi p-0 sm:p-4" style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div className={`w-full ${maxW} si overflow-hidden bg-pattern-fine`} onClick={e=>e.stopPropagation()}
        style={{background:C.navy3,borderRadius:"1.25rem 1.25rem 0 0",border:`1px solid ${accent}66`,borderBottomColor:"transparent",boxShadow:`0 -8px 40px rgba(0,0,0,.5),0 0 0 1px ${accent}22`,maxHeight:"90vh",display:"flex",flexDirection:"column"}}>
        <div className="flex justify-center pt-2 pb-1 sm:hidden flex-shrink-0"><div className="w-10 h-1 rounded-full" style={{background:C.navy5}}/></div>
        <div className="px-5 pt-3 pb-4 flex-shrink-0" style={{borderBottom:`1px solid ${accent}33`}}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 rounded-full" style={{background:accent}}/>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:accent}}>{subtitle||"Heema"}</div>
              </div>
              <div className="font-semibold text-lg mt-1 serif" style={{color:C.text}}>{title}</div>
            </div>
            <button onClick={onClose} className="press w-8 h-8 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute,border:`1px solid ${C.navy5}`}}>{I.x}</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

const BANNERS = [
  {title:"Selamat Datang di HEEMA",sub:"Platform pengelolaan keuangan masjid terpercaya",emoji:"💎",accent:C.gold,kicker:"Mulai Perjalanan"},
  {title:"Zakat Fitrah 1446 H",sub:"Pengelolaan & distribusi yang transparan",emoji:"🌙",accent:C.blue,kicker:"Bulan Ramadhan"},
  {title:"Renovasi Atap Masjid",sub:"Progress 19% — Mari bersama membangun",emoji:"🏗️",accent:C.purple,kicker:"Program Aktif"},
  {title:"Laporan Mei 2025",sub:"Pemasukan meningkat 23% dari April",emoji:"📈",accent:C.green,kicker:"Update Terbaru"},
];
function BannerSlider() {
  const [cur,setCur] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setCur(c=>(c+1)%BANNERS.length),4200);return()=>clearInterval(t);},[]);
  const b = BANNERS[cur];
  return (
    <div className="relative rounded-2xl overflow-hidden bg-pattern-fine" style={{background:`linear-gradient(135deg,${C.navy3} 0%,${C.navy2} 100%)`,border:`1px solid ${b.accent}44`,minHeight:120,boxShadow:`0 0 32px ${b.accent}15`,transition:"all .6s ease"}}>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 60% 80% at 95% 50%, ${b.accent}22 0%, transparent 70%)`}}/>
      <div className="relative p-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1 h-3 rounded-full" style={{background:b.accent}}/>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:b.accent}}>{b.kicker}</span>
          </div>
          <div className="font-bold serif" style={{color:C.text,fontSize:18}}>{b.title}</div>
          <div className="text-xs mt-1" style={{color:C.textDim}}>{b.sub}</div>
        </div>
        <div className="text-5xl float" style={{filter:`drop-shadow(0 4px 12px ${b.accent}66)`}}>{b.emoji}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${b.accent}aa,transparent)`}}/>
      <div className="absolute bottom-3 left-5 flex gap-1.5">
        {BANNERS.map((_,i)=>(<div key={i} onClick={()=>setCur(i)} className="press rounded-full" style={{width:i===cur?20:5,height:5,background:i===cur?b.accent:C.navy5,transition:"all .3s"}}/>))}
      </div>
    </div>
  );
}

function Sparkline({values=[],color=C.gold}) {
  const mx=Math.max(...values,1),mn=Math.min(...values);
  const r=mx-mn||1, W=78,H=30;
  const pts=values.map((v,i)=>[i*(W/(values.length-1||1)),(1-(v-mn)/r)*(H-4)+2]);
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  if(values.length<2) return null;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.length>0 && <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.5" fill={color}/>}
    </svg>
  );
}
function BarChart({data,colors}) {
  const mx=Math.max(...data.flatMap(d=>d.vals),1);
  return (
    <div className="flex items-end gap-1.5" style={{height:90}}>
      {data.map((d,i)=>(
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full flex gap-0.5 items-end" style={{height:70}}>
            {d.vals.map((v,ci)=>(<div key={ci} className="flex-1 rounded-t" style={{background:`linear-gradient(180deg,${colors[ci]},${colors[ci]}99)`,height:`${(v/mx)*100}%`,minHeight:v>0?3:0,boxShadow:`0 0 8px ${colors[ci]}44`}}/>))}
          </div>
          <span style={{fontSize:10,color:C.textMute,fontWeight:600}}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function exportCSV(rows, filename) {
  if(!rows.length) { toast("Tidak ada data untuk diekspor","error"); return; }
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r=>headers.map(h=>`"${String(r[h]||"").replace(/"/g,'""')}"`).join(","))].join("\n");
  const blob = new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  toast(`File ${filename} berhasil diunduh`,"success");
}

// Export to Excel-compatible HTML format (.xls) - opens cleanly in Excel/Sheets
// Image upload helper - converts to base64 and validates square aspect ratio
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const validateSquareImage = (dataUrl, tolerance=0.15) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    const ratio = img.width / img.height;
    resolve({
      valid: Math.abs(ratio - 1) <= tolerance,
      width: img.width,
      height: img.height,
      ratio
    });
  };
  img.onerror = () => resolve({valid:false,width:0,height:0,ratio:0});
  img.src = dataUrl;
});

// Resize/compress image to max dimension while keeping aspect ratio
const resizeImage = (dataUrl, maxSize=800) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    let {width, height} = img;
    const scale = Math.min(1, maxSize / Math.max(width, height));
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    resolve(canvas.toDataURL("image/jpeg", 0.85));
  };
  img.onerror = () => resolve(dataUrl);
  img.src = dataUrl;
});

// Compress to non-square ratio (for masjid photos)
const compressImage = (dataUrl, maxW=1200, maxH=900) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    let {width, height} = img;
    const scaleW = maxW / width, scaleH = maxH / height;
    const scale = Math.min(1, scaleW, scaleH);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    resolve(canvas.toDataURL("image/jpeg", 0.82));
  };
  img.onerror = () => resolve(dataUrl);
  img.src = dataUrl;
});

// Google Maps integration
// IMPORTANT: Replace with your own API key in production
// Get key at: https://console.cloud.google.com/google/maps-apis
const GMAPS_KEY = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // demo public key (works for demos)

let gmapsLoadPromise = null;
const loadGoogleMaps = () => {
  if(window.google?.maps) return Promise.resolve(window.google.maps);
  if(gmapsLoadPromise) return gmapsLoadPromise;
  gmapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places&loading=async&callback=__heemaGmapsReady`;
    script.async = true;
    script.defer = true;
    window.__heemaGmapsReady = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error("Gagal memuat Google Maps. Periksa koneksi atau API key."));
    document.head.appendChild(script);
  });
  return gmapsLoadPromise;
};

// Google Geocoding helper - reverse geocode lat/lng to readable address
const reverseGeocode = async (lat, lng) => {
  try {
    const maps = await loadGoogleMaps();
    const geocoder = new maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({location:{lat, lng}}, (results, status) => {
        if(status === "OK" && results[0]) {
          const r = results[0];
          // Extract city
          const cityComp = r.address_components.find(c=>c.types.includes("administrative_area_level_2"));
          const provComp = r.address_components.find(c=>c.types.includes("administrative_area_level_1"));
          resolve({
            full:r.formatted_address,
            city:cityComp?.long_name?.replace("Kota ","")?.replace("Kabupaten ","")||provComp?.long_name||"Unknown",
          });
        } else {
          resolve(null);
        }
      });
    });
  } catch { return null; }
};

// Haversine distance in km
const calcDistance = (lat1, lng1, lat2, lng2) => {
  if(!lat1||!lng1||!lat2||!lng2) return Infinity;
  const R = 6371;
  const toRad = d => d*Math.PI/180;
  const dLat = toRad(lat2-lat1), dLng = toRad(lng2-lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const fmtDistance = (km) => {
  if(km === Infinity) return "—";
  if(km < 1) return `${Math.round(km*1000)} m`;
  if(km < 100) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
};

// Get geolocation
const getGeoLocation = () => new Promise((resolve) => {
  if(!navigator.geolocation) { resolve(null); return; }
  navigator.geolocation.getCurrentPosition(
    (pos) => resolve({lat:pos.coords.latitude, lng:pos.coords.longitude, accuracy:pos.coords.accuracy}),
    () => resolve(null),
    {enableHighAccuracy:true, timeout:10000, maximumAge:300000}
  );
});

// Reverse geocode lat/lng to nearest city name using a simple Indonesian city table
const ID_CITIES = [
  {name:"Jakarta",lat:-6.2088,lng:106.8456},
  {name:"Bandung",lat:-6.9175,lng:107.6191},
  {name:"Surabaya",lat:-7.2575,lng:112.7521},
  {name:"Medan",lat:3.5952,lng:98.6722},
  {name:"Makassar",lat:-5.1477,lng:119.4327},
  {name:"Yogyakarta",lat:-7.7956,lng:110.3695},
  {name:"Semarang",lat:-6.9667,lng:110.4167},
  {name:"Denpasar",lat:-8.6500,lng:115.2167},
  {name:"Palembang",lat:-2.9909,lng:104.7568},
  {name:"Pekanbaru",lat:0.5333,lng:101.4500},
];

const nearestCity = (lat,lng) => {
  if(!lat||!lng) return null;
  let nearest=ID_CITIES[0], minDist=Infinity;
  ID_CITIES.forEach(c=>{ const d=calcDistance(lat,lng,c.lat,c.lng); if(d<minDist){minDist=d;nearest=c;} });
  return {city:nearest.name, distance:minDist};
};

// Simplified prayer time calculator (uses approximation for Indonesia)
// In production: use adhan-js library for precise astronomical calculation
const calcPrayerTimes = (lat, lng, date=new Date()) => {
  // Time zone offset (Indonesia: WIB=+7, WITA=+8, WIT=+9)
  // Determine timezone based on longitude
  const tzOffset = lng < 105 ? 7 : (lng < 120 ? 7 : (lng < 135 ? 8 : 9));
  
  // Day of year for solar declination
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(),0,0)) / 86400000);
  
  // Solar declination
  const decl = 23.45 * Math.sin(((360/365)*(dayOfYear-81))*Math.PI/180);
  const declRad = decl * Math.PI/180;
  const latRad = lat * Math.PI/180;
  
  // Equation of time (simplified)
  const B = (360/365)*(dayOfYear-81)*Math.PI/180;
  const eot = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B);
  
  // Solar noon (Dzuhur)
  const solarNoon = 12 - (lng/15) + tzOffset - eot/60;
  
  // Hour angle for various depression angles
  const hourAngle = (depression) => {
    const dep = depression * Math.PI/180;
    const cosH = (Math.sin(-dep) - Math.sin(latRad)*Math.sin(declRad)) / (Math.cos(latRad)*Math.cos(declRad));
    if(cosH > 1 || cosH < -1) return null;
    return Math.acos(cosH) * 180/Math.PI / 15;
  };
  
  const ha_sunrise = hourAngle(0.833); // Sunrise/sunset
  const ha_fajr = hourAngle(20);       // Subuh: 20° below horizon (MUI Indonesia)
  const ha_isya = hourAngle(18);       // Isya: 18° below horizon
  
  const formatTime = (decimal) => {
    if(decimal === null || isNaN(decimal)) return "—";
    decimal = ((decimal % 24) + 24) % 24;
    const h = Math.floor(decimal);
    const m = Math.round((decimal-h)*60);
    return `${String(h).padStart(2,"0")}:${String(m===60?0:m).padStart(2,"0")}`;
  };
  
  // Ashar shadow length ratio (Shafi'i: shadow = object + noon shadow)
  const noonShadow = Math.tan(Math.abs(latRad-declRad));
  const asharShadow = 1 + noonShadow;
  const asharDep = -Math.atan(1/asharShadow)*180/Math.PI;
  const ha_ashar = hourAngle(asharDep);
  
  return {
    subuh:   formatTime(solarNoon - ha_fajr),
    terbit:  formatTime(solarNoon - ha_sunrise),
    dzuhur:  formatTime(solarNoon),
    ashar:   formatTime(solarNoon + ha_ashar),
    maghrib: formatTime(solarNoon + ha_sunrise),
    isya:    formatTime(solarNoon + ha_isya),
  };
};

// Get next prayer
const nextPrayer = (times) => {
  const now = new Date();
  const curMin = now.getHours()*60 + now.getMinutes();
  const order = [
    {key:"subuh", label:"Subuh"},
    {key:"dzuhur", label:"Dzuhur"},
    {key:"ashar", label:"Ashar"},
    {key:"maghrib", label:"Maghrib"},
    {key:"isya", label:"Isya"},
  ];
  for(const p of order) {
    const [h,m] = times[p.key].split(":").map(Number);
    const t = h*60+m;
    if(t > curMin) return {...p, time:times[p.key], minutesLeft:t-curMin};
  }
  // After Isya - next is tomorrow Subuh
  const [h,m] = times.subuh.split(":").map(Number);
  return {key:"subuh", label:"Subuh", time:times.subuh, minutesLeft:(24*60-curMin)+h*60+m, isTomorrow:true};
};

function exportExcel(opts) {
  const {title, subtitle, rows, summary, filename, masjid} = opts;
  if(!rows || !rows.length) { toast("Tidak ada data untuk diekspor","error"); return; }
  const headers = Object.keys(rows[0]);
  const summaryRows = summary ? Object.entries(summary).map(([k,v])=>
    `<tr><td colspan="${Math.max(1,headers.length-1)}" style="font-weight:bold;background:#fef3c7;border:1px solid #d4af37;padding:8px;">${k}</td><td style="text-align:right;font-weight:bold;background:#fef3c7;border:1px solid #d4af37;padding:8px;color:#9c7a26;">${v}</td></tr>`
  ).join("") : "";
  
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
<style>
  body{font-family:Arial,sans-serif;}
  .meta{background:#08111f;color:#d4af37;padding:14px;font-size:11px;}
  .meta b{font-size:18px;font-family:Georgia,serif;letter-spacing:2px;}
  table{border-collapse:collapse;width:100%;margin-top:8px;}
  th{background:#142545;color:#d4af37;padding:10px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;border:1px solid #264470;}
  td{padding:8px 10px;border:1px solid #e5e7eb;font-size:12px;}
  tr:nth-child(even) td{background:#f9fafb;}
  .num{text-align:right;font-variant-numeric:tabular-nums;}
  .title{font-size:16px;font-weight:bold;color:#9c7a26;padding:10px 0;border-bottom:2px solid #d4af37;}
</style></head>
<body>
<div class="meta"><b>◆ HEEMA ◆</b><br>${masjid?.nama_masjid||"Heema"} · ${masjid?.kota||""}<br>Tercetak: ${new Date().toLocaleString("id-ID")}</div>
<div class="title">${title}</div>
${subtitle?`<div style="font-size:11px;color:#666;padding:4px 0;">${subtitle}</div>`:""}
<table>
  <thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map(r=>`<tr>${headers.map(h=>{
    const v=r[h]; const isNum=typeof v==="number";
    return `<td${isNum?' class="num"':''}>${v===null||v===undefined?"":v}</td>`;
  }).join("")}</tr>`).join("")}
  ${summaryRows}
  </tbody>
</table>
</body></html>`;

  const blob = new Blob([html],{type:"application/vnd.ms-excel"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename.replace(/\.csv$/,"") + ".xls"; a.click();
  URL.revokeObjectURL(url);
  toast(`File ${a.download} berhasil diunduh`,"success");
}
function exportPDF(opts) {
  // Support both old signature (title, rows, filename) and new (opts object)
  if(typeof opts === "string") {
    opts = {title:opts, rows:arguments[1], filename:arguments[2]};
  }
  const {title, subtitle, rows, summary, filename, masjid, columns} = opts;
  if(!rows || !rows.length) { toast("Tidak ada data untuk diekspor","error"); return; }
  const headers = columns || Object.keys(rows[0]);
  const summaryHTML = summary ? `
    <div class="summary">
      ${Object.entries(summary).map(([k,v])=>`<div class="sum-item"><div class="sum-label">${k}</div><div class="sum-val">${v}</div></div>`).join("")}
    </div>` : "";
  
  const html = `<html><head><title>${title} — Heema</title><style>
    @page{size:A4;margin:1.5cm;}
    *{box-sizing:border-box;}
    body{font-family:'Helvetica','Arial',sans-serif;color:#1a1a1a;line-height:1.5;margin:0;}
    .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:3px double #d4af37;margin-bottom:18px;}
    .brand{display:flex;align-items:center;gap:12px;}
    .diamond{width:36px;height:36px;background:linear-gradient(135deg,#f0d97a,#d4af37,#9c7a26);transform:rotate(45deg);border-radius:4px;}
    .logo-text{font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#9c7a26;letter-spacing:3px;}
    .tagline{font-size:9px;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:2px;}
    .meta{text-align:right;font-size:10px;color:#666;}
    .meta b{color:#1a1a1a;}
    .masjid-info{background:linear-gradient(135deg,#142545,#08111f);color:#fff;padding:14px 18px;border-radius:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;}
    .masjid-info .nama{font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#d4af37;}
    .masjid-info .kota{font-size:11px;color:#a8bdd8;margin-top:2px;}
    .masjid-info .badge{padding:4px 10px;background:#d4af37;color:#08111f;border-radius:4px;font-size:10px;font-weight:bold;letter-spacing:1px;}
    h1{font-family:Georgia,serif;color:#9c7a26;font-size:22px;margin:0 0 4px 0;padding-bottom:6px;}
    .sub{font-size:11px;color:#666;margin-bottom:16px;}
    .summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin:12px 0 18px 0;}
    .sum-item{padding:10px 12px;background:#fef9e8;border:1px solid #d4af37;border-radius:6px;}
    .sum-label{font-size:9px;color:#9c7a26;text-transform:uppercase;letter-spacing:1px;font-weight:bold;}
    .sum-val{font-size:14px;color:#1a1a1a;font-weight:bold;margin-top:3px;font-variant-numeric:tabular-nums;}
    table{width:100%;border-collapse:collapse;margin-top:8px;font-size:11px;}
    th{background:#08111f;color:#d4af37;padding:9px 8px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #142545;}
    td{padding:7px 8px;border:1px solid #e5e7eb;vertical-align:top;}
    tr:nth-child(even) td{background:#f9fafb;}
    .num{text-align:right;font-variant-numeric:tabular-nums;font-weight:600;}
    .pos{color:#16a34a;}
    .neg{color:#dc2626;}
    .footer{margin-top:24px;padding-top:14px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#666;}
    .footer-center{text-align:center;font-style:italic;color:#9c7a26;}
    .signature{margin-top:30px;display:flex;justify-content:space-around;text-align:center;font-size:10px;}
    .sig-box{width:30%;}
    .sig-line{border-top:1px solid #1a1a1a;margin-top:50px;padding-top:4px;}
    @media print{body{padding:0;}.no-print{display:none;}}
  </style></head><body>
  <div class="header">
    <div class="brand"><div class="diamond"></div><div><div class="logo-text">HEEMA</div><div class="tagline">Masjid Finance Platform</div></div></div>
    <div class="meta">No. Dok: <b>HRA-${Date.now().toString().slice(-8)}</b><br>Tercetak: <b>${new Date().toLocaleString("id-ID")}</b></div>
  </div>
  ${masjid ? `<div class="masjid-info"><div><div class="nama">${masjid.nama_masjid||""}</div><div class="kota">📍 ${masjid.kota||""} ${masjid.alamat?`· ${masjid.alamat}`:""}</div></div><div class="badge">RESMI</div></div>` : ""}
  <h1>${title}</h1>
  ${subtitle ? `<div class="sub">${subtitle}</div>` : ""}
  ${summaryHTML}
  <table>
    <thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r=>`<tr>${headers.map(h=>{
      const v=r[h]; const s=String(v||"");
      const isNum=typeof v==="number"||/^[-+]?Rp/.test(s);
      const isNeg=s.startsWith("-Rp")||s.startsWith("-");
      const cls=isNum?(isNeg?"num neg":"num pos"):"";
      return `<td class="${cls}">${v===null||v===undefined?"—":v}</td>`;
    }).join("")}</tr>`).join("")}
    </tbody>
  </table>
  <div class="signature">
    <div class="sig-box"><div class="sig-line">Bendahara</div></div>
    <div class="sig-box"><div class="sig-line">Ketua</div></div>
    <div class="sig-box"><div class="sig-line">Mengetahui</div></div>
  </div>
  <div class="footer">
    <div>${masjid?.nama_masjid||"Heema"} · Halaman 1</div>
    <div class="footer-center">Dokumen ini diterbitkan oleh sistem Heema secara otomatis</div>
    <div>heema.id</div>
  </div>
  </body></html>`;
  
  const win = window.open("","_blank");
  if(!win) { toast("Browser memblokir pop-up","error"); return; }
  win.document.write(html); win.document.close();
  setTimeout(()=>{ win.print(); toast(`${filename||title} siap dicetak/disimpan PDF`,"success"); }, 600);
}

function printReceipt(trx, profile) {
  const isMasuk = trx.type === "pemasukan";
  const html = `<html><head><title>Bukti Transaksi</title><style>
    body{font-family:'Courier New',monospace;padding:20px;max-width:380px;margin:0 auto;color:#1a1a1a;}
    .receipt{border:2px dashed #9c7a26;padding:20px;border-radius:8px;}
    .header{text-align:center;border-bottom:1px dashed #9c7a26;padding-bottom:12px;margin-bottom:12px;}
    .logo{font-size:24px;font-weight:bold;color:#9c7a26;font-family:Georgia,serif;letter-spacing:2px;}
    .masjid{font-size:14px;font-weight:bold;margin-top:6px;}
    .city{font-size:11px;color:#666;}
    .type{text-align:center;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:10px 0;padding:4px;background:${isMasuk?"#fef3c7":"#fee2e2"};color:${isMasuk?"#9c7a26":"#7f1d1d"};}
    .amount{text-align:center;font-size:24px;font-weight:bold;margin:14px 0;color:${isMasuk?"#9c7a26":"#7f1d1d"};}
    .row{display:flex;justify-content:space-between;font-size:11px;margin:6px 0;border-bottom:1px dotted #ccc;padding-bottom:4px;}
    .row b{font-weight:bold;}
    .footer{text-align:center;margin-top:14px;padding-top:12px;border-top:1px dashed #9c7a26;font-size:10px;color:#666;}
    .note{font-style:italic;font-size:10px;color:#555;margin-top:6px;text-align:center;}
    @media print{body{padding:0}.receipt{border:none}}
    </style></head><body><div class="receipt">
    <div class="header"><div class="logo">◆ HEEMA ◆</div><div class="masjid">${profile.nama_masjid}</div><div class="city">${profile.kota}</div></div>
    <div class="type">BUKTI ${isMasuk?"PEMASUKAN":"PENGELUARAN"}</div>
    <div class="amount">${fmt(trx.jumlah)}</div>
    <div class="row"><span>No. Ref</span><b>HRA-${String(trx.id).slice(-8)}</b></div>
    <div class="row"><span>Tanggal</span><b>${fmtDate(trx.tanggal)}</b></div>
    <div class="row"><span>Kategori</span><b>${trx.kategori}</b></div>
    ${trx.donatur ? `<div class="row"><span>Dari</span><b>${trx.donatur}</b></div>` : ""}
    ${trx.program ? `<div class="row"><span>Program</span><b>${trx.program}</b></div>` : ""}
    ${trx.catatan ? `<div class="note">"${trx.catatan}"</div>` : ""}
    <div class="footer">Jazaakumullaahu khairan ✨<br>Tercetak: ${new Date().toLocaleString("id-ID")}</div>
    </div></body></html>`;
  const win = window.open("","_blank");
  if(!win) { toast("Browser memblokir pop-up","error"); return; }
  win.document.write(html); win.document.close();
  setTimeout(()=>{ win.print(); toast("Bukti transaksi siap dicetak","success"); }, 500);
}

function TrxForm({onSave,onClose,programs,editData,defaultType}) {
  const [form,setForm]=useState(editData||{type:defaultType||"pemasukan",kategori:"Infaq Jumat",jumlah:"",tanggal:today(),catatan:"",program:"",donatur:""});
  const [displayAmount,setDisplayAmount]=useState(editData?.jumlah?fmtNum(editData.jumlah):"");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const kats=form.type==="pemasukan"?KAT_IN:KAT_OUT;
  const isMasuk=form.type==="pemasukan";
  const accent = isMasuk?C.gold:C.red;
  const amount = parseAmount(displayAmount);
  const valid = amount > 0 && form.tanggal && form.kategori;

  const handleAmount = (raw) => {
    const formatted = fmtAmountInput(raw);
    setDisplayAmount(formatted);
    set("jumlah", parseAmount(raw));
  };

  const quickAmounts = isMasuk ? [50000, 100000, 250000, 500000, 1000000] : [50000, 100000, 250000, 500000];

  useKey("Enter", e => {
    if(e.target.tagName === "TEXTAREA") return;
    if(valid) { e.preventDefault(); onSave({...form,jumlah:amount}); }
  }, [valid, amount, form]);

  return (
    <>
      <div className="p-5 space-y-4">
        <div className="flex rounded-lg overflow-hidden p-1 gap-1" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
          {["pemasukan","pengeluaran"].map(t=>(
            <button key={t} onClick={()=>{set("type",t);set("kategori",t==="pemasukan"?"Infaq Jumat":"Operasional");}} className="flex-1 py-2 text-xs font-bold press rounded-md"
              style={form.type===t?{background:t==="pemasukan"?`linear-gradient(135deg,${C.goldDk},${C.gold},${C.goldLt})`:`linear-gradient(135deg,#7f1d1d,${C.red})`,color:t==="pemasukan"?"#1a1208":"#fff"}:{color:C.textMute}}>
              {t==="pemasukan"?"⬆ Pemasukan":"⬇ Pengeluaran"}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-5 text-center" style={{background:C.navy2,border:`1px solid ${accent}44`}}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5" style={{color:C.textMute}}>Jumlah</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-base font-semibold" style={{color:C.textMute}}>Rp</span>
            <input inputMode="numeric" value={displayAmount} onChange={e=>handleAmount(e.target.value)} placeholder="0" autoFocus
              className="text-3xl font-bold text-center bg-transparent focus:outline-none font-num" style={{color:accent,maxWidth:"75%"}}/>
          </div>
          {amount>0 && <div className="text-xs mt-2 font-medium" style={{color:C.textDim}}>{fmt(amount)}</div>}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {quickAmounts.map(qa=>(
              <button key={qa} onClick={()=>handleAmount(String(qa))} className="press px-2.5 py-1 rounded-md text-[10px] font-bold transition" 
                style={{background:amount===qa?accent+"33":C.navy3,color:amount===qa?accent:C.textMute,border:`1px solid ${amount===qa?accent+"55":C.navy5}`}}>
                +{fmtS(qa)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Kategori" value={form.kategori} onChange={v=>set("kategori",v)}>{kats.map(k=><option key={k}>{k}</option>)}</Select>
          <Input label="Tanggal" type="date" value={form.tanggal} onChange={v=>set("tanggal",v)}/>
        </div>
        <Select label="Program (opsional)" value={form.program||""} onChange={v=>set("program",v)}>
          <option value="">— Tidak Terkait Program —</option>
          {programs.map(p=><option key={p.id} value={p.nama}>{p.nama}</option>)}
        </Select>
        {isMasuk && <Input label="Nama Donatur (opsional)" value={form.donatur} onChange={v=>set("donatur",v)} placeholder="Nama donatur..." icon="👤"/>}
        <Input label="Catatan" value={form.catatan} onChange={v=>set("catatan",v)} placeholder="Keterangan transaksi..." icon="📝"/>
      </div>
      <div className="px-5 py-4 flex gap-3 safe-bottom" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        <NavyBtn onClick={onClose} full>Batal</NavyBtn>
        <GoldBtn onClick={()=>onSave({...form,jumlah:amount})} disabled={!valid} full>{editData?"Update":"Simpan"} Transaksi</GoldBtn>
      </div>
    </>
  );
}

function ProgramForm({onSave,onClose,editData}) {
  const [form,setForm]=useState(editData||{nama:"",anggaran:"",deskripsi:"",status:"rencana",ikon:"🕌",warna:C.gold,terpakai:0,pamflet:null});
  const [displayAng,setDisplayAng]=useState(editData?.anggaran?fmtNum(editData.anggaran):"");
  const [uploading,setUploading]=useState(false);
  const [uploadErr,setUploadErr]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid = form.nama && parseAmount(displayAng) > 0;
  const handleAng = (raw) => { setDisplayAng(fmtAmountInput(raw)); set("anggaran", parseAmount(raw)); };
  
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setUploadErr("");
    if(!file.type.startsWith("image/")) { setUploadErr("File harus berupa gambar"); return; }
    if(file.size > 5*1024*1024) { setUploadErr("Ukuran maksimal 5MB"); return; }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const check = await validateSquareImage(base64, 0.15);
      if(!check.valid) {
        setUploadErr(`Gambar harus rasio kotak (1:1). Saat ini ${check.width}×${check.height} px (rasio ${check.ratio.toFixed(2)})`);
        setUploading(false);
        return;
      }
      const resized = await resizeImage(base64, 800);
      set("pamflet", resized);
      setUploading(false);
      toast("Pamflet berhasil diunggah","success");
    } catch(err) {
      setUploadErr("Gagal memproses gambar");
      setUploading(false);
    }
  };

  return (
    <>
      <div className="p-5 space-y-4">
        {/* PAMFLET UPLOAD */}
        <div>
          <FieldLabel sub="Rasio 1:1 · Max 5MB">Pamflet Program</FieldLabel>
          {form.pamflet ? (
            <div className="relative rounded-xl overflow-hidden" style={{aspectRatio:"1/1",background:C.navy2,border:`1px solid ${C.gold}55`}}>
              <img src={form.pamflet} alt="Pamflet" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 flex items-end justify-between p-2 pointer-events-none" style={{background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)"}}>
                <div className="px-2 py-1 rounded text-[10px] font-bold pointer-events-auto" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)"}}>✓ Pamflet aktif</div>
                <button onClick={()=>set("pamflet",null)} className="press w-8 h-8 rounded-full flex items-center justify-center pointer-events-auto" style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}44`,backdropFilter:"blur(8px)"}}>{I.trash}</button>
              </div>
            </div>
          ) : (
            <label className="press rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all" 
              style={{aspectRatio:"1/1",background:C.navy2,border:`2px dashed ${uploadErr?C.red:C.gold+"55"}`,minHeight:200}}>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden"/>
              {uploading ? (
                <>
                  <div className="w-10 h-10 border-3 border-yellow-700 border-t-yellow-400 rounded-full spin"/>
                  <div className="text-xs mt-3 font-semibold" style={{color:C.gold}}>Memproses gambar...</div>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-sm font-bold" style={{color:C.gold}}>Upload Pamflet</div>
                  <div className="text-[10px] mt-1 text-center px-4" style={{color:C.textMute}}>Klik untuk pilih gambar<br/>Rasio kotak (1:1) · JPG/PNG max 5MB</div>
                </>
              )}
            </label>
          )}
          {uploadErr && <div className="mt-2 rounded-lg px-3 py-2 text-xs font-semibold" style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}44`}}>⚠ {uploadErr}</div>}
        </div>
        
        <div>
          <FieldLabel>Ikon Program</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map(e=>(<button key={e} onClick={()=>set("ikon",e)} className="press w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={form.ikon===e?{background:C.gold+"22",border:`2px solid ${C.gold}`,boxShadow:`0 0 12px ${C.goldGlow}`}:{background:C.navy2,border:`1px solid ${C.navy5}`}}>{e}</button>))}
          </div>
        </div>
        <div>
          <FieldLabel>Warna</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c=>(<button key={c} onClick={()=>set("warna",c)} className="press w-10 h-10 rounded-xl"
              style={{background:c,opacity:form.warna===c?1:0.4,border:form.warna===c?`2px solid #fff`:"none",boxShadow:form.warna===c?`0 0 12px ${c}88`:"none"}}/>))}
          </div>
        </div>
        <Input label="Nama Program" value={form.nama} onChange={v=>set("nama",v)} placeholder="Nama program kegiatan" icon="📌"/>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Anggaran</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold pointer-events-none" style={{color:C.textMute}}>Rp</span>
              <input inputMode="numeric" value={displayAng} onChange={e=>handleAng(e.target.value)} placeholder="0"
                className="w-full rounded-lg text-sm py-2.5 pl-9 pr-3 transition-all focus:outline-none font-num"
                style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text}}
                onFocus={e=>{e.target.style.borderColor=C.gold+"99";e.target.style.background=C.navy4;}}
                onBlur={e=>{e.target.style.borderColor=C.navy5;e.target.style.background=C.navy3;}}/>
            </div>
          </div>
          <Select label="Status" value={form.status} onChange={v=>set("status",v)}>
            <option value="rencana">Rencana</option><option value="aktif">Aktif</option><option value="selesai">Selesai</option>
          </Select>
        </div>
        <Textarea label="Deskripsi" value={form.deskripsi} onChange={v=>set("deskripsi",v)} placeholder="Keterangan program..." rows={2}/>
      </div>
      <div className="px-5 py-4 flex gap-3 safe-bottom" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        <NavyBtn onClick={onClose} full>Batal</NavyBtn>
        <GoldBtn onClick={()=>onSave({...form,anggaran:parseAmount(displayAng),terpakai:Number(form.terpakai||0)})} disabled={!valid||uploading} full>{editData?"Update":"Simpan"} Program</GoldBtn>
      </div>
    </>
  );
}

function DonaturForm({onSave,onClose,editData}) {
  const [form,setForm]=useState(editData||{nama:"",telepon:"",email:"",alamat:""});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  return (
    <>
      <div className="p-5 space-y-4">
        {editData?.heema_account && (
          <div className="rounded-xl p-3 flex items-center gap-3" style={{background:C.goldGlow,border:`1px solid ${C.gold}55`}}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`}}>{editData.googleAuth?<GoogleLogo size={18}/>:<span style={{color:"#1a1208",fontSize:14,fontWeight:"bold"}}>💎</span>}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold" style={{color:C.gold}}>Terhubung dengan {editData.googleAuth?"Google":"Heema"}</div>
              <div className="text-[10px]" style={{color:C.textMute}}>Donatur ini berdonasi via portal jamaah Heema</div>
            </div>
          </div>
        )}
        <Input label="Nama Lengkap" value={form.nama} onChange={v=>set("nama",v)} placeholder="Nama donatur" icon="👤" autoFocus/>
        <Input label="Nomor Telepon" value={form.telepon} onChange={v=>set("telepon",v)} placeholder="0812-3456-7890" icon="📞"/>
        <Input label="Email" sub={editData?.heema_account?"Terhubung Heema":"opsional"} type="email" value={form.email} onChange={v=>set("email",v)} placeholder="email@contoh.com" icon="✉"/>
        <Textarea label="Alamat (opsional)" value={form.alamat} onChange={v=>set("alamat",v)} placeholder="Alamat donatur..." rows={2}/>
      </div>
      <div className="px-5 py-4 flex gap-3" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        <NavyBtn onClick={onClose} full>Batal</NavyBtn>
        <GoldBtn onClick={()=>onSave(form)} disabled={!form.nama} full>{editData?"Update":"Simpan"}</GoldBtn>
      </div>
    </>
  );
}

function UserForm({onSave,onClose,editData}) {
  const [form,setForm]=useState(editData||{nama:"",email:"",role:"bendahara",aktif:true});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  return (
    <>
      <div className="p-5 space-y-4">
        <Input label="Nama Lengkap" value={form.nama} onChange={v=>set("nama",v)} placeholder="Nama lengkap" icon="👤" autoFocus/>
        <Input label="Email" type="email" value={form.email} onChange={v=>set("email",v)} placeholder="email@masjid.id" icon="✉"/>
        <Select label="Role" value={form.role} onChange={v=>set("role",v)}>
          <option value="bendahara">Bendahara — Catat & edit transaksi</option>
          <option value="ketua">Ketua — Approval laporan</option>
          <option value="viewer">Viewer — Hanya lihat laporan</option>
          {editData && <option value="admin">Admin — Akses penuh</option>}
        </Select>
        {editData && (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
            <div className="text-sm font-semibold" style={{color:C.text}}>Status Aktif</div>
            <Toggle value={form.aktif} onChange={v=>set("aktif",v)}/>
          </div>
        )}
      </div>
      <div className="px-5 py-4 flex gap-3" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        <NavyBtn onClick={onClose} full>Batal</NavyBtn>
        <GoldBtn onClick={()=>onSave(form)} disabled={!form.nama||!form.email} full>{editData?"Update":"Kirim Undangan"}</GoldBtn>
      </div>
    </>
  );
}

function MasjidForm({onSave,onClose,editData}) {
  const [form,setForm]=useState(editData||{nama:"",kota:"",email:"",plan:"gratis",admin:""});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  return (
    <>
      <div className="p-5 space-y-4">
        <Input label="Nama Masjid" value={form.nama} onChange={v=>set("nama",v)} placeholder="Masjid Al-Ikhlas" icon="🕌" autoFocus/>
        <Input label="Kota" value={form.kota} onChange={v=>set("kota",v)} placeholder="Jakarta Selatan" icon="📍"/>
        <Input label="Email Admin" type="email" value={form.email} onChange={v=>set("email",v)} placeholder="admin@masjid.id" icon="✉"/>
        <Input label="Nama Admin" value={form.admin} onChange={v=>set("admin",v)} placeholder="Nama admin masjid" icon="👤"/>
        <Select label="Paket Awal" value={form.plan} onChange={v=>set("plan",v)}>
          {PLANS.map(p=><option key={p.id} value={p.id}>{p.nama} {p.harga>0?`- ${fmt(p.harga)}/bln`:"- Gratis"}</option>)}
        </Select>
      </div>
      <div className="px-5 py-4 flex gap-3" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        <NavyBtn onClick={onClose} full>Batal</NavyBtn>
        <GoldBtn onClick={()=>onSave(form)} disabled={!form.nama||!form.email||!form.kota} full>Daftarkan Masjid</GoldBtn>
      </div>
    </>
  );
}

function NotifPanel({open,onClose,notifs,setNotifs}) {
  if(!open) return null;
  const unread = notifs.filter(n=>!n.read).length;
  const markAllRead = () => { setNotifs(ns=>ns.map(n=>({...n,read:true}))); toast("Semua notifikasi ditandai dibaca"); };
  const clearAll = async () => {
    if(await confirmDialog({title:"Hapus Semua Notifikasi?",message:"Tindakan ini tidak bisa dibatalkan.",danger:true,okText:"Hapus"})) {
      setNotifs([]); toast("Notifikasi dihapus","info");
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-40 fi" onClick={onClose} style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)"}}/>
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 slide-r overflow-hidden flex flex-col" style={{background:C.navy2,borderLeft:`1px solid ${C.gold}33`}}>
        <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full" style={{background:C.gold}}/>
              <div className="font-bold serif text-lg" style={{color:C.gold}}>Notifikasi</div>
              {unread>0 && <Chip label={`${unread} Baru`} color={C.gold} bg={C.goldGlow} size="sm"/>}
            </div>
            <div className="text-xs mt-0.5" style={{color:C.textMute}}>{notifs.length} total notifikasi</div>
          </div>
          <button onClick={onClose} className="press w-8 h-8 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute}}>{I.x}</button>
        </div>
        {notifs.length>0 && (
          <div className="px-5 py-2.5 flex gap-3" style={{borderBottom:`1px solid ${C.navy5}`}}>
            <button onClick={markAllRead} className="press text-xs font-bold" style={{color:C.gold}}>Tandai semua dibaca</button>
            <div className="flex-1"/>
            <button onClick={clearAll} className="press text-xs font-bold" style={{color:C.red}}>Hapus semua</button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {notifs.length===0 ? (
            <div className="py-16 text-center"><div className="text-5xl mb-3 opacity-30">🔔</div><div className="text-sm font-semibold" style={{color:C.textMute}}>Tidak ada notifikasi</div></div>
          ) : notifs.map((n,i)=>(
            <div key={n.id}>{i>0 && <Divider/>}
              <div className="px-5 py-3.5 hover:bg-white/[0.02] relative cursor-pointer" onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))}>
                {!n.read && <div className="absolute right-3 top-3 w-2 h-2 rounded-full" style={{background:C.gold,boxShadow:`0 0 6px ${C.gold}`}}/>}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{background:n.warna+"22",border:`1px solid ${n.warna}44`}}>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{color:C.text}}>{n.judul}</div>
                    <div className="text-xs mt-0.5" style={{color:C.textDim}}>{n.pesan}</div>
                    <div className="text-[10px] mt-1" style={{color:C.textMute}}>{n.waktu}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageAuth({onLogin,onRegister,onJamaah}) {
  const [tab,setTab]=useState("login");
  const [form,setForm]=useState({email:"",password:"",nama_masjid:"",nama_admin:"",kota:"",nama:"",telepon:""});
  const [loading,setLoading]=useState(false);
  const [googleLoading,setGoogleLoading]=useState(false);
  const [err,setErr]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const doLogin=()=>{
    if(!form.email){setErr("Email wajib diisi");return;}
    setErr("");setLoading(true);
    setTimeout(()=>{setLoading(false);onLogin(form.email==="superadmin@heema.id"?"superadmin":"tenant",form);},800);
  };
  const doReg=()=>{
    if(!form.nama_masjid||!form.email||!form.password){setErr("Semua field wajib diisi");return;}
    setErr("");setLoading(true);
    setTimeout(()=>{setLoading(false);onRegister(form);toast("Pendaftaran berhasil! Selamat datang di Heema","gold");},1000);
  };
  const doJamaah=()=>{
    if(!form.nama||!form.email){setErr("Nama dan email wajib diisi");return;}
    setErr("");setLoading(true);
    setTimeout(()=>{setLoading(false);onJamaah({nama:form.nama,email:form.email,telepon:form.telepon,googleAuth:false});toast(`Selamat datang, ${form.nama}!`,"gold");},800);
  };
  
  // Google Sign-In handler
  const doGoogle = async () => {
    setErr(""); setGoogleLoading(true);
    try {
      // Determine intended role from current tab
      const intendedRole = tab === "jamaah" ? "jamaah" : (tab === "register" ? "tenant_admin" : "tenant_admin");
      const googleAccount = await googleSignIn(intendedRole);
      
      // If returns null, real OAuth is in progress (browser will redirect)
      if (googleAccount === null) {
        // Redirect happening, leave loading state
        toast("Mengarahkan ke Google...","info");
        return;
      }
      
      // Mock mode (returns immediately)
      setGoogleLoading(false);
      const userData = {
        nama: googleAccount.nama,
        email: googleAccount.email,
        telepon: googleAccount.telepon,
        picture: googleAccount.picture,
        googleAuth: true,
      };
      if(tab==="jamaah") {
        onJamaah(userData);
        toast(`Selamat datang, ${googleAccount.nama}!`,"gold");
      } else if(tab==="register") {
        // Auto-fill register form
        setForm(f=>({...f, nama_admin:googleAccount.nama, email:googleAccount.email, password:"google_oauth"}));
        toast(`Akun Google terhubung: ${googleAccount.email}`,"info");
      } else {
        // Login as tenant via Google
        onLogin("tenant", {email:googleAccount.email, nama_admin:googleAccount.nama, googleAuth:true, picture:googleAccount.picture});
        toast(`Selamat datang, ${googleAccount.nama}!`,"gold");
      }
    } catch(e) {
      setGoogleLoading(false);
      setErr("Login Google dibatalkan");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-pattern" style={{background:C.navy}}>
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-center px-16 py-12 relative overflow-hidden" style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.navy2} 50%,${C.navy3} 100%)`}}>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{background:C.goldGlow,filter:"blur(80px)",opacity:0.6}}/>
        <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full" style={{background:`${C.blue}11`,filter:"blur(70px)"}}/>
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-4 mb-12 fu">
            <HeemaLogo size={64} animate/>
            <div>
              <div className="text-5xl font-bold gold-shimmer serif tracking-tight" style={{lineHeight:1}}>HEEMA</div>
              <div className="flex items-center gap-2 mt-2"><div className="w-6 h-px" style={{background:C.gold}}/><span className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{color:C.gold}}>Masjid Finance Platform</span></div>
            </div>
          </div>
          <h1 className="font-bold text-5xl leading-[1.05] mb-5 fu1 serif" style={{color:C.text}}>Kelola keuangan<br/><span className="gold-shimmer">masjid Anda</span><br/>dengan amanah.</h1>
          <p className="text-base mb-10 max-w-md fu2" style={{color:C.textDim}}>Platform berbasis cloud untuk pengelolaan keuangan masjid. Data terisolasi, transparan, sederhana.</p>
          <div className="space-y-2.5 mb-10 fu3">
            {[["🔐","Keamanan Tingkat Bank","Schema terisolasi per masjid"],["📊","Laporan Real-time","Dashboard otomatis"],["👥","Multi-User & Role","Admin, Bendahara, Ketua, Viewer"],["📱","Web & Mobile Ready","Akses dari mana saja"]].map(([ic,t,s])=>(
              <div key={t} className="flex items-center gap-3.5 p-3.5 rounded-xl" style={{background:`${C.navy3}aa`,border:`1px solid ${C.navy5}`,backdropFilter:"blur(8px)"}}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{background:C.navy4,border:`1px solid ${C.gold}33`}}>{ic}</div>
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold" style={{color:C.text}}>{t}</div><div className="text-xs mt-0.5" style={{color:C.textMute}}>{s}</div></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 fu4">
            {[["1.200+","Masjid"],["48Rb+","Transaksi"],["99.9%","Uptime"]].map(([v,l])=>(
              <div key={l} className="rounded-xl p-3.5 text-center" style={{background:`${C.navy3}cc`,border:`1px solid ${C.gold}44`}}>
                <div className="font-bold text-2xl gold-shimmer serif">{v}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mt-1.5" style={{color:C.textMute}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-10 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 lg:hidden fu"><HeemaLogo size={44} animate/><div className="text-3xl font-bold gold-shimmer serif tracking-tight">HEEMA</div></div>
          <div className="flex p-1 rounded-xl mb-6 fu1" style={{background:C.navy3,border:`1px solid ${C.navy5}`}}>
            {[["login","Masuk"],["register","Daftar"],["jamaah","Jamaah"]].map(([t,l])=>(<button key={t} onClick={()=>{setTab(t);setErr("");}} className="flex-1 py-2.5 rounded-lg text-xs font-bold press"
              style={tab===t?{background:`linear-gradient(135deg,${C.goldDk},${C.gold},${C.goldLt})`,color:"#1a1208",boxShadow:`0 2px 8px ${C.goldGlow}`}:{color:C.textMute}}>
              {l}
            </button>))}
          </div>
          <div className="rounded-2xl p-6 fu2 bg-pattern-fine" style={{background:C.navy3,border:`1px solid ${C.navy5}`,boxShadow:`0 8px 32px rgba(0,0,0,.3)`}}>
            {tab==="login" ? (
              <div className="space-y-4">
                <div><div className="font-bold text-2xl serif" style={{color:C.text}}>Selamat Datang</div><div className="text-sm mt-1" style={{color:C.textMute}}>Masuk ke dashboard Heema Anda</div></div>
                <GoogleBtn onClick={doGoogle} disabled={googleLoading} label={googleLoading?"Menghubungkan...":"Masuk dengan Google"}/>
                <div className="flex items-center gap-3"><div className="flex-1 h-px" style={{background:C.navy5}}/><span className="text-[10px] uppercase tracking-widest font-bold" style={{color:C.textMute}}>atau email</span><div className="flex-1 h-px" style={{background:C.navy5}}/></div>
                <div className="rounded-xl p-3 text-xs" style={{background:`${C.gold}0e`,border:`1px solid ${C.gold}44`}}>
                  <div className="flex items-center gap-1.5 font-bold mb-1.5" style={{color:C.gold}}>⚡ Demo Login</div>
                  <div className="space-y-1" style={{color:C.textDim}}>
                    <div className="flex justify-between"><span>Super Admin:</span> <span className="font-mono font-semibold" style={{color:C.goldLt}}>superadmin@heema.id</span></div>
                    <div className="flex justify-between"><span>Admin Masjid:</span> <span className="font-mono font-semibold" style={{color:C.goldLt}}>email apapun</span></div>
                  </div>
                </div>
                <Input label="Email" placeholder="email@masjid.id" value={form.email} onChange={v=>set("email",v)} type="email" icon="✉"/>
                <Input label="Password" placeholder="••••••••" value={form.password} onChange={v=>set("password",v)} type="password" icon="🔒"/>
                {err && <div className="rounded-lg px-3 py-2.5 text-xs font-semibold" style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}33`}}>⚠ {err}</div>}
                <GoldBtn onClick={doLogin} disabled={loading} full>{loading?<span className="inline-flex items-center gap-2"><span className="w-3.5 h-3.5 border-2 border-yellow-900/40 border-t-yellow-900 rounded-full spin"/>Memproses...</span>:"Masuk ke Heema"}</GoldBtn>
                <p className="text-center text-xs pt-1" style={{color:C.textMute}}>Belum terdaftar? <button onClick={()=>setTab("register")} className="font-bold" style={{color:C.gold}}>Daftarkan masjid →</button></p>
              </div>
            ) : tab==="register" ? (
              <div className="space-y-4">
                <div><div className="font-bold text-2xl serif" style={{color:C.text}}>Daftarkan Masjid</div><div className="text-sm mt-1" style={{color:C.textMute}}>Gratis 14 hari trial · Tanpa kartu kredit</div></div>
                <GoogleBtn onClick={doGoogle} disabled={googleLoading} label={googleLoading?"Menghubungkan...":form.email&&form.email.includes("@gmail")?"✓ Terhubung dengan Google":"Daftar dengan Google"}/>
                {form.email && form.email.includes("@gmail") && (
                  <div className="rounded-lg p-2.5 flex items-center gap-2 text-xs" style={{background:C.greenBg,border:`1px solid ${C.green}44`}}>
                    <span style={{color:C.green}}>✓</span>
                    <span style={{color:C.textDim}}>Akun Google: <b style={{color:C.green}}>{form.email}</b></span>
                  </div>
                )}
                <div className="flex items-center gap-3"><div className="flex-1 h-px" style={{background:C.navy5}}/><span className="text-[10px] uppercase tracking-widest font-bold" style={{color:C.textMute}}>data masjid</span><div className="flex-1 h-px" style={{background:C.navy5}}/></div>
                <Input label="Nama Masjid" placeholder="Masjid Al-Ikhlas" value={form.nama_masjid} onChange={v=>set("nama_masjid",v)} icon="🕌"/>
                <Input label="Nama Admin" placeholder="Ahmad Fauzi" value={form.nama_admin} onChange={v=>set("nama_admin",v)} icon="👤"/>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Kota" placeholder="Jakarta" value={form.kota} onChange={v=>set("kota",v)} icon="📍"/>
                  <Input label="Email" placeholder="admin@masjid.id" value={form.email} onChange={v=>set("email",v)} type="email" icon="✉"/>
                </div>
                {!form.email.includes("@gmail") && <Input label="Password" sub="Min. 8 karakter" placeholder="••••••••" value={form.password} onChange={v=>set("password",v)} type="password" icon="🔒"/>}
                {err && <div className="rounded-lg px-3 py-2.5 text-xs font-semibold" style={{background:C.redBg,color:C.red}}>⚠ {err}</div>}
                <GoldBtn onClick={doReg} disabled={loading} full>{loading?<span className="inline-flex items-center gap-2"><span className="w-3.5 h-3.5 border-2 border-yellow-900/40 border-t-yellow-900 rounded-full spin"/>Mendaftarkan...</span>:"Daftar Gratis 14 Hari"}</GoldBtn>
                <p className="text-center text-xs pt-1" style={{color:C.textMute}}>Sudah punya akun? <button onClick={()=>setTab("login")} className="font-bold" style={{color:C.gold}}>Masuk →</button></p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-4 rounded-full" style={{background:C.gold}}/>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{color:C.gold}}>Untuk Jamaah</span>
                  </div>
                  <div className="font-bold text-2xl serif" style={{color:C.text}}>Berdonasi ke Masjid</div>
                  <div className="text-sm mt-1" style={{color:C.textMute}}>Salurkan donasi Anda dengan transparan</div>
                </div>
                <GoogleBtn onClick={doGoogle} disabled={googleLoading} label={googleLoading?"Menghubungkan...":"Masuk Cepat dengan Google"}/>
                <div className="text-center text-[10px]" style={{color:C.textMute}}>✨ Donasi otomatis tercatat di profil masjid · Lebih mudah & cepat</div>
                <div className="flex items-center gap-3"><div className="flex-1 h-px" style={{background:C.navy5}}/><span className="text-[10px] uppercase tracking-widest font-bold" style={{color:C.textMute}}>atau manual</span><div className="flex-1 h-px" style={{background:C.navy5}}/></div>
                <div className="rounded-xl p-4" style={{background:`${C.gold}0e`,border:`1px solid ${C.gold}44`}}>
                  <div className="flex items-start gap-2.5">
                    <div className="text-xl">💎</div>
                    <div className="flex-1">
                      <div className="text-xs font-bold mb-2" style={{color:C.gold}}>Akses Jamaah Heema</div>
                      <div className="space-y-1 text-[11px]" style={{color:C.textDim}}>
                        <div className="flex items-start gap-1.5"><span style={{color:C.green}}>✓</span> Jelajahi masjid di seluruh Indonesia</div>
                        <div className="flex items-start gap-1.5"><span style={{color:C.green}}>✓</span> Donasi otomatis tercatat di profil masjid</div>
                        <div className="flex items-start gap-1.5"><span style={{color:C.green}}>✓</span> Riwayat & bukti donasi tersimpan</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Input label="Nama Lengkap" placeholder="Nama Anda" value={form.nama} onChange={v=>set("nama",v)} icon="👤"/>
                <Input label="Email" placeholder="email@anda.com" value={form.email} onChange={v=>set("email",v)} type="email" icon="✉"/>
                <Input label="Telepon (opsional)" placeholder="0812-xxxx-xxxx" value={form.telepon} onChange={v=>set("telepon",v)} icon="📞"/>
                {err && <div className="rounded-lg px-3 py-2.5 text-xs font-semibold" style={{background:C.redBg,color:C.red}}>⚠ {err}</div>}
                <GoldBtn onClick={doJamaah} disabled={loading} full>{loading?"Memproses...":"Masuk sebagai Jamaah"}</GoldBtn>
                <p className="text-center text-[10px] pt-1" style={{color:C.textMute}}>Cukup nama & email, tanpa password</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuperAdmin({onLogout}) {
  const [page,setPage]=useState("overview");
  const [masjidList,setMasjidList]=usePersist("heema_masjids",SEED_MASJID);
  const [auditLogs,setAuditLogs]=usePersist("heema_audit",SEED_AUDIT);
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [filterS,setFilterS]=useState("semua");
  const [showAddMasjid,setShowAddMasjid]=useState(false);

  const filtered=masjidList.filter(m=>filterS==="semua"||m.status===filterS).filter(m=>[m.nama,m.kota,m.email].join(" ").toLowerCase().includes(search.toLowerCase()));
  const totalMRR=masjidList.filter(m=>m.status==="aktif").reduce((s,m)=>{const p=PLANS.find(x=>x.id===m.plan); return s+(p?.harga||0);},0);

  const addAudit = (aksi,target) => {
    const log = {id:uid(),user:"Super Admin",aksi,target,ip:"103.45.12.8",waktu:new Date().toISOString().slice(0,16).replace("T"," ")};
    setAuditLogs(l=>[log,...l]);
  };
  const changeStatus=async(id,st)=>{
    const m = masjidList.find(x=>x.id===id);
    const isDanger = st==="suspend";
    const ok = await confirmDialog({title:`${isDanger?"Suspend":"Aktifkan"} Masjid?`,message:`${m.nama} akan ${isDanger?"di-suspend":"diaktifkan"}.`,danger:isDanger,okText:isDanger?"Suspend":"Aktifkan",icon:isDanger?"🚫":"✓"});
    if(!ok) return;
    setMasjidList(l=>l.map(x=>x.id===id?{...x,status:st}:x));
    setSel(null);
    addAudit(st==="aktif"?"AKTIFKAN_MASJID":"SUSPEND_MASJID", m.nama);
    toast(`${m.nama} berhasil ${st==="aktif"?"diaktifkan":"di-suspend"}`,st==="aktif"?"success":"info");
  };
  const saveMasjid = (data) => {
    const slug = data.nama.toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,30);
    const newM = {id:"m"+uid(),slug,users:1,trx:0,saldo:0,status:"trial",tgl:today(),...data};
    setMasjidList(l=>[newM,...l]);
    addAudit("TAMBAH_MASJID",data.nama);
    toast(`Masjid ${data.nama} berhasil ditambahkan`,"gold");
    setShowAddMasjid(false);
  };
  const deleteMasjid = async(m) => {
    const ok = await confirmDialog({title:"Hapus Masjid Permanen?",message:`${m.nama} dan SEMUA datanya akan dihapus. TIDAK BISA dibatalkan.`,danger:true,okText:"Hapus",icon:"⚠"});
    if(!ok) return;
    setMasjidList(l=>l.filter(x=>x.id!==m.id));
    addAudit("HAPUS_MASJID",m.nama);
    toast(`${m.nama} dihapus`,"error");
    setSel(null);
  };
  const changePlan = (id, newPlan) => {
    const m = masjidList.find(x=>x.id===id);
    setMasjidList(l=>l.map(x=>x.id===id?{...x,plan:newPlan}:x));
    addAudit("UBAH_PAKET",`${m.nama} → ${newPlan.toUpperCase()}`);
    toast(`Paket ${m.nama} diubah ke ${newPlan.toUpperCase()}`,"gold");
    setSel(s=>s?{...s,plan:newPlan}:null);
  };

  const SA_NAV=[{id:"overview",icon:I.home,label:"Overview"},{id:"masjid",icon:I.team,label:"Daftar Masjid"},{id:"billing",icon:I.trx,label:"Billing & Plans"},{id:"audit",icon:I.search,label:"Audit Log"}];

  return (
    <div className="min-h-screen flex bg-pattern" style={{background:C.navy}}>
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-30" style={{background:C.navy2,borderRight:`1px solid ${C.navy5}`}}>
        <div className="px-5 py-5" style={{borderBottom:`1px solid ${C.navy5}`}}>
          <div className="flex items-center gap-3">
            <HeemaLogo size={42}/>
            <div>
              <div className="text-2xl font-bold gold-shimmer serif tracking-tight">HEEMA</div>
              <div className="flex items-center gap-1.5 mt-1"><div className="w-1 h-1 rounded-full" style={{background:C.gold}}/><span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{color:C.gold}}>Super Admin</span></div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3" style={{borderBottom:`1px solid ${C.navy5}`}}>
          <div className="rounded-xl p-3.5" style={{background:C.navy3,border:`1px solid ${C.gold}33`}}>
            <div className="text-[10px] uppercase tracking-[0.15em] font-bold mb-2.5" style={{color:C.textMute}}>Platform Stats</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center"><div className="font-bold text-lg serif" style={{color:C.gold}}>{masjidList.length}</div><div className="text-[9px] mt-1 uppercase tracking-wider" style={{color:C.textMute}}>Masjid</div></div>
              <div className="text-center"><div className="font-bold text-lg serif" style={{color:C.green}}>{masjidList.filter(m=>m.status==="aktif").length}</div><div className="text-[9px] mt-1 uppercase tracking-wider" style={{color:C.textMute}}>Aktif</div></div>
            </div>
            <div className="mt-3 pt-3" style={{borderTop:`1px solid ${C.navy5}`}}>
              <div className="text-[10px] uppercase tracking-wider font-semibold" style={{color:C.textMute}}>MRR</div>
              <div className="font-bold text-base font-num gold-shimmer serif">{fmtS(totalMRR)}</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {SA_NAV.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold press relative"
            style={page===n.id?{background:C.navy3,color:C.gold}:{color:C.textMute}}>
            {page===n.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:C.gold,boxShadow:`0 0 8px ${C.gold}`}}/>}
            <span style={{color:page===n.id?C.gold:C.textMute}}>{n.icon}</span>{n.label}
          </button>))}
        </nav>
        <div className="p-4" style={{borderTop:`1px solid ${C.navy5}`}}>
          <div className="flex items-center gap-2.5 mb-3"><Avatar nama="S" size={36} gold/><div className="flex-1 min-w-0"><div className="text-sm font-semibold" style={{color:C.text}}>Super Admin</div><div className="text-[10px]" style={{color:C.textMute}}>heema.id</div></div></div>
          <NavyBtn onClick={onLogout} sm full icon={I.logout}>Keluar</NavyBtn>
        </div>
      </aside>

      <div className="lg:ml-64 flex-1 flex flex-col">
        <header className="sticky top-0 z-20 px-4 lg:px-6 py-4 flex items-center gap-4" style={{background:`${C.navy2}f0`,borderBottom:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
          <div className="lg:hidden flex items-center gap-2"><HeemaLogo size={32}/><div className="text-xl font-bold gold-shimmer serif tracking-tight">HEEMA</div></div>
          <div className="hidden lg:block flex-1">
            <div className="font-bold text-xl serif" style={{color:C.gold}}>{SA_NAV.find(n=>n.id===page)?.label}</div>
            <div className="text-xs mt-0.5" style={{color:C.textMute}}>Heema · Panel Manajemen Platform</div>
          </div>
          <div className="flex-1 lg:flex-none"/>
          <div className="relative hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:C.textMute}}>{I.search}</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari masjid..." className="rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none"
              style={{background:C.navy3,border:`1px solid ${C.navy5}`,color:C.text,width:220}}
              onFocus={e=>e.target.style.borderColor=C.gold+"66"} onBlur={e=>e.target.style.borderColor=C.navy5}/>
          </div>
        </header>

        {/* Mobile nav pills */}
        <div className="lg:hidden px-4 py-3 flex gap-2 overflow-x-auto" style={{borderBottom:`1px solid ${C.navy5}`,background:C.navy2}}>
          {SA_NAV.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} className="press px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5"
            style={page===n.id?{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}:{background:C.navy3,color:C.textMute,border:`1px solid ${C.navy5}`}}>{n.icon}{n.label}</button>))}
        </div>

        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {page==="overview" && (
            <div className="space-y-6 fu">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {l:"Total Masjid",v:masjidList.length,icon:"🕌",c:C.gold,sub:`${masjidList.filter(m=>m.status==="aktif").length} aktif`,trend:[8,11,15,18,21,masjidList.length]},
                  {l:"Trial Aktif",v:masjidList.filter(m=>m.status==="trial").length,icon:"⏳",c:C.blue,sub:"Perlu follow-up",trend:[3,2,4,3,2,masjidList.filter(m=>m.status==="trial").length]},
                  {l:"MRR Estimasi",v:fmtS(totalMRR),icon:"💎",c:C.gold,sub:"Per bulan",trend:[180,220,260,290,340,totalMRR/1000]},
                  {l:"Total Transaksi",v:masjidList.reduce((s,m)=>s+m.trx,0).toLocaleString(),icon:"📊",c:C.purple,sub:"Bulan ini",trend:[200,250,310,380,450,masjidList.reduce((s,m)=>s+m.trx,0)]},
                ].map(k=>(
                  <Card key={k.l} className="p-4 lift">
                    <div className="flex justify-between items-start mb-3"><div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{color:C.textMute}}>{k.l}</div><div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{background:`${k.c}18`,border:`1px solid ${k.c}33`}}>{k.icon}</div></div>
                    <div className="text-2xl font-bold serif font-num" style={{color:k.c}}>{k.v}</div>
                    <div className="flex items-center justify-between mt-2"><div className="text-xs" style={{color:C.textMute}}>{k.sub}</div><Sparkline values={k.trend} color={k.c}/></div>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Distribusi Status Masjid</div></div>
                  {["aktif","trial","suspend","expired"].map(s=>{
                    const cnt=masjidList.filter(m=>m.status===s).length, pct=(cnt/masjidList.length)*100;
                    return (
                      <div key={s} className="mb-3 last:mb-0">
                        <div className="flex justify-between text-xs mb-1.5"><span className="font-semibold" style={{color:C.textDim}}>{statusLabel[s]}</span><span style={{color:C.textMute}} className="font-num">{cnt} <span style={{color:C.textFaint}}>({Math.round(pct)}%)</span></span></div>
                        <div className="h-2 rounded-full overflow-hidden" style={{background:C.navy2}}><div className="h-full rounded-full" style={{width:`${pct}%`,background:`linear-gradient(90deg,${statusColor[s]},${statusColor[s]}88)`,boxShadow:`0 0 8px ${statusColor[s]}55`}}/></div>
                      </div>
                    );
                  })}
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Distribusi Paket</div></div>
                  {PLANS.map(p=>{
                    const cnt=masjidList.filter(m=>m.plan===p.id).length, pct=(cnt/masjidList.length)*100;
                    const color = p.id==="pro"?C.gold:p.id==="basic"?C.blue:C.textMute;
                    return (
                      <div key={p.id} className="mb-3 last:mb-0">
                        <div className="flex justify-between text-xs mb-1.5"><span className="font-semibold" style={{color:C.textDim}}>{p.nama}</span><span style={{color:C.textMute}} className="font-num">{cnt} · {p.harga===0?"Gratis":fmtS(p.harga)+"/bln"}</span></div>
                        <div className="h-2 rounded-full overflow-hidden" style={{background:C.navy2}}><div className="h-full rounded-full" style={{width:`${pct}%`,background:`linear-gradient(90deg,${color},${color}88)`,boxShadow:`0 0 8px ${color}55`}}/></div>
                      </div>
                    );
                  })}
                </Card>
              </div>
              <Card className="overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
                  <div className="flex items-center gap-2"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Masjid Terbaru</div></div>
                  <button onClick={()=>setPage("masjid")} className="press text-xs font-bold flex items-center gap-1" style={{color:C.gold}}>Lihat Semua {I.chev}</button>
                </div>
                {[...masjidList].sort((a,b)=>new Date(b.tgl)-new Date(a.tgl)).slice(0,5).map((m,i)=>(
                  <div key={m.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] press" onClick={()=>setSel(m)} style={i>0?{borderTop:`1px solid ${C.navy5}66`}:{}}>
                    <Avatar nama={m.nama} size={38}/>
                    <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate" style={{color:C.text}}>{m.nama}</div><div className="text-xs" style={{color:C.textMute}}>{m.kota} · {m.email}</div></div>
                    <Chip label={statusLabel[m.status]} color={statusColor[m.status]} bg={statusBg[m.status]}/>
                    <div className="text-xs font-bold uppercase tracking-wider hidden sm:block" style={{color:m.plan==="pro"?C.gold:m.plan==="basic"?C.blue:C.textMute,minWidth:48,textAlign:"right"}}>{m.plan}</div>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {page==="masjid" && (
            <div className="space-y-4 fu">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex rounded-lg overflow-hidden p-1 gap-1" style={{background:C.navy3,border:`1px solid ${C.navy5}`}}>
                  {["semua","aktif","trial","suspend"].map(s=>(<button key={s} onClick={()=>setFilterS(s)} className="px-3 py-1.5 text-xs font-bold press rounded-md"
                    style={filterS===s?{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}:{color:C.textMute}}>
                    {s==="semua"?"Semua":statusLabel[s]}
                  </button>))}
                </div>
                <div className="flex-1"/>
                <NavyBtn sm icon={I.excel} onClick={()=>exportCSV(filtered.map(m=>({Nama:m.nama,Kota:m.kota,Status:statusLabel[m.status],Paket:m.plan,Users:m.users,Trx:m.trx,Saldo:m.saldo,Email:m.email})),"daftar-masjid.csv")}>CSV</NavyBtn>
                <GoldBtn sm icon={I.plus} onClick={()=>setShowAddMasjid(true)}>Tambah Masjid</GoldBtn>
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr style={{borderBottom:`1px solid ${C.navy5}`,background:C.navy2}}>
                      {["Masjid","Kota","Status","Paket","Users","Trx","Saldo","Aksi"].map(h=><th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap" style={{color:C.textMute}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {filtered.map(m=>(
                        <tr key={m.id} style={{borderBottom:`1px solid ${C.navy5}55`}} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar nama={m.nama} size={34}/><div><div className="text-xs font-bold" style={{color:C.text}}>{m.nama}</div><div className="text-[10px] font-mono" style={{color:C.textMute}}>/{m.slug}</div></div></div></td>
                          <td className="px-4 py-3 text-xs" style={{color:C.textDim}}>{m.kota}</td>
                          <td className="px-4 py-3"><Chip label={statusLabel[m.status]} color={statusColor[m.status]} bg={statusBg[m.status]} size="sm"/></td>
                          <td className="px-4 py-3"><span className="text-[11px] font-bold uppercase tracking-wider" style={{color:m.plan==="pro"?C.gold:m.plan==="basic"?C.blue:C.textMute}}>{m.plan}</span></td>
                          <td className="px-4 py-3 text-xs text-center font-num" style={{color:C.textDim}}>{m.users}</td>
                          <td className="px-4 py-3 text-xs text-center font-num" style={{color:C.textDim}}>{m.trx}</td>
                          <td className="px-4 py-3 text-xs font-bold font-num" style={{color:C.green}}>{fmtS(m.saldo)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {m.status!=="aktif" && <button onClick={()=>changeStatus(m.id,"aktif")} className="press px-2 py-1 rounded-md text-[10px] font-bold" style={{color:C.green,background:C.greenBg}}>Aktifkan</button>}
                              {m.status!=="suspend" && <button onClick={()=>changeStatus(m.id,"suspend")} className="press px-2 py-1 rounded-md text-[10px] font-bold" style={{color:C.red,background:C.redBg}}>Suspend</button>}
                              <button onClick={()=>setSel(m)} className="press px-2 py-1 rounded-md text-[10px] font-bold" style={{color:C.gold,background:C.goldGlow}}>Detail</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filtered.length===0 && <tr><td colSpan={8} className="text-center py-12" style={{color:C.textMute}}>Tidak ada masjid ditemukan</td></tr>}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {page==="billing" && (
            <div className="space-y-6 fu">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map(p=>(
                  <Card key={p.id} className="p-5 relative overflow-hidden lift" gold={p.popular}>
                    {p.popular && <><div className="absolute -top-12 -right-12 w-32 h-32 rounded-full" style={{background:C.goldGlow,filter:"blur(20px)"}}/><div className="absolute top-3 right-3"><GoldBadge>POPULER</GoldBadge></div></>}
                    <div className="relative">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{color:C.textMute}}>{p.nama}</div>
                      <div className="text-3xl font-bold serif font-num mt-1" style={{color:p.popular?C.gold:C.textDim}}>{p.harga===0?"Gratis":fmt(p.harga)}</div>
                      {p.harga>0 && <div className="text-xs" style={{color:C.textMute}}>per bulan</div>}
                      <div className="mt-2 text-xs font-semibold" style={{color:p.popular?C.gold:C.textMute}}>{masjidList.filter(m=>m.plan===p.id).length} masjid · {fmt((masjidList.filter(m=>m.plan===p.id&&m.status==="aktif").length||0)*p.harga)}/bln</div>
                      <Divider className="my-4"/>
                      <div className="space-y-2">{p.fitur.map(f=><div key={f} className="flex items-start gap-2 text-xs" style={{color:C.textDim}}><span style={{color:p.popular?C.gold:C.green}}>✓</span>{f}</div>)}</div>
                    </div>
                  </Card>
                ))}
              </div>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Ringkasan Revenue</div></div>
                <div className="grid grid-cols-3 gap-4">
                  {[["MRR",fmt(totalMRR),"per bulan"],["ARR (Est.)",fmt(totalMRR*12),"per tahun"],["Avg/Masjid",fmt(totalMRR/(masjidList.filter(m=>m.status==="aktif").length||1)),"per bulan"]].map(([l,v,sub])=>(
                    <div key={l} className="rounded-xl p-4 text-center" style={{background:C.navy2,border:`1px solid ${C.gold}33`}}>
                      <div className="text-[10px] uppercase tracking-[0.15em] font-bold" style={{color:C.textMute}}>{l}</div>
                      <div className="text-base lg:text-lg font-bold serif font-num mt-1.5" style={{color:C.gold}}>{v}</div>
                      <div className="text-[10px] mt-1" style={{color:C.textFaint}}>{sub}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {page==="audit" && (
            <div className="space-y-4 fu">
              <div className="flex items-center justify-between">
                <div className="text-sm" style={{color:C.textMute}}>{auditLogs.length} log aktivitas</div>
                <NavyBtn sm icon={I.excel} onClick={()=>exportCSV(auditLogs.map(l=>({Waktu:l.waktu,User:l.user,Aksi:l.aksi,Target:l.target,IP:l.ip})),"audit-log.csv")}>Export CSV</NavyBtn>
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr style={{borderBottom:`1px solid ${C.navy5}`,background:C.navy2}}>
                      {["Waktu","User","Aksi","Target","IP"].map(h=><th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider" style={{color:C.textMute}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {auditLogs.map(l=>(
                        <tr key={l.id} style={{borderBottom:`1px solid ${C.navy5}55`}} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 text-xs whitespace-nowrap font-num" style={{color:C.textMute}}>{l.waktu}</td>
                          <td className="px-4 py-3 text-xs font-semibold" style={{color:C.text}}>{l.user}</td>
                          <td className="px-4 py-3"><Chip label={l.aksi} color={l.aksi.includes("HAPUS")||l.aksi.includes("SUSPEND")?C.red:l.aksi.includes("TAMBAH")||l.aksi.includes("AKTIFKAN")?C.green:C.gold} size="sm"/></td>
                          <td className="px-4 py-3 text-xs" style={{color:C.textDim}}>{l.target}</td>
                          <td className="px-4 py-3 text-xs font-mono" style={{color:C.textMute}}>{l.ip}</td>
                        </tr>
                      ))}
                      {auditLogs.length===0 && <tr><td colSpan={5} className="text-center py-12" style={{color:C.textMute}}>Belum ada log</td></tr>}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fi" style={{background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)"}} onClick={()=>setSel(null)}>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden si bg-pattern-fine" onClick={e=>e.stopPropagation()} style={{background:C.navy3,border:`1px solid ${C.gold}55`}}>
            <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:`1px solid ${C.gold}33`,background:C.navy2}}>
              <div className="flex items-center gap-3 min-w-0"><Avatar nama={sel.nama} size={42}/><div className="min-w-0"><div className="font-bold serif truncate" style={{color:C.gold}}>{sel.nama}</div><div className="text-xs" style={{color:C.textMute}}>{sel.kota}</div></div></div>
              <button onClick={()=>setSel(null)} className="press w-7 h-7 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute}}>{I.x}</button>
            </div>
            <div className="p-5 space-y-2.5">
              {[["Slug","/"+sel.slug],["Email",sel.email],["Users",sel.users],["Trx",sel.trx],["Saldo",fmt(sel.saldo)],["Bergabung",fmtDate(sel.tgl)]].map(([l,v])=>(
                <div key={l} className="flex justify-between items-center py-1.5" style={{borderBottom:`1px solid ${C.navy5}55`}}><span className="text-xs font-semibold" style={{color:C.textMute}}>{l}</span><span className="text-sm font-semibold font-num" style={{color:C.text}}>{v}</span></div>
              ))}
              <div className="pt-2 flex items-center justify-between"><span className="text-xs font-semibold" style={{color:C.textMute}}>Status</span><Chip label={statusLabel[sel.status]} color={statusColor[sel.status]} bg={statusBg[sel.status]}/></div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold" style={{color:C.textMute}}>Paket</span>
                <select value={sel.plan} onChange={e=>changePlan(sel.id,e.target.value)} className="rounded-md px-2 py-1 text-xs font-bold focus:outline-none" style={{background:C.navy2,color:C.gold,border:`1px solid ${C.gold}44`}}>
                  {PLANS.map(p=><option key={p.id} value={p.id}>{p.nama.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-3">
                {sel.status!=="aktif" && <GoldBtn sm onClick={()=>changeStatus(sel.id,"aktif")} full>Aktifkan</GoldBtn>}
                {sel.status!=="suspend" && <NavyBtn sm danger onClick={()=>changeStatus(sel.id,"suspend")} full>Suspend</NavyBtn>}
              </div>
              <NavyBtn sm danger full onClick={()=>deleteMasjid(sel)} icon={I.trash}>Hapus Permanen</NavyBtn>
            </div>
          </div>
        </div>
      )}

      <Modal open={showAddMasjid} onClose={()=>setShowAddMasjid(false)} title="Tambah Masjid Baru" subtitle="Manajemen Tenant">
        <MasjidForm onSave={saveMasjid} onClose={()=>setShowAddMasjid(false)}/>
      </Modal>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ONBOARDING MODAL — wajib koordinat + foto sebelum pakai Heema
════════════════════════════════════════════════════════════ */
function OnboardingModal({profile, onComplete}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    foto: profile?.foto || null,
    lat: profile?.lat || null,
    lng: profile?.lng || null,
    alamat: profile?.alamat || "",
  });
  const [uploading, setUploading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [coordInput, setCoordInput] = useState({lat:data.lat||"", lng:data.lng||""});

  const set = (k,v) => setData(d=>({...d,[k]:v}));

  const handleFoto = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")) { toast("File harus berupa gambar","error"); return; }
    if(file.size > 8*1024*1024) { toast("Ukuran maksimal 8MB","error"); return; }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const compressed = await compressImage(base64, 1200, 900);
      set("foto", compressed);
      toast("Foto masjid berhasil diunggah","success");
    } catch { toast("Gagal memproses foto","error"); }
    setUploading(false);
  };

  const detectLocation = async () => {
    setLocating(true);
    const loc = await getGeoLocation();
    setLocating(false);
    if(!loc) {
      toast("Tidak bisa mendeteksi lokasi. Browser perlu izin GPS","error");
      return;
    }
    set("lat", loc.lat);
    set("lng", loc.lng);
    setCoordInput({lat:loc.lat.toFixed(6), lng:loc.lng.toFixed(6)});
    toast("Lokasi berhasil dideteksi","success");
  };

  const setManualCoord = () => {
    const lat = parseFloat(coordInput.lat), lng = parseFloat(coordInput.lng);
    if(isNaN(lat) || isNaN(lng) || lat<-90 || lat>90 || lng<-180 || lng>180) {
      toast("Koordinat tidak valid","error"); return;
    }
    set("lat", lat); set("lng", lng);
    toast("Koordinat tersimpan");
  };

  // Static map preview moved to GoogleMap component

  const canFinish = data.foto && data.lat && data.lng && data.alamat;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 fi" style={{background:"rgba(0,0,0,.92)",backdropFilter:"blur(12px)"}}>
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden si bg-pattern-fine relative max-h-[95vh] flex flex-col"
        style={{background:`linear-gradient(135deg,${C.navy3} 0%,${C.navy2} 100%)`,border:`2px solid ${C.gold}`,boxShadow:`0 0 60px ${C.gold}44`}}>
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full" style={{background:C.goldGlow,filter:"blur(60px)"}}/>
        
        {/* Header */}
        <div className="relative px-6 py-4 flex-shrink-0" style={{borderBottom:`1px solid ${C.gold}33`}}>
          <div className="flex items-center gap-3">
            <HeemaLogo size={36} animate/>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:C.gold}}>Setup Awal · Wajib</span>
              </div>
              <div className="font-bold serif text-xl" style={{color:C.text}}>Lengkapi Profil Masjid</div>
            </div>
          </div>
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1,2,3].map(n=>(
              <div key={n} className="flex-1 h-1.5 rounded-full transition-all" style={{background:step>=n?C.gold:C.navy5,boxShadow:step>=n?`0 0 6px ${C.gold}`:"none"}}/>
            ))}
          </div>
          <div className="flex justify-between text-[10px] mt-1.5 font-bold uppercase tracking-wider">
            <span style={{color:step>=1?C.gold:C.textMute}}>1. Lokasi</span>
            <span style={{color:step>=2?C.gold:C.textMute}}>2. Foto</span>
            <span style={{color:step>=3?C.gold:C.textMute}}>3. Selesai</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto p-6">
          {step===1 && (
            <div className="space-y-4 fu">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">📍</div>
                <div className="font-bold serif text-2xl" style={{color:C.gold}}>Titik Koordinat Masjid</div>
                <div className="text-sm mt-1" style={{color:C.textDim}}>Agar jamaah dapat menemukan masjid Anda di peta</div>
              </div>

              <Input label="Alamat Lengkap" value={data.alamat} onChange={v=>set("alamat",v)} placeholder="Jl. Merdeka No. 12, Kebayoran Baru" icon="📍"/>

              <div className="space-y-2.5">
                <button onClick={detectLocation} disabled={locating} className="press w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all"
                  style={{background:locating?C.navy3:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:locating?C.textMute:"#1a1208",boxShadow:locating?"none":`0 4px 14px ${C.goldGlow}`}}>
                  {locating ? (
                    <>
                      <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full spin"/>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Mendeteksi lokasi...</div>
                        <div className="text-xs opacity-80">Mohon izinkan akses GPS pada browser</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl">🛰️</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Deteksi Otomatis (GPS)</div>
                        <div className="text-xs opacity-80">Recommended · Gunakan lokasi saat ini</div>
                      </div>
                      <div>{I.chev}</div>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{background:C.navy5}}/>
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>atau input manual</span>
                  <div className="flex-1 h-px" style={{background:C.navy5}}/>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FieldLabel>Latitude</FieldLabel>
                    <input type="text" inputMode="decimal" value={coordInput.lat} onChange={e=>setCoordInput(c=>({...c,lat:e.target.value}))} placeholder="-6.244"
                      className="w-full rounded-lg text-sm py-2.5 px-3 focus:outline-none font-num" style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text}}/>
                  </div>
                  <div>
                    <FieldLabel>Longitude</FieldLabel>
                    <input type="text" inputMode="decimal" value={coordInput.lng} onChange={e=>setCoordInput(c=>({...c,lng:e.target.value}))} placeholder="106.798"
                      className="w-full rounded-lg text-sm py-2.5 px-3 focus:outline-none font-num" style={{background:C.navy3,border:`1.5px solid ${C.navy5}`,color:C.text}}/>
                  </div>
                </div>
                <NavyBtn sm onClick={setManualCoord} icon={I.pin} full>Pakai Koordinat Manual</NavyBtn>
                <div className="text-[10px] text-center" style={{color:C.textMute}}>💡 Klik kanan lokasi masjid di Google Maps → koordinat akan muncul di pop-up</div>
              </div>

              {data.lat && data.lng && (
                <div className="rounded-xl overflow-hidden mt-4" style={{border:`1px solid ${C.green}55`}}>
                  <div className="px-4 py-2.5 flex items-center gap-2" style={{background:C.greenBg,borderBottom:`1px solid ${C.green}33`}}>
                    <div className="w-2 h-2 rounded-full" style={{background:C.green,boxShadow:`0 0 6px ${C.green}`}}/>
                    <div className="text-xs font-bold flex-1" style={{color:C.green}}>Koordinat: {data.lat.toFixed(6)}, {data.lng.toFixed(6)}</div>
                    <a href={`https://www.google.com/maps?q=${data.lat},${data.lng}`} target="_blank" rel="noopener noreferrer" className="press text-[10px] font-bold" style={{color:C.blue}}>Buka Maps →</a>
                  </div>
                  <GoogleMap 
                    center={{lat:data.lat, lng:data.lng}} 
                    zoom={16} 
                    markers={[{id:"preview",lat:data.lat,lng:data.lng,nama:profile?.nama_masjid||"Masjid Anda",kota:profile?.kota||""}]} 
                    interactive={false}
                    style={{height:200}}
                  />
                </div>
              )}
            </div>
          )}

          {step===2 && (
            <div className="space-y-4 fu">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">📸</div>
                <div className="font-bold serif text-2xl" style={{color:C.gold}}>Foto Masjid</div>
                <div className="text-sm mt-1" style={{color:C.textDim}}>Foto utama yang akan tampil di portal jamaah</div>
              </div>

              {data.foto ? (
                <div className="relative rounded-xl overflow-hidden" style={{aspectRatio:"4/3",border:`1px solid ${C.gold}55`}}>
                  <img src={data.foto} alt="Foto masjid" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-end p-3" style={{background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent 50%)"}}>
                    <div className="w-full flex items-center justify-between">
                      <div className="px-2 py-1 rounded text-[10px] font-bold" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)"}}>✓ Foto utama</div>
                      <button onClick={()=>set("foto",null)} className="press w-9 h-9 rounded-full flex items-center justify-center" style={{background:C.redBg,color:C.red,backdropFilter:"blur(8px)"}}>{I.trash}</button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="press rounded-xl flex flex-col items-center justify-center cursor-pointer" 
                  style={{aspectRatio:"4/3",background:C.navy2,border:`2px dashed ${C.gold}55`}}>
                  <input type="file" accept="image/*" onChange={handleFoto} className="hidden"/>
                  {uploading ? (
                    <>
                      <div className="w-10 h-10 border-3 border-yellow-700 border-t-yellow-400 rounded-full spin"/>
                      <div className="text-xs mt-3 font-semibold" style={{color:C.gold}}>Memproses foto...</div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl mb-2">📷</div>
                      <div className="text-sm font-bold" style={{color:C.gold}}>Upload Foto Masjid</div>
                      <div className="text-[10px] mt-1 text-center px-4 max-w-xs" style={{color:C.textMute}}>Foto bagian depan/eksterior · Min. 800×600 · Max 8MB</div>
                    </>
                  )}
                </label>
              )}

              <div className="rounded-xl p-3 text-xs" style={{background:`${C.gold}0e`,border:`1px solid ${C.gold}33`}}>
                <div className="font-bold mb-1.5" style={{color:C.gold}}>💡 Tips Foto Terbaik</div>
                <ul className="space-y-1 text-[11px]" style={{color:C.textDim}}>
                  <li className="flex items-start gap-1.5"><span>•</span>Ambil foto pada siang/pagi hari dengan cahaya cukup</li>
                  <li className="flex items-start gap-1.5"><span>•</span>Tampakkan bagian depan & menara masjid</li>
                  <li className="flex items-start gap-1.5"><span>•</span>Rasio 4:3 atau 16:9 (landscape)</li>
                </ul>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="space-y-4 fu text-center">
              <div className="inline-block ring-in"><div style={{fontSize:80,filter:`drop-shadow(0 0 24px ${C.gold})`}}>💎</div></div>
              <div>
                <div className="font-bold serif text-2xl gold-shimmer">Setup Lengkap!</div>
                <div className="text-sm mt-1" style={{color:C.textDim}}>Masjid Anda siap menerima donasi dari jamaah</div>
              </div>
              
              {data.foto && (
                <div className="rounded-xl overflow-hidden" style={{border:`1px solid ${C.gold}55`}}>
                  <div className="relative" style={{aspectRatio:"4/3",maxHeight:240}}>
                    <img src={data.foto} alt="Foto" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 flex items-end p-4" style={{background:"linear-gradient(to top,rgba(8,17,31,0.85),transparent 50%)"}}>
                      <div className="text-left">
                        <div className="font-bold serif text-white" style={{fontSize:18}}>{profile?.nama_masjid}</div>
                        <div className="text-xs text-white opacity-80 flex items-center gap-1 mt-0.5">📍 {data.alamat||profile?.kota}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between text-xs" style={{background:C.navy2}}>
                    <span style={{color:C.textMute}}>Koordinat</span>
                    <span className="font-mono font-bold" style={{color:C.gold}}>{data.lat?.toFixed(4)}, {data.lng?.toFixed(4)}</span>
                  </div>
                </div>
              )}

              <div className="rounded-xl p-3 text-left text-xs" style={{background:`${C.green}0e`,border:`1px solid ${C.green}44`}}>
                <div className="font-bold mb-2 flex items-center gap-1.5" style={{color:C.green}}>✓ Yang sudah Anda lengkapi:</div>
                <div className="space-y-1" style={{color:C.textDim}}>
                  <div className="flex items-center gap-2"><span style={{color:C.green}}>✓</span>Alamat lengkap masjid</div>
                  <div className="flex items-center gap-2"><span style={{color:C.green}}>✓</span>Koordinat peta (lat/lng)</div>
                  <div className="flex items-center gap-2"><span style={{color:C.green}}>✓</span>Foto masjid resolusi tinggi</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative px-6 py-4 flex gap-3 flex-shrink-0" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
          {step > 1 && <NavyBtn onClick={()=>setStep(s=>s-1)}>← Kembali</NavyBtn>}
          <div className="flex-1"/>
          {step < 3 ? (
            <GoldBtn 
              onClick={()=>setStep(s=>s+1)} 
              disabled={(step===1 && (!data.lat || !data.lng || !data.alamat)) || (step===2 && !data.foto)}>
              Lanjut →
            </GoldBtn>
          ) : (
            <GoldBtn onClick={()=>onComplete(data)} disabled={!canFinish}>Mulai Gunakan Heema 💎</GoldBtn>
          )}
        </div>
      </div>
    </div>
  );
}

function TenantApp({onLogout,info}) {
  const [page,setPage]=useState("home");
  const [transactions,setTrx]=usePersist("heema_trx",SEED_TRX);
  const [programs,setProgs]=usePersist("heema_progs",SEED_PROG);
  const [donatur,setDonatur]=usePersist("heema_donatur",SEED_DONATUR);
  const [users,setUsers]=usePersist("heema_users",SEED_USERS);
  const [profile,setProfile]=usePersist("heema_profile",{...SEED_PROFILE,...(info||{})});
  const [prefs,setPrefs]=usePersist("heema_prefs",SEED_PREFS);
  const [notifs,setNotifs]=usePersist("heema_notifs",SEED_NOTIFS);
  const [donasiPublik,setDonasiPublik]=usePersist("heema_donasi_publik",SEED_DONASI_PUBLIK);

  // Onboarding check - new tenants must complete profile
  const needsOnboarding = !profile.onboarded || !profile.foto || !profile.lat || !profile.lng;
  
  const completeOnboarding = (data) => {
    setProfile(p=>({...p, ...data, onboarded:true}));
    toast("Selamat! Masjid Anda siap digunakan","gold");
  };

  const [trxModal,setTrxModal]=useState(null);
  const [progModal,setProgModal]=useState(null);
  const [donaturModal,setDonaturModal]=useState(null);
  const [userModal,setUserModal]=useState(null);
  const [showNotif,setShowNotif]=useState(false);
  const [search,setSearch]=useState("");
  const [filterType,setFilterType]=useState("semua");
  const [filterMonth,setFilterMonth]=useState("");
  const [filterYear,setFilterYear]=useState("2025");
  const [reportMonth,setReportMonth]=useState("05");
  const [reportYear,setReportYear]=useState("2025");
  const [profileForm,setProfileForm]=useState(profile);

  useEffect(()=>{setProfileForm(profile);},[profile]);

  const masuk=transactions.filter(t=>t.type==="pemasukan").reduce((s,t)=>s+t.jumlah,0);
  const keluar=transactions.filter(t=>t.type==="pengeluaran").reduce((s,t)=>s+t.jumlah,0);
  const saldo=masuk-keluar;
  const unreadNotif = notifs.filter(n=>!n.read).length;

  const addNotif = (judul,pesan,icon="💎",warna=C.gold) => setNotifs(ns=>[{id:uid(),judul,pesan,waktu:"Baru saja",read:false,icon,warna},...ns]);

  const saveTrx=data=>{
    if(data.id){
      setTrx(ts=>ts.map(t=>t.id===data.id?data:t));
      toast("Transaksi diperbarui");
    } else {
      setTrx(ts=>[...ts,{...data,id:uid()}]);
      toast(`${data.type==="pemasukan"?"Pemasukan":"Pengeluaran"} ${fmt(data.jumlah)} tercatat`,"gold");
      addNotif("Transaksi baru",`${data.type==="pemasukan"?"+":"-"}${fmt(data.jumlah)} - ${data.kategori}`,data.type==="pemasukan"?"💰":"💸",data.type==="pemasukan"?C.gold:C.red);
      if(data.program && data.type==="pengeluaran") setProgs(ps=>ps.map(p=>p.nama===data.program?{...p,terpakai:p.terpakai+data.jumlah}:p));
      if(data.donatur && data.type==="pemasukan") {
        setDonatur(ds=>{
          const exist = ds.find(d=>d.nama.toLowerCase()===data.donatur.toLowerCase());
          if(exist) return ds.map(d=>d.nama.toLowerCase()===data.donatur.toLowerCase()?{...d,total:d.total+data.jumlah,kali:d.kali+1,terakhir:data.tanggal}:d);
          return [...ds,{id:uid(),nama:data.donatur,telepon:"-",email:"",total:data.jumlah,kali:1,terakhir:data.tanggal,heema_account:false}];
        });
      }
    }
    setTrxModal(null);
  };
  const deleteTrx = async(t) => {
    const ok = await confirmDialog({title:"Hapus Transaksi?",message:`${t.kategori} sebesar ${fmt(t.jumlah)} akan dihapus.`,danger:true,okText:"Hapus"});
    if(!ok) return;
    setTrx(ts=>ts.filter(x=>x.id!==t.id));
    if(t.program && t.type==="pengeluaran") setProgs(ps=>ps.map(p=>p.nama===t.program?{...p,terpakai:Math.max(0,p.terpakai-t.jumlah)}:p));
    toast("Transaksi dihapus","info");
  };
  const saveProg = data => {
    if(data.id){ setProgs(ps=>ps.map(p=>p.id===data.id?data:p)); toast("Program diperbarui"); }
    else { setProgs(ps=>[...ps,{...data,id:uid()}]); toast(`Program "${data.nama}" dibuat`,"gold"); addNotif("Program baru",`${data.nama} - ${fmt(data.anggaran)}`,data.ikon,data.warna); }
    setProgModal(null);
  };
  const deleteProg = async(p) => {
    const ok = await confirmDialog({title:"Hapus Program?",message:`"${p.nama}" akan dihapus.`,danger:true,okText:"Hapus"});
    if(!ok) return;
    setProgs(ps=>ps.filter(x=>x.id!==p.id));
    toast(`Program ${p.nama} dihapus`,"info");
  };
  const saveDonatur = data => {
    if(data.id){ setDonatur(ds=>ds.map(d=>d.id===data.id?{...d,...data}:d)); toast("Data donatur diperbarui"); }
    else { setDonatur(ds=>[...ds,{...data,id:uid(),total:0,kali:0,terakhir:today(),heema_account:false}]); toast(`Donatur ${data.nama} ditambahkan`); }
    setDonaturModal(null);
  };
  const deleteDonatur = async(d) => {
    const ok = await confirmDialog({title:"Hapus Donatur?",message:`Data ${d.nama} akan dihapus.`,danger:true,okText:"Hapus"});
    if(!ok) return;
    setDonatur(ds=>ds.filter(x=>x.id!==d.id));
    toast("Donatur dihapus","info");
  };
  const saveUser = data => {
    if(data.id){ setUsers(us=>us.map(u=>u.id===data.id?data:u)); toast("Data anggota diperbarui"); }
    else { setUsers(us=>[...us,{...data,id:"u"+uid(),login:"Belum login",aktif:true}]); toast(`Undangan dikirim ke ${data.email}`,"gold"); addNotif("Anggota tim baru",`${data.nama} sebagai ${roleLabel[data.role]}`,"👤",C.purple); }
    setUserModal(null);
  };
  const deleteUser = async(u) => {
    const ok = await confirmDialog({title:"Hapus Anggota?",message:`${u.nama} akan dihapus.`,danger:true,okText:"Hapus"});
    if(!ok) return;
    setUsers(us=>us.filter(x=>x.id!==u.id));
    toast(`${u.nama} dihapus`,"info");
  };
  const toggleUserActive = u => {
    setUsers(us=>us.map(x=>x.id===u.id?{...x,aktif:!x.aktif}:x));
    toast(`${u.nama} ${u.aktif?"dinonaktifkan":"diaktifkan"}`,u.aktif?"info":"success");
  };
  const saveProfile = () => { setProfile(profileForm); toast("Profil disimpan","gold"); addNotif("Profil diperbarui","Profil masjid telah diupdate","⚙️",C.blue); };
  const togglePref = (key,label) => { setPrefs(p=>({...p,[key]:!p[key]})); toast(`${label} ${prefs[key]?"dinonaktifkan":"diaktifkan"}`); };
  const exportTrxCSV = () => exportCSV(transactions.map(t=>({Tanggal:t.tanggal,Tipe:t.type,Kategori:t.kategori,Jumlah:t.jumlah,Catatan:t.catatan||"",Program:t.program||"",Donatur:t.donatur||""})),`transaksi-${today()}.csv`);
  const exportBukuKasPDF = () => {
    let r = 0;
    const rows = [...transactions].sort((a,b)=>new Date(a.tanggal)-new Date(b.tanggal)).map(t=>{
      if(t.type==="pemasukan") r+=t.jumlah; else r-=t.jumlah;
      return {Tanggal:fmtDate(t.tanggal),Keterangan:t.catatan||t.kategori,Masuk:t.type==="pemasukan"?fmt(t.jumlah):"-",Keluar:t.type==="pengeluaran"?fmt(t.jumlah):"-",Saldo:fmt(r)};
    });
    exportPDF(`Buku Kas - ${profile.nama_masjid}`, rows, "buku-kas");
  };

  const filteredTrx = transactions
    .filter(t=>filterType==="semua"||t.type===filterType)
    .filter(t=>!filterMonth||t.tanggal.startsWith(`${filterYear}-${filterMonth}`))
    .filter(t=>[t.kategori,t.catatan,t.donatur].filter(Boolean).join(" ").toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));

  const reportTrx = transactions.filter(t=>t.tanggal.startsWith(`${reportYear}-${reportMonth}`));
  const reportMasuk = reportTrx.filter(t=>t.type==="pemasukan").reduce((s,t)=>s+t.jumlah,0);
  const reportKeluar = reportTrx.filter(t=>t.type==="pengeluaran").reduce((s,t)=>s+t.jumlah,0);

  const NAV=[{id:"home",icon:I.home,label:"Beranda"},{id:"transaksi",icon:I.trx,label:"Transaksi"},{id:"program",icon:I.prog,label:"Program"},{id:"laporan",icon:I.lap,label:"Laporan"},{id:"tim",icon:I.team,label:"Tim"}];

  const QUICK=[
    {icon:"💰",label:"Catat Masuk",bg:`${C.gold}18`,bd:`${C.gold}44`,action:()=>setTrxModal({defaultType:"pemasukan"})},
    {icon:"💸",label:"Catat Keluar",bg:C.redBg,bd:`${C.red}44`,action:()=>setTrxModal({defaultType:"pengeluaran"})},
    {icon:"📊",label:"Laporan",bg:C.blueBg,bd:`${C.blue}44`,action:()=>setPage("laporan")},
    {icon:"📌",label:"Program",bg:C.purpleBg,bd:`${C.purple}44`,action:()=>setPage("program")},
    {icon:"🤝",label:"Donatur",bg:C.greenBg,bd:`${C.green}44`,action:()=>setPage("donatur")},
    {icon:"🌙",label:"Zakat",bg:`${C.gold}18`,bd:`${C.gold}44`,action:()=>setTrxModal({defaultType:"pemasukan"})},
    {icon:"⚙️",label:"Setting",bg:C.navy3,bd:C.navy5,action:()=>setPage("settings")},
    {icon:"📄",label:"Export",bg:"#1a0a1a",bd:"#3d1d3d",action:exportTrxCSV},
  ];
  const chartData = ["Jan","Feb","Mar","Apr","Mei"].map((label,i)=>({label,vals:[i===4?reportMasuk/1e6||masuk/1e6:Math.random()*15+3,i===4?reportKeluar/1e6||keluar/1e6:Math.random()*8+1]}));

  // Show onboarding gate
  if(needsOnboarding) {
    return <OnboardingModal profile={profile} onComplete={completeOnboarding}/>;
  }

  return (
    <div className="min-h-screen flex bg-pattern" style={{background:C.navy}}>
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-30" style={{background:C.navy2,borderRight:`1px solid ${C.navy5}`}}>
        <div className="px-5 py-5" style={{borderBottom:`1px solid ${C.navy5}`}}>
          <div className="flex items-center gap-3">
            <HeemaLogo size={44}/>
            <div>
              <div className="text-2xl font-bold gold-shimmer serif tracking-tight">HEEMA</div>
              <div className="flex items-center gap-1.5 mt-1"><div className="w-1 h-1 rounded-full" style={{background:C.gold}}/><span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{color:C.textMute}}>Masjid Finance</span></div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3" style={{borderBottom:`1px solid ${C.navy5}`}}>
          <div className="rounded-xl p-3.5 bg-pattern-fine" style={{background:C.navy3,border:`1px solid ${C.gold}33`}}>
            <div className="text-xs font-bold truncate" style={{color:C.text}}>{profile.nama_masjid}</div>
            <div className="text-[10px] mt-0.5" style={{color:C.textMute}}>{profile.kota} · Paket Pro</div>
            <div className="mt-3 pt-3" style={{borderTop:`1px solid ${C.navy5}`}}>
              <div className="text-[10px] uppercase tracking-[0.15em] font-bold mb-0.5" style={{color:C.textMute}}>Saldo Kas</div>
              <div className="font-bold text-xl serif gold-shimmer font-num">{fmtS(saldo)}</div>
              <div className="flex gap-3 mt-1.5">
                <span className="text-[10px] flex items-center gap-1" style={{color:C.green}}>{I.up}<span className="font-num">{fmtS(masuk)}</span></span>
                <span className="text-[10px] flex items-center gap-1" style={{color:C.red}}>{I.down}<span className="font-num">{fmtS(keluar)}</span></span>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold press relative" style={page===n.id?{background:C.navy3,color:C.gold}:{color:C.textMute}}>
            {page===n.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:C.gold,boxShadow:`0 0 8px ${C.gold}`}}/>}
            <span style={{color:page===n.id?C.gold:C.textMute}}>{n.icon}</span>{n.label}
          </button>))}
          <button onClick={()=>setPage("donatur")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold press relative" style={page==="donatur"?{background:C.navy3,color:C.gold}:{color:C.textMute}}>
            {page==="donatur" && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:C.gold}}/>}
            <span style={{color:page==="donatur"?C.gold:C.textMute}}>{I.don}</span>Donatur
          </button>
          <button onClick={()=>setPage("donasi-online")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold press relative" style={page==="donasi-online"?{background:C.navy3,color:C.gold}:{color:C.textMute}}>
            {page==="donasi-online" && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:C.gold}}/>}
            <span style={{color:page==="donasi-online"?C.gold:C.textMute,fontSize:18}}>💝</span>
            <span className="flex-1 text-left">Donasi Online</span>
            {donasiPublik.filter(d=>d.status==="pending").length>0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold pulse-gold" style={{background:C.gold,color:C.navy}}>
                {donasiPublik.filter(d=>d.status==="pending").length}
              </span>
            )}
          </button>
          <button onClick={()=>setPage("settings")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold press relative" style={page==="settings"?{background:C.navy3,color:C.gold}:{color:C.textMute}}>
            {page==="settings" && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:C.gold}}/>}
            <span style={{color:page==="settings"?C.gold:C.textMute}}>{I.set}</span>Pengaturan
          </button>
        </nav>
        <div className="p-4 space-y-3" style={{borderTop:`1px solid ${C.navy5}`}}>
          <GoldBtn onClick={()=>setTrxModal({defaultType:"pemasukan"})} full sm icon={I.plus}>Catat Transaksi</GoldBtn>
          <div className="flex items-center gap-2.5"><Avatar nama={profile.nama_admin} size={34} gold/><div className="flex-1 min-w-0"><div className="text-xs font-bold truncate" style={{color:C.text}}>{profile.nama_admin}</div><div className="text-[10px]" style={{color:C.textMute}}>Admin</div></div><button onClick={onLogout} className="press p-1.5 rounded-md" style={{color:C.textMute,background:C.navy3}}>{I.logout}</button></div>
        </div>
      </aside>

      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3 lg:px-6 lg:py-4" style={{background:`${C.navy2}f5`,borderBottom:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
          <div className="lg:hidden flex items-center gap-2.5"><HeemaLogo size={32}/><div className="text-xl font-bold gold-shimmer serif tracking-tight">HEEMA</div></div>
          <div className="hidden lg:block flex-1">
            <div className="font-bold text-xl serif" style={{color:C.gold}}>{NAV.find(n=>n.id===page)?.label||(page==="settings"?"Pengaturan":page==="donatur"?"Donatur":"")}</div>
            <div className="text-xs mt-0.5" style={{color:C.textMute}}>{fmtDateLong(today())}</div>
          </div>
          <div className="flex-1 lg:flex-none"/>
          <button onClick={()=>setTrxModal({defaultType:"pemasukan"})} className="lg:hidden press px-3 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1" style={{background:`linear-gradient(135deg,${C.goldDk},${C.gold},${C.goldLt})`,color:"#1a1208"}}>{I.plus}Catat</button>
          <button onClick={()=>setShowNotif(true)} className="press p-2 rounded-lg relative" style={{color:C.textMute,background:C.navy3,border:`1px solid ${C.navy5}`}}>
            {I.bell}
            {unreadNotif>0 && <div className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full px-1 flex items-center justify-center text-[9px] font-bold" style={{background:C.gold,color:C.navy,boxShadow:`0 0 6px ${C.gold}`}}>{unreadNotif}</div>}
          </button>
        </header>

        <main className="flex-1 px-4 pt-4 lg:px-6 lg:pt-6 pb-24 lg:pb-6">
          {page==="home" && (
            <div className="space-y-4 fu">
              <div className="relative rounded-2xl overflow-hidden bg-pattern-fine p-5" style={{background:`linear-gradient(135deg,${C.navy3} 0%,${C.navy2} 100%)`,border:`1px solid ${C.gold}55`,boxShadow:`0 0 32px ${C.goldGlow}`}}>
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{background:C.goldGlow,filter:"blur(40px)"}}/>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5"><div className="w-1 h-3.5 rounded-full" style={{background:C.gold}}/><span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{color:C.gold}}>Assalamu'alaikum</span></div>
                      <div className="font-bold text-2xl serif" style={{color:C.text}}>{profile.nama_admin}</div>
                      <div className="text-xs mt-0.5" style={{color:C.textMute}}>{profile.nama_masjid}</div>
                    </div>
                    <HeemaLogo size={48} animate/>
                  </div>
                  <div className="mt-5 p-4 rounded-xl" style={{background:"rgba(8,17,31,.6)",backdropFilter:"blur(12px)",border:`1px solid ${C.gold}33`}}>
                    <div className="flex items-center justify-between mb-2"><div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{color:C.goldDk}}>Saldo Kas Masjid</div><div className="text-[10px]" style={{color:C.textMute}}>{fmtDate(today())}</div></div>
                    <div className="text-3xl font-bold serif font-num gold-shimmer">
                      <AnimatedNum value={saldo}/>
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-md flex items-center justify-center" style={{background:`${C.green}22`,color:C.green}}>{I.up}</div><div><div className="text-[10px] font-semibold uppercase" style={{color:C.textMute}}>Masuk</div><div className="text-xs font-bold font-num" style={{color:C.green}}>{fmt(masuk)}</div></div></div>
                      <div style={{width:1,background:`linear-gradient(180deg,transparent,${C.gold}55,transparent)`}}/>
                      <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-md flex items-center justify-center" style={{background:`${C.red}22`,color:C.red}}>{I.down}</div><div><div className="text-[10px] font-semibold uppercase" style={{color:C.textMute}}>Keluar</div><div className="text-xs font-bold font-num" style={{color:C.red}}>{fmt(keluar)}</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fu1"><BannerSlider/></div>
              <div className="fu2 grid grid-cols-4 gap-2.5">
                {QUICK.map(q=>(<button key={q.label} onClick={q.action} className="flex flex-col items-center gap-2 p-2.5 rounded-xl press hover:bg-white/[0.03]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:q.bg,border:`1px solid ${q.bd}`,boxShadow:`0 4px 12px rgba(0,0,0,.2)`}}>{q.icon}</div>
                  <span className="text-[10px] font-semibold text-center leading-tight" style={{color:C.textDim}}>{q.label}</span>
                </button>))}
              </div>
              <div className="fu3 grid grid-cols-3 gap-2.5">
                {[{l:"Pemasukan",v:fmtS(masuk),c:C.gold,trend:[3,5,4,7,5,8]},{l:"Pengeluaran",v:fmtS(keluar),c:C.red,trend:[2,3,4,2,5,3]},{l:"Transaksi",v:transactions.length,c:C.blue,trend:[8,11,9,14,12,transactions.length]}].map(k=>(
                  <Card key={k.l} className="p-3"><div className="text-[9px] uppercase tracking-[0.15em] font-bold mb-1.5" style={{color:C.textMute}}>{k.l}</div><div className="flex items-end justify-between"><div className="text-base font-bold serif font-num" style={{color:k.c}}>{k.v}</div><Sparkline values={k.trend} color={k.c}/></div></Card>
                ))}
              </div>
              <Card className="overflow-hidden fu4">
                <div className="px-4 py-3.5 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
                  <div className="flex items-center gap-2"><div className="w-1 h-3.5 rounded-full" style={{background:C.gold}}/><div className="font-bold text-sm serif" style={{color:C.text}}>Program Aktif</div></div>
                  <button onClick={()=>setPage("program")} className="press text-xs font-bold flex items-center gap-1" style={{color:C.gold}}>Semua {I.chev}</button>
                </div>
                {programs.filter(p=>p.status==="aktif").map((p,i)=>{
                  const pct=Math.min((p.terpakai/p.anggaran)*100,100);
                  return (<div key={p.id}>{i>0&&<Divider/>}
                    <div className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:`${p.warna}18`,border:`1px solid ${p.warna}44`}}>{p.ikon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1"><span className="font-semibold truncate text-sm" style={{color:C.text}}>{p.nama}</span><span className="font-bold ml-2 text-xs font-num" style={{color:p.warna}}>{Math.round(pct)}%</span></div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{background:C.navy2}}><div className="h-full rounded-full" style={{width:`${pct}%`,background:`linear-gradient(90deg,${p.warna},${p.warna}aa)`,boxShadow:`0 0 6px ${p.warna}66`}}/></div>
                          <div className="flex justify-between text-[10px] mt-1.5 font-num" style={{color:C.textMute}}><span>{fmtS(p.terpakai)}</span><span>/ {fmtS(p.anggaran)}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>);
                })}
              </Card>
              <Card className="overflow-hidden">
                <div className="px-4 py-3.5 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
                  <div className="flex items-center gap-2"><div className="w-1 h-3.5 rounded-full" style={{background:C.gold}}/><div className="font-bold text-sm serif" style={{color:C.text}}>Transaksi Terbaru</div></div>
                  <button onClick={()=>setPage("transaksi")} className="press text-xs font-bold flex items-center gap-1" style={{color:C.gold}}>Semua {I.chev}</button>
                </div>
                {[...transactions].sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal)).slice(0,5).map((t,i)=>(<div key={t.id}>{i>0&&<Divider/>}
                  <div className="px-4 py-3 flex items-center gap-3 press" onClick={()=>setTrxModal(t)}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{background:t.type==="pemasukan"?`${C.gold}18`:C.redBg,border:`1px solid ${t.type==="pemasukan"?C.gold+"44":C.red+"44"}`}}>{t.type==="pemasukan"?"💰":"💸"}</div>
                    <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate" style={{color:C.text}}>{t.kategori}</div><div className="text-[11px]" style={{color:C.textMute}}>{fmtDate(t.tanggal)} · {t.catatan?.slice(0,28)}</div></div>
                    <span className="text-sm font-bold whitespace-nowrap font-num" style={{color:t.type==="pemasukan"?C.gold:C.red}}>{t.type==="pemasukan"?"+":"-"}{fmt(t.jumlah)}</span>
                  </div>
                </div>))}
              </Card>
            </div>
          )}

          {page==="transaksi" && (
            <div className="space-y-4 fu">
              <div className="flex flex-wrap gap-2">
                <GoldBtn sm icon={I.plus} onClick={()=>setTrxModal({defaultType:"pemasukan"})}>Pemasukan</GoldBtn>
                <NavyBtn sm danger icon={I.plus} onClick={()=>setTrxModal({defaultType:"pengeluaran"})}>Pengeluaran</NavyBtn>
                <div className="flex-1"/>
                <NavyBtn sm icon={I.excel} onClick={()=>exportExcel({
                  title:"Daftar Transaksi",
                  subtitle:`${filteredTrx.length} entri · ${fmtDateLong(today())}`,
                  rows:filteredTrx.map(t=>({Tanggal:fmtDate(t.tanggal),Tipe:t.type==="pemasukan"?"Pemasukan":"Pengeluaran",Kategori:t.kategori,Catatan:t.catatan||"-",Program:t.program||"-",Donatur:t.donatur||"-",Jumlah:(t.type==="pemasukan"?"+":"-")+fmt(t.jumlah)})),
                  summary:{"Total Pemasukan":fmt(filteredTrx.filter(t=>t.type==="pemasukan").reduce((s,t)=>s+t.jumlah,0)),"Total Pengeluaran":fmt(filteredTrx.filter(t=>t.type==="pengeluaran").reduce((s,t)=>s+t.jumlah,0))},
                  filename:"transaksi",
                  masjid:profile
                })}>Excel</NavyBtn>
                <NavyBtn sm icon={I.pdf} onClick={()=>exportPDF({
                  title:"Daftar Transaksi",
                  subtitle:`${filteredTrx.length} entri · ${fmtDateLong(today())}`,
                  rows:filteredTrx.map(t=>({Tanggal:fmtDate(t.tanggal),Tipe:t.type==="pemasukan"?"Masuk":"Keluar",Kategori:t.kategori,Catatan:(t.catatan||"").slice(0,40),Jumlah:(t.type==="pemasukan"?"+":"-")+fmt(t.jumlah)})),
                  summary:{"Pemasukan":fmt(filteredTrx.filter(t=>t.type==="pemasukan").reduce((s,t)=>s+t.jumlah,0)),"Pengeluaran":fmt(filteredTrx.filter(t=>t.type==="pengeluaran").reduce((s,t)=>s+t.jumlah,0))},
                  filename:"transaksi",
                  masjid:profile
                })}>PDF</NavyBtn>
              </div>
              <Card className="p-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="relative flex-1 min-w-[200px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:C.textMute}}>{I.search}</span>
                    <input id="trx-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari kategori, catatan, donatur..." className="w-full rounded-lg pl-9 pr-9 py-2 text-sm focus:outline-none"
                      style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}
                      onFocus={e=>e.target.style.borderColor=C.gold+"66"} onBlur={e=>e.target.style.borderColor=C.navy5}/>
                    {search && <button onClick={()=>setSearch("")} className="press absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute,fontSize:10}}>✕</button>}
                  </div>
                  <select value={filterType} onChange={e=>setFilterType(e.target.value)} className="rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none" style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}>
                    <option value="semua">Semua Tipe</option><option value="pemasukan">Pemasukan</option><option value="pengeluaran">Pengeluaran</option>
                  </select>
                  <select value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} className="rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none" style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}>
                    <option value="">Semua Bulan</option>{MONTHS.map(m=><option key={m.v} value={m.v}>{m.l}</option>)}
                  </select>
                  <select value={filterYear} onChange={e=>setFilterYear(e.target.value)} className="rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none" style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}>
                    {["2023","2024","2025"].map(y=><option key={y}>{y}</option>)}
                  </select>
                </div>
              </Card>
              <div className="grid grid-cols-3 gap-2.5">
                {[["Pemasukan",filteredTrx.filter(t=>t.type==="pemasukan").reduce((s,t)=>s+t.jumlah,0),C.gold],["Pengeluaran",filteredTrx.filter(t=>t.type==="pengeluaran").reduce((s,t)=>s+t.jumlah,0),C.red],["Total",filteredTrx.length+" Entri",C.blue]].map(([l,v,c])=>(
                  <Card key={l} className="p-3"><div className="text-[9px] uppercase tracking-[0.15em] font-bold" style={{color:C.textMute}}>{l}</div><div className="text-base font-bold serif font-num mt-1" style={{color:c}}>{typeof v==="number"?fmtS(v):v}</div></Card>
                ))}
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr style={{background:C.navy2,borderBottom:`1px solid ${C.navy5}`}}>
                      {["Tanggal","Kategori","Catatan","Program","Jumlah",""].map(h=><th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap" style={{color:C.textMute}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {filteredTrx.map(t=>(<tr key={t.id} style={{borderBottom:`1px solid ${C.navy5}55`}} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-xs whitespace-nowrap font-num" style={{color:C.textMute}}>{fmtDate(t.tanggal)}</td>
                        <td className="px-4 py-3"><Chip label={t.kategori} color={t.type==="pemasukan"?C.gold:C.red} bg={t.type==="pemasukan"?`${C.gold}18`:C.redBg} size="sm"/></td>
                        <td className="px-4 py-3 text-xs max-w-[160px] truncate" style={{color:C.textDim}}>{t.catatan}</td>
                        <td className="px-4 py-3 text-xs" style={{color:C.textMute}}>{t.program||"—"}</td>
                        <td className="px-4 py-3 text-sm font-bold whitespace-nowrap font-num" style={{color:t.type==="pemasukan"?C.gold:C.red}}>{t.type==="pemasukan"?"+":"-"}{fmt(t.jumlah)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={()=>printReceipt(t,profile)} title="Cetak Bukti" className="press w-7 h-7 rounded-md flex items-center justify-center" style={{background:`${C.blue}18`,color:C.blue}}>{I.pdf}</button>
                            <button onClick={()=>setTrxModal(t)} title="Edit" className="press w-7 h-7 rounded-md flex items-center justify-center" style={{background:`${C.gold}18`,color:C.gold}}>{I.edit}</button>
                            <button onClick={()=>deleteTrx(t)} title="Hapus" className="press w-7 h-7 rounded-md flex items-center justify-center" style={{background:C.redBg,color:C.red}}>{I.trash}</button>
                          </div>
                        </td>
                      </tr>))}
                      {filteredTrx.length===0 && <tr><td colSpan={6} className="text-center py-12" style={{color:C.textMute}}>Tidak ada transaksi ditemukan</td></tr>}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {page==="program" && (
            <div className="space-y-4 fu">
              <div className="flex items-center justify-between">
                <div><div className="font-bold text-lg serif" style={{color:C.text}}>Program & Kegiatan</div><div className="text-xs" style={{color:C.textMute}}>{programs.length} program · {programs.filter(p=>p.status==="aktif").length} aktif</div></div>
                <GoldBtn sm icon={I.plus} onClick={()=>setProgModal({})}>Buat Program</GoldBtn>
              </div>
              <Card gold className="p-5 bg-pattern-fine relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full" style={{background:C.goldGlow,filter:"blur(30px)"}}/>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5" style={{color:C.textMute}}>Total Anggaran Program</div>
                  <div className="text-3xl font-bold serif gold-shimmer font-num">{fmt(programs.reduce((s,p)=>s+p.anggaran,0))}</div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <div><span className="font-semibold" style={{color:C.textMute}}>Terpakai: </span><span className="font-bold font-num" style={{color:C.red}}>{fmt(programs.reduce((s,p)=>s+p.terpakai,0))}</span></div>
                    <div><span className="font-semibold" style={{color:C.textMute}}>Sisa: </span><span className="font-bold font-num" style={{color:C.green}}>{fmt(programs.reduce((s,p)=>s+(p.anggaran-p.terpakai),0))}</span></div>
                  </div>
                </div>
              </Card>
              <div className="space-y-3">
                {programs.map(p=>{
                  const pct=p.anggaran>0?Math.min((p.terpakai/p.anggaran)*100,100):0;
                  return (<Card key={p.id} className="overflow-hidden lift">
                    {p.pamflet && (
                      <div className="relative w-full" style={{aspectRatio:"1/1",maxHeight:280,overflow:"hidden"}}>
                        <img src={p.pamflet} alt={p.nama} className="w-full h-full object-cover"/>
                        <div className="absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)",border:`1px solid ${C.gold}44`}}>📸 Pamflet</div>
                        <div className="absolute bottom-0 left-0 right-0 p-3" style={{background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%)"}}>
                          <div className="font-bold serif text-white" style={{fontSize:18}}>{p.nama}</div>
                          <Chip label={p.status==="aktif"?"● Aktif":p.status==="rencana"?"○ Rencana":"✓ Selesai"} color={p.status==="aktif"?C.green:p.status==="rencana"?C.gold:C.textMute} size="sm"/>
                        </div>
                      </div>
                    )}
                    {!p.pamflet && <div className="h-1" style={{background:`linear-gradient(90deg,${p.warna} ${pct}%,${C.navy2} ${pct}%)`}}/>}
                    {p.pamflet && <div className="h-1" style={{background:`linear-gradient(90deg,${p.warna} ${pct}%,${C.navy2} ${pct}%)`}}/>}
                    <div className="p-4">
                      {!p.pamflet && (
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:`${p.warna}18`,border:`1px solid ${p.warna}44`,boxShadow:`0 4px 12px ${p.warna}22`}}>{p.ikon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold serif" style={{color:C.text,fontSize:15}}>{p.nama}</span>
                              <Chip label={p.status==="aktif"?"Aktif":p.status==="rencana"?"Rencana":"Selesai"} color={p.status==="aktif"?C.green:p.status==="rencana"?C.gold:C.textMute} size="sm"/>
                            </div>
                            <p className="text-xs mt-0.5" style={{color:C.textMute}}>{p.deskripsi}</p>
                          </div>
                          <div className="text-right flex-shrink-0"><div className="font-bold serif font-num" style={{color:p.warna,fontSize:18}}>{Math.round(pct)}%</div></div>
                        </div>
                      )}
                      {p.pamflet && (
                        <div className="flex items-baseline justify-between mb-2">
                          <p className="text-xs flex-1" style={{color:C.textMute}}>{p.deskripsi}</p>
                          <div className="font-bold serif font-num ml-3" style={{color:p.warna,fontSize:18}}>{Math.round(pct)}%</div>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {[["Anggaran",fmtS(p.anggaran),C.textDim],["Terpakai",fmtS(p.terpakai),C.red],["Sisa",fmtS(p.anggaran-p.terpakai),C.green]].map(([l,v,c])=>(
                          <div key={l} className="rounded-lg p-2.5 text-center" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                            <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>{l}</div>
                            <div className="text-xs font-bold mt-1 font-num" style={{color:c}}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3 justify-end">
                        <button onClick={()=>setProgModal(p)} className="press px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5" style={{background:`${C.gold}18`,color:C.gold,border:`1px solid ${C.gold}33`}}>{I.edit} Edit</button>
                        <button onClick={()=>deleteProg(p)} className="press px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5" style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}33`}}>{I.trash} Hapus</button>
                      </div>
                    </div>
                  </Card>);
                })}
                {programs.length===0 && (<Card><EmptyState icon="📌" title="Belum ada program" desc="Buat program pertama untuk mulai mengelola anggaran kegiatan masjid Anda." action={<GoldBtn sm icon={I.plus} onClick={()=>setProgModal({})}>Buat Program Pertama</GoldBtn>}/></Card>)}
              </div>
            </div>
          )}

          {page==="donatur" && (
            <div className="space-y-4 fu">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><div className="font-bold text-lg serif" style={{color:C.text}}>Data Donatur</div><div className="text-xs" style={{color:C.textMute}}>{donatur.length} donatur · {donatur.filter(d=>d.heema_account).length} terhubung dengan Heema</div></div>
                <div className="flex gap-2">
                  <NavyBtn sm icon={I.excel} onClick={()=>exportExcel({
                    title:"Daftar Donatur",
                    subtitle:`Per ${fmtDateLong(today())}`,
                    rows:donatur.map((d,i)=>({Rank:i+1,Nama:d.nama,Email:d.email||"-",Telepon:d.telepon||"-",Total:fmt(d.total),Donasi:d.kali+"×",Terakhir:fmtDate(d.terakhir),Sumber:d.heema_account?(d.googleAuth?"Heema (Google)":"Heema"):"Manual"})),
                    summary:{"Total Donatur":donatur.length,"Total Donasi":fmt(donatur.reduce((s,d)=>s+d.total,0)),"Donatur Heema":donatur.filter(d=>d.heema_account).length},
                    filename:"daftar-donatur",
                    masjid:profile
                  })}>Excel</NavyBtn>
                  <NavyBtn sm icon={I.pdf} onClick={()=>exportPDF({
                    title:"Daftar Donatur Masjid",
                    subtitle:`Periode: ${fmtDateLong(today())}`,
                    rows:[...donatur].sort((a,b)=>b.total-a.total).map((d,i)=>({"#":i+1,Nama:d.nama,Kontak:d.telepon!=="-"?d.telepon:(d.email||"-"),"Total Donasi":fmt(d.total),Kali:d.kali,Terakhir:fmtDate(d.terakhir)})),
                    summary:{"Total Donatur":donatur.length,"Total Donasi Diterima":fmt(donatur.reduce((s,d)=>s+d.total,0)),"Donatur via Heema":donatur.filter(d=>d.heema_account).length,"Rata-rata":fmt(donatur.reduce((s,d)=>s+d.total,0)/(donatur.length||1))},
                    filename:"daftar-donatur",
                    masjid:profile
                  })}>PDF</NavyBtn>
                  <GoldBtn sm icon={I.plus} onClick={()=>setDonaturModal({})}>Tambah</GoldBtn>
                </div>
              </div>
              <Card gold className="p-5 bg-pattern-fine relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full" style={{background:`${C.green}22`,filter:"blur(30px)"}}/>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5" style={{color:C.textMute}}>Total Donasi Diterima</div>
                  <div className="text-3xl font-bold serif font-num" style={{color:C.green}}>{fmt(donatur.reduce((s,d)=>s+d.total,0))}</div>
                  <div className="text-xs mt-1.5" style={{color:C.textMute}}>{donatur.length} donatur · {donatur.reduce((s,d)=>s+d.kali,0)} transaksi</div>
                </div>
              </Card>
              <div className="space-y-3">
                {[...donatur].sort((a,b)=>b.total-a.total).map((d,i)=>(
                  <Card key={d.id} className="p-4 lift">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar nama={d.nama} size={44} gold={i===0}/>
                        {i<3 && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{background:i===0?C.gold:i===1?C.textDim:"#cd7f32",color:C.navy}}>#{i+1}</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <div className="font-bold truncate" style={{color:C.text}}>{d.nama}</div>
                          {d.heema_account && (
                            <Chip label={d.googleAuth?"✓ Google":"✓ Heema"} color={C.gold} bg={C.goldGlow} size="sm"/>
                          )}
                        </div>
                        <div className="text-[11px] mt-0.5 flex items-center gap-2 flex-wrap" style={{color:C.textMute}}>
                          {d.telepon && d.telepon!=="-" && <span>📞 {d.telepon}</span>}
                          {d.email && <span>✉ {d.email}</span>}
                          {(!d.telepon||d.telepon==="-") && !d.email && <span style={{color:C.textFaint}}>Tidak ada kontak</span>}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{color:C.textFaint}}>{d.kali}× donasi · Terakhir: {fmtDate(d.terakhir)}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold serif font-num" style={{color:i===0?C.gold:C.green,fontSize:15}}>{fmt(d.total)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 justify-end">
                      <button onClick={()=>setDonaturModal(d)} className="press px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5" style={{background:`${C.gold}18`,color:C.gold}}>{I.edit} Edit</button>
                      <button onClick={()=>deleteDonatur(d)} className="press px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5" style={{background:C.redBg,color:C.red}}>{I.trash} Hapus</button>
                    </div>
                  </Card>
                ))}
                {donatur.length===0 && (<Card><EmptyState icon="🤝" title="Belum ada donatur" desc="Donatur akan tercatat otomatis saat Anda mencatat pemasukan dengan nama donatur, atau tambahkan manual." action={<GoldBtn sm icon={I.plus} onClick={()=>setDonaturModal({})}>Tambah Donatur</GoldBtn>}/></Card>)}
              </div>
            </div>
          )}

          {page==="laporan" && (
            <div className="space-y-4 fu">
              <Card className="p-5 bg-pattern-fine">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="serif font-bold text-lg" style={{color:C.gold}}>Laporan Keuangan</div></div>
                    <div className="text-xs mt-1" style={{color:C.textMute}}>{MONTHS.find(m=>m.v===reportMonth)?.l} {reportYear}</div>
                  </div>
                  <div className="flex gap-2">
                    <select value={reportMonth} onChange={e=>setReportMonth(e.target.value)} className="rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none" style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}>{MONTHS.map(m=><option key={m.v} value={m.v}>{m.l}</option>)}</select>
                    <select value={reportYear} onChange={e=>setReportYear(e.target.value)} className="rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none" style={{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.text}}>{["2023","2024","2025"].map(y=><option key={y}>{y}</option>)}</select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[["Pemasukan",reportMasuk,C.gold],["Pengeluaran",reportKeluar,C.red],["Saldo",reportMasuk-reportKeluar,C.blue]].map(([l,v,c])=>(
                    <div key={l} className="rounded-lg p-3 text-center" style={{background:C.navy2,border:`1px solid ${c}33`}}>
                      <div className="text-[10px] uppercase tracking-[0.15em] font-bold" style={{color:C.textMute}}>{l}</div>
                      <div className="text-sm font-bold serif mt-1.5 font-num" style={{color:c}}>{fmtS(v)}</div>
                    </div>
                  ))}
                </div>
                <BarChart data={chartData} colors={[C.gold,C.red]}/>
                <div className="flex gap-3 text-[10px] mt-3" style={{color:C.textMute}}>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{background:C.gold}}/>Masuk</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{background:C.red}}/>Keluar</span>
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="px-4 py-3.5 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
                  <div className="flex items-center gap-2"><div className="w-1 h-3.5 rounded-full" style={{background:C.gold}}/><div className="font-bold text-sm serif" style={{color:C.text}}>📒 Buku Kas</div></div>
                <div className="flex gap-2">
                  <GoldBtn sm outline icon={I.excel} onClick={()=>{
                    let r=0;
                    const rows = [...transactions].sort((a,b)=>new Date(a.tanggal)-new Date(b.tanggal)).map(t=>{
                      if(t.type==="pemasukan") r+=t.jumlah; else r-=t.jumlah;
                      return {Tanggal:fmtDate(t.tanggal),Keterangan:t.catatan||t.kategori,Kategori:t.kategori,Program:t.program||"-",Donatur:t.donatur||"-",Masuk:t.type==="pemasukan"?fmt(t.jumlah):"-",Keluar:t.type==="pengeluaran"?fmt(t.jumlah):"-",Saldo:fmt(r)};
                    });
                    exportExcel({
                      title:"Laporan Keuangan Masjid",
                      subtitle:`Periode: ${MONTHS.find(m=>m.v===reportMonth)?.l} ${reportYear}`,
                      rows,
                      summary:{"Total Pemasukan":fmt(reportMasuk),"Total Pengeluaran":fmt(reportKeluar),"Saldo Akhir":fmt(reportMasuk-reportKeluar)},
                      filename:`laporan-keuangan-${reportYear}-${reportMonth}`,
                      masjid:profile
                    });
                  }}>Excel</GoldBtn>
                  <GoldBtn sm outline icon={I.pdf} onClick={()=>{
                    let r=0;
                    const rows = [...transactions].sort((a,b)=>new Date(a.tanggal)-new Date(b.tanggal)).map(t=>{
                      if(t.type==="pemasukan") r+=t.jumlah; else r-=t.jumlah;
                      return {Tanggal:fmtDate(t.tanggal),Keterangan:(t.catatan||t.kategori).slice(0,40),Masuk:t.type==="pemasukan"?fmt(t.jumlah):"-",Keluar:t.type==="pengeluaran"?fmt(t.jumlah):"-",Saldo:fmt(r)};
                    });
                    exportPDF({
                      title:"Laporan Keuangan Masjid",
                      subtitle:`Periode: ${MONTHS.find(m=>m.v===reportMonth)?.l} ${reportYear} · Buku Kas Bulanan`,
                      rows,
                      summary:{"Pemasukan":fmt(reportMasuk),"Pengeluaran":fmt(reportKeluar),"Saldo":fmt(reportMasuk-reportKeluar),"Transaksi":reportTrx.length+" entri"},
                      filename:`laporan-keuangan-${reportYear}-${reportMonth}`,
                      masjid:profile
                    });
                  }}>PDF</GoldBtn>
                </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr style={{background:C.navy2,borderBottom:`1px solid ${C.navy5}`}}>
                      {["Tanggal","Keterangan","Masuk","Keluar","Saldo"].map(h=><th key={h} className="text-left px-3 py-2.5 font-bold uppercase tracking-[0.1em] whitespace-nowrap text-[10px]" style={{color:C.textMute}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {(()=>{let r=0;return [...transactions].sort((a,b)=>new Date(a.tanggal)-new Date(b.tanggal)).map(t=>{
                        if(t.type==="pemasukan")r+=t.jumlah;else r-=t.jumlah;
                        return (<tr key={t.id} style={{borderBottom:`1px solid ${C.navy5}33`}} className="hover:bg-white/[0.02]">
                          <td className="px-3 py-2.5 whitespace-nowrap font-num" style={{color:C.textMute}}>{fmtDate(t.tanggal)}</td>
                          <td className="px-3 py-2.5 max-w-[140px] truncate" style={{color:C.textDim}}>{t.catatan||t.kategori}</td>
                          <td className="px-3 py-2.5 font-bold whitespace-nowrap font-num" style={{color:t.type==="pemasukan"?C.gold:C.textFaint}}>{t.type==="pemasukan"?fmt(t.jumlah):"—"}</td>
                          <td className="px-3 py-2.5 font-bold whitespace-nowrap font-num" style={{color:t.type==="pengeluaran"?C.red:C.textFaint}}>{t.type==="pengeluaran"?fmt(t.jumlah):"—"}</td>
                          <td className="px-3 py-2.5 font-bold whitespace-nowrap font-num" style={{color:r>=0?C.blue:C.red}}>{fmt(r)}</td>
                        </tr>);
                      });})()}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {page==="tim" && (
            <div className="space-y-4 fu">
              <div className="flex items-center justify-between">
                <div><div className="font-bold text-lg serif" style={{color:C.text}}>Tim Pengurus</div><div className="text-xs" style={{color:C.textMute}}>{users.length} anggota · {users.filter(u=>u.aktif).length} aktif</div></div>
                <GoldBtn sm icon={I.plus} onClick={()=>setUserModal({})}>Undang</GoldBtn>
              </div>
              <Card className="overflow-hidden">
                {users.map((u,i)=>(<div key={u.id}>{i>0&&<Divider/>}
                  <div className="px-4 py-3.5 flex items-center gap-3 hover:bg-white/[0.02]">
                    <Avatar nama={u.nama} size={42}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><span className="text-sm font-bold" style={{color:C.text}}>{u.nama}</span><Chip label={roleLabel[u.role]} color={roleColor[u.role]} size="sm"/>{!u.aktif&&<Chip label="Nonaktif" color={C.textMute} size="sm"/>}</div>
                      <div className="text-[11px] mt-0.5" style={{color:C.textMute}}>{u.email}</div>
                      <div className="text-[10px] mt-0.5" style={{color:C.textFaint}}>Login: {u.login}</div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={()=>setUserModal(u)} className="press w-7 h-7 rounded-md flex items-center justify-center" style={{background:`${C.gold}18`,color:C.gold}}>{I.edit}</button>
                      <button onClick={()=>toggleUserActive(u)} className="press px-2.5 py-1 rounded-md text-[10px] font-bold" style={u.aktif?{background:C.redBg,color:C.red}:{background:C.greenBg,color:C.green}}>{u.aktif?"Nonaktif":"Aktifkan"}</button>
                      {u.role!=="admin" && <button onClick={()=>deleteUser(u)} className="press w-7 h-7 rounded-md flex items-center justify-center" style={{background:C.redBg,color:C.red}}>{I.trash}</button>}
                    </div>
                  </div>
                </div>))}
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Hak Akses Per Role</div></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr style={{borderBottom:`1px solid ${C.navy5}`}}>
                      <th className="text-left py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{color:C.textMute}}>Aksi</th>
                      {Object.entries(roleLabel).map(([k,r])=><th key={k} className="text-center py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{color:roleColor[k]}}>{r}</th>)}
                    </tr></thead>
                    <tbody>
                      {[["Catat Transaksi","✓","✓","—","—"],["Edit Transaksi","✓","✓","—","—"],["Hapus Transaksi","✓","—","—","—"],["Lihat Laporan","✓","✓","✓","✓"],["Approve Laporan","✓","—","✓","—"],["Kelola User","✓","—","—","—"],["Konfigurasi","✓","—","—","—"]].map(([a,...vals])=>(
                        <tr key={a} style={{borderBottom:`1px solid ${C.navy5}33`}}>
                          <td className="py-2 font-medium" style={{color:C.textDim}}>{a}</td>
                          {vals.map((v,i)=><td key={i} className="py-2 text-center font-bold" style={{color:v==="✓"?C.green:C.textFaint}}>{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {page==="donasi-online" && (
            <div className="space-y-4 fu">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-bold text-lg serif" style={{color:C.text}}>💝 Donasi Online dari Jamaah</div>
                  <div className="text-xs" style={{color:C.textMute}}>Donasi yang masuk melalui portal jamaah</div>
                </div>
                <div className="flex gap-2">
                  <NavyBtn sm icon={I.excel} onClick={()=>exportExcel({
                    title:"Donasi Online dari Jamaah",
                    subtitle:`${donasiPublik.length} donasi · ${fmtDateLong(today())}`,
                    rows:donasiPublik.map(d=>({Tanggal:fmtDate(d.tanggal),Donatur:d.jamaah_nama,Email:d.jamaah_email,Sumber:d.googleAuth?"Google":(d.jamaah_email&&d.jamaah_email!=="-"?"Heema":"Manual"),Program:d.program||"Umum",Jumlah:fmt(d.jumlah),Metode:d.metode,Status:d.status==="confirmed"?"Terkonfirmasi":"Pending",Pesan:d.pesan||"-"})),
                    summary:{"Total Donasi":fmt(donasiPublik.filter(d=>d.status==="confirmed").reduce((s,d)=>s+d.jumlah,0)),"Terkonfirmasi":donasiPublik.filter(d=>d.status==="confirmed").length,"Pending":donasiPublik.filter(d=>d.status==="pending").length},
                    filename:"donasi-online",
                    masjid:profile
                  })}>Excel</NavyBtn>
                  <NavyBtn sm icon={I.pdf} onClick={()=>exportPDF({
                    title:"Daftar Donasi Online",
                    subtitle:`Per ${fmtDateLong(today())}`,
                    rows:donasiPublik.map(d=>({Tanggal:fmtDate(d.tanggal),Donatur:d.jamaah_nama,Program:d.program||"Umum",Metode:d.metode,Jumlah:fmt(d.jumlah),Status:d.status==="confirmed"?"✓ Terkonfirmasi":"⏳ Pending"})),
                    summary:{"Total":fmt(donasiPublik.filter(d=>d.status==="confirmed").reduce((s,d)=>s+d.jumlah,0)),"Konfirmasi":donasiPublik.filter(d=>d.status==="confirmed").length,"Pending":donasiPublik.filter(d=>d.status==="pending").length},
                    filename:"donasi-online",
                    masjid:profile
                  })}>PDF</NavyBtn>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  ["Total Donasi",fmt(donasiPublik.filter(d=>d.status==="confirmed").reduce((s,d)=>s+d.jumlah,0)),C.gold,"💎"],
                  ["Donasi Hari Ini",donasiPublik.filter(d=>d.tanggal===today()).length,C.blue,"📅"],
                  ["Perlu Konfirmasi",donasiPublik.filter(d=>d.status==="pending").length,C.red,"⏳"],
                ].map(([l,v,c,i])=>(
                  <Card key={l} className="p-4 lift">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{color:C.textMute}}>{l}</div>
                      <div className="text-xl">{i}</div>
                    </div>
                    <div className="text-xl font-bold serif font-num" style={{color:c}}>{v}</div>
                  </Card>
                ))}
              </div>
              {donasiPublik.length===0 ? (
                <Card><EmptyState icon="💝" title="Belum ada donasi online" desc="Donasi dari jamaah melalui portal publik akan muncul di sini. Bagikan link masjid Anda agar jamaah bisa berdonasi langsung."/></Card>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr style={{background:C.navy2,borderBottom:`1px solid ${C.navy5}`}}>
                        {["Donatur","Program","Jumlah","Metode","Tanggal","Status","Aksi"].map(h=><th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap" style={{color:C.textMute}}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {donasiPublik.map(d=>(
                          <tr key={d.id} style={{borderBottom:`1px solid ${C.navy5}55`}} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="relative">
                                  <Avatar nama={d.jamaah_nama} size={32}/>
                                  {d.googleAuth && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{background:"#fff",border:`1px solid ${C.navy5}`}}><GoogleLogo size={9}/></div>}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold flex items-center gap-1.5" style={{color:C.text}}>
                                    {d.jamaah_nama}
                                    {d.googleAuth && <span className="text-[8px] font-bold px-1 py-px rounded" style={{background:C.gold+"22",color:C.gold,letterSpacing:"0.05em"}}>HEEMA</span>}
                                  </div>
                                  <div className="text-[10px] truncate" style={{color:C.textMute}}>{d.jamaah_email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs" style={{color:C.textDim}}>{d.program||<span style={{color:C.textFaint}}>Umum</span>}</td>
                            <td className="px-4 py-3 text-sm font-bold whitespace-nowrap font-num" style={{color:C.gold}}>{fmt(d.jumlah)}</td>
                            <td className="px-4 py-3 text-xs" style={{color:C.textDim}}>{d.metode}</td>
                            <td className="px-4 py-3 text-xs whitespace-nowrap font-num" style={{color:C.textMute}}>{fmtDate(d.tanggal)}</td>
                            <td className="px-4 py-3">{d.status==="confirmed" ? <Chip label="✓ Terkonfirmasi" color={C.green} size="sm"/> : <Chip label="⏳ Pending" color={C.gold} size="sm"/>}</td>
                            <td className="px-4 py-3">
                              {d.status==="pending" ? (
                                <button onClick={()=>{
                                  setDonasiPublik(ds=>ds.map(x=>x.id===d.id?{...x,status:"confirmed"}:x));
                                  // Auto-add to transactions
                                  setTrx(ts=>[...ts,{id:uid(),type:"pemasukan",kategori:"Donasi",jumlah:d.jumlah,tanggal:d.tanggal,catatan:`Donasi online dari ${d.jamaah_nama} via ${d.metode}`,program:d.program,donatur:d.jamaah_nama}]);
                                  // Auto-link or create donatur with heema_account flag
                                  setDonatur(dl=>{
                                    const existing = d.jamaah_email && d.jamaah_email!=="-" 
                                      ? dl.find(x=>x.email===d.jamaah_email)
                                      : dl.find(x=>x.nama.toLowerCase()===d.jamaah_nama.toLowerCase());
                                    if(existing) {
                                      return dl.map(x=>x.id===existing.id?{...x,total:x.total+d.jumlah,kali:x.kali+1,terakhir:d.tanggal,heema_account:true,googleAuth:d.googleAuth||x.googleAuth}:x);
                                    }
                                    return [...dl,{id:uid(),nama:d.jamaah_nama,telepon:d.jamaah_telepon||"-",email:d.jamaah_email,total:d.jumlah,kali:1,terakhir:d.tanggal,heema_account:true,googleAuth:d.googleAuth||false}];
                                  });
                                  toast(`Donasi ${fmt(d.jumlah)} dikonfirmasi & donatur otomatis tercatat`,"gold");
                                }} className="press px-3 py-1.5 rounded-md text-[10px] font-bold" style={{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}}>Konfirmasi</button>
                              ) : (
                                <button onClick={()=>{
                                  const dataForReceipt = {
                                    id:d.id,jumlah:d.jumlah,tanggal:d.tanggal,
                                    masjid_nama:profile.nama_masjid,program:d.program,
                                    metode:d.metode,pesan:d.pesan,
                                    ref:"HRA-"+String(d.id).slice(-8).padStart(8,"0")
                                  };
                                  printDonationReceipt(dataForReceipt,{nama:d.jamaah_nama,email:d.jamaah_email});
                                }} className="press px-3 py-1.5 rounded-md text-[10px] font-bold" style={{background:`${C.blue}22`,color:C.blue}}>Cetak Bukti</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔗</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold serif" style={{color:C.gold}}>Link Donasi Publik</div>
                    <div className="text-xs mt-0.5 mb-2" style={{color:C.textMute}}>Bagikan link ini agar jamaah bisa berdonasi langsung ke masjid Anda</div>
                    <div className="flex gap-2 items-center">
                      <code className="flex-1 px-3 py-2 rounded-lg text-xs font-mono truncate" style={{background:C.navy2,color:C.gold,border:`1px solid ${C.navy5}`}}>
                        heema.id/masjid/al-ikhlas-jakarta
                      </code>
                      <button onClick={()=>{navigator.clipboard?.writeText("heema.id/masjid/al-ikhlas-jakarta");toast("Link disalin","success");}} className="press px-3 py-2 rounded-lg text-xs font-bold" style={{background:`${C.gold}22`,color:C.gold,border:`1px solid ${C.gold}44`}}>Salin</button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {page==="settings" && (
            <div className="space-y-4 fu max-w-2xl">
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Profil Masjid</div></div>
                <div className="space-y-3">
                  <Input label="Nama Masjid" value={profileForm.nama_masjid} onChange={v=>setProfileForm(f=>({...f,nama_masjid:v}))} icon="🕌"/>
                  <Input label="Nama Admin" value={profileForm.nama_admin} onChange={v=>setProfileForm(f=>({...f,nama_admin:v}))} icon="👤"/>
                  <Input label="Alamat" value={profileForm.alamat} onChange={v=>setProfileForm(f=>({...f,alamat:v}))} icon="📍"/>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Kota" value={profileForm.kota} onChange={v=>setProfileForm(f=>({...f,kota:v}))} icon="🏙"/>
                    <Input label="Telepon" value={profileForm.telepon} onChange={v=>setProfileForm(f=>({...f,telepon:v}))} icon="📞"/>
                  </div>
                  <Input label="Email Resmi" value={profileForm.email} onChange={v=>setProfileForm(f=>({...f,email:v}))} type="email" icon="✉"/>
                  <Input label="Website" value={profileForm.website} onChange={v=>setProfileForm(f=>({...f,website:v}))} placeholder="https://..." icon="🌐"/>
                  <div className="flex gap-2 pt-2">
                    <NavyBtn sm onClick={()=>setProfileForm(profile)}>Reset</NavyBtn>
                    <GoldBtn sm onClick={saveProfile} disabled={JSON.stringify(profileForm)===JSON.stringify(profile)}>Simpan Perubahan</GoldBtn>
                  </div>
                </div>
              </Card>

              {/* FOTO MASJID */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Foto Masjid</div></div>
                  <GoldBadge sm>WAJIB</GoldBadge>
                </div>
                <div className="text-xs mb-3" style={{color:C.textMute}}>Foto utama yang tampil di portal jamaah & maps</div>
                {profile.foto ? (
                  <div className="relative rounded-xl overflow-hidden" style={{aspectRatio:"16/9",maxHeight:240,border:`1px solid ${C.gold}55`}}>
                    <img src={profile.foto} alt="Foto masjid" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 flex items-end p-3" style={{background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent 50%)"}}>
                      <div className="w-full flex items-center justify-between">
                        <div className="px-2 py-1 rounded text-[10px] font-bold" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)"}}>✓ Foto aktif</div>
                        <label className="press px-3 py-1.5 rounded text-[10px] font-bold cursor-pointer" style={{background:`${C.gold}22`,color:C.gold,backdropFilter:"blur(8px)",border:`1px solid ${C.gold}44`}}>
                          <input type="file" accept="image/*" className="hidden" onChange={async(e)=>{
                            const file = e.target.files?.[0];
                            if(!file) return;
                            if(file.size > 8*1024*1024) { toast("Ukuran maksimal 8MB","error"); return; }
                            const base64 = await fileToBase64(file);
                            const compressed = await compressImage(base64, 1200, 900);
                            setProfile(p=>({...p, foto:compressed}));
                            toast("Foto masjid diperbarui","gold");
                          }}/>
                          {I.upload} Ganti Foto
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className="press rounded-xl flex flex-col items-center justify-center cursor-pointer" style={{aspectRatio:"16/9",background:C.navy2,border:`2px dashed ${C.gold}55`}}>
                    <input type="file" accept="image/*" className="hidden" onChange={async(e)=>{
                      const file = e.target.files?.[0];
                      if(!file) return;
                      const base64 = await fileToBase64(file);
                      const compressed = await compressImage(base64, 1200, 900);
                      setProfile(p=>({...p, foto:compressed}));
                      toast("Foto masjid diunggah","gold");
                    }}/>
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-sm font-bold" style={{color:C.gold}}>Upload Foto Masjid</div>
                    <div className="text-[10px] mt-1" style={{color:C.textMute}}>Klik untuk pilih foto</div>
                  </label>
                )}
              </Card>

              {/* LOKASI MASJID */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Lokasi & Koordinat</div></div>
                  <GoldBadge sm>WAJIB</GoldBadge>
                </div>
                <div className="text-xs mb-3" style={{color:C.textMute}}>Titik koordinat masjid untuk tampil di peta jamaah</div>
                {profile.lat && profile.lng && (
                  <div className="rounded-xl overflow-hidden mb-3" style={{border:`1px solid ${C.green}55`}}>
                    <div className="px-3 py-2 flex items-center justify-between" style={{background:C.greenBg}}>
                      <div className="flex items-center gap-1.5 text-xs font-bold" style={{color:C.green}}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{background:C.green,boxShadow:`0 0 4px ${C.green}`}}/>
                        Koordinat tersimpan
                      </div>
                      <a href={`https://www.google.com/maps?q=${profile.lat},${profile.lng}`} target="_blank" rel="noopener noreferrer" className="press text-[10px] font-bold" style={{color:C.blue}}>Buka Maps →</a>
                    </div>
                    <GoogleMap 
                      center={{lat:profile.lat, lng:profile.lng}} 
                      zoom={16} 
                      markers={[{id:"self",lat:profile.lat,lng:profile.lng,nama:profile.nama_masjid,kota:profile.kota}]}
                      interactive={false}
                      style={{height:180}}
                    />
                    <div className="px-3 py-2 flex items-center justify-between text-[11px] font-num" style={{background:C.navy2}}>
                      <span style={{color:C.textMute}}>Lat, Lng</span>
                      <span className="font-mono font-bold" style={{color:C.gold}}>{profile.lat.toFixed(6)}, {profile.lng.toFixed(6)}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <GoldBtn full icon={I.pin} onClick={async()=>{
                    const loc = await getGeoLocation();
                    if(!loc) { toast("Tidak bisa mendeteksi lokasi","error"); return; }
                    setProfile(p=>({...p, lat:loc.lat, lng:loc.lng}));
                    toast(`Koordinat diperbarui: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`,"gold");
                  }}>Deteksi Otomatis (GPS)</GoldBtn>
                  <div className="grid grid-cols-2 gap-2">
                    <Input label="Latitude" value={profileForm.lat||""} onChange={v=>setProfileForm(f=>({...f,lat:parseFloat(v)||null}))} placeholder="-6.244"/>
                    <Input label="Longitude" value={profileForm.lng||""} onChange={v=>setProfileForm(f=>({...f,lng:parseFloat(v)||null}))} placeholder="106.798"/>
                  </div>
                  <div className="text-[10px]" style={{color:C.textMute}}>💡 Klik kanan lokasi di Google Maps → koordinat akan muncul di pop-up</div>
                </div>
              </Card>

              <Card className="p-5" gold>
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Paket Berlangganan</div></div>
                <div className="rounded-xl p-4 flex items-center gap-3 bg-pattern-fine relative overflow-hidden" style={{background:C.navy2,border:`1px solid ${C.gold}55`}}>
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full" style={{background:C.goldGlow,filter:"blur(20px)"}}/>
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold serif" style={{background:`linear-gradient(135deg,${C.goldDk},${C.gold},${C.goldLt})`,color:C.navy}}>P</div>
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-2"><div className="font-bold serif" style={{color:C.gold,fontSize:18}}>Paket Pro</div><GoldBadge sm>AKTIF</GoldBadge></div>
                    <div className="text-xs mt-0.5" style={{color:C.textMute}}>User unlimited · Transaksi unlimited · WhatsApp</div>
                    <div className="text-xs mt-0.5 font-num" style={{color:C.textDim}}>Berlaku hingga: 31 Desember 2025</div>
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Preferensi</div></div>
                <div className="space-y-3">
                  {[["wa","Notifikasi WhatsApp","Kirim laporan bulanan otomatis"],["publik","Laporan Publik","Izinkan jamaah melihat laporan"],["reminder","Reminder Sholat Jumat","Pengingat catat infaq Jumat"]].map(([k,t,s])=>(
                    <div key={k} className="flex items-center justify-between p-3 rounded-lg" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                      <div className="flex-1 mr-3"><div className="text-sm font-semibold" style={{color:C.text}}>{t}</div><div className="text-xs mt-0.5" style={{color:C.textMute}}>{s}</div></div>
                      <Toggle value={prefs[k]} onChange={()=>togglePref(k,t)}/>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.red}}/><div className="font-bold serif" style={{color:C.red}}>Zona Berbahaya</div></div>
                <div className="flex items-center justify-between p-3 rounded-lg" style={{background:C.navy2,border:`1px solid ${C.red}33`}}>
                  <div className="flex-1 mr-3"><div className="text-sm font-semibold" style={{color:C.text}}>Reset Data Demo</div><div className="text-xs mt-0.5" style={{color:C.textMute}}>Kembalikan semua data ke awal</div></div>
                  <NavyBtn sm danger onClick={async()=>{
                    const ok = await confirmDialog({title:"Reset Semua Data?",message:"Semua transaksi, program, donatur, dan pengaturan akan dikembalikan ke awal.",danger:true,okText:"Reset"});
                    if(ok){ setTrx(SEED_TRX);setProgs(SEED_PROG);setDonatur(SEED_DONATUR);setUsers(SEED_USERS);setProfile(SEED_PROFILE);setPrefs(SEED_PREFS);setNotifs(SEED_NOTIFS); toast("Data direset","info"); }
                  }}>Reset</NavyBtn>
                </div>
              </Card>
            </div>
          )}
        </main>

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-20" style={{background:`${C.navy2}f5`,borderTop:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
          <div className="flex">
            {NAV.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} className="flex-1 flex flex-col items-center py-2.5 gap-1 press relative">
              {page===n.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b" style={{background:C.gold,boxShadow:`0 0 8px ${C.gold}`}}/>}
              <span style={{color:page===n.id?C.gold:C.textMute,transform:page===n.id?"scale(1.05)":"none",transition:"all .2s"}}>{n.icon}</span>
              <span className="text-[9px] font-bold leading-none" style={{color:page===n.id?C.gold:C.textMute}}>{n.label}</span>
            </button>))}
          </div>
        </nav>
      </div>

      <Modal open={!!trxModal} onClose={()=>setTrxModal(null)} title={trxModal?.id?"Edit Transaksi":"Catat Transaksi Baru"} subtitle="Heema Finance" accent={trxModal?.type==="pengeluaran"||trxModal?.defaultType==="pengeluaran"?C.red:C.gold}>
        {trxModal && <TrxForm onSave={saveTrx} onClose={()=>setTrxModal(null)} programs={programs} editData={trxModal.id?trxModal:null} defaultType={trxModal.defaultType||trxModal.type}/>}
      </Modal>
      <Modal open={!!progModal} onClose={()=>setProgModal(null)} title={progModal?.id?"Edit Program":"Buat Program Baru"} subtitle="Program & Kegiatan">
        {progModal && <ProgramForm onSave={saveProg} onClose={()=>setProgModal(null)} editData={progModal.id?progModal:null}/>}
      </Modal>
      <Modal open={!!donaturModal} onClose={()=>setDonaturModal(null)} title={donaturModal?.id?"Edit Donatur":"Tambah Donatur"} subtitle="Database Donatur">
        {donaturModal && <DonaturForm onSave={saveDonatur} onClose={()=>setDonaturModal(null)} editData={donaturModal.id?donaturModal:null}/>}
      </Modal>
      <Modal open={!!userModal} onClose={()=>setUserModal(null)} title={userModal?.id?"Edit Anggota":"Undang Anggota Tim"} subtitle="Tim Pengurus" accent={C.purple}>
        {userModal && <UserForm onSave={saveUser} onClose={()=>setUserModal(null)} editData={userModal.id?userModal:null}/>}
      </Modal>
      <NotifPanel open={showNotif} onClose={()=>setShowNotif(false)} notifs={notifs} setNotifs={setNotifs}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   JAMAAH APP — Public donation interface
════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════
   GOOGLE MAP COMPONENT — reusable wrapper for Google Maps JS API
════════════════════════════════════════════════════════════ */
function GoogleMap({center, zoom=13, markers=[], userLoc, onMarkerClick, style={}, interactive=true, drawLines=false}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const linesRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dark mode style for Google Maps (matches Heema theme)
  const heemaMapStyle = [
    {elementType:"geometry",stylers:[{color:"#0d1b30"}]},
    {elementType:"labels.text.fill",stylers:[{color:"#a8bdd8"}]},
    {elementType:"labels.text.stroke",stylers:[{color:"#08111f"}]},
    {featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d4af37"}]},
    {featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#6e85a8"}]},
    {featureType:"poi.park",elementType:"geometry",stylers:[{color:"#142545"}]},
    {featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#3dd68c"}]},
    {featureType:"road",elementType:"geometry",stylers:[{color:"#1c3358"}]},
    {featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#264470"}]},
    {featureType:"road.highway",elementType:"geometry",stylers:[{color:"#9c7a26"}]},
    {featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#d4af37"}]},
    {featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#a8bdd8"}]},
    {featureType:"transit",elementType:"geometry",stylers:[{color:"#142545"}]},
    {featureType:"water",elementType:"geometry",stylers:[{color:"#08111f"}]},
    {featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#5fa8e8"}]},
  ];

  // Init map
  useEffect(()=>{
    let cancelled = false;
    loadGoogleMaps().then(maps=>{
      if(cancelled || !containerRef.current) return;
      const map = new maps.Map(containerRef.current, {
        center: center || {lat:-2.5489, lng:118.0149}, // Indonesia center
        zoom,
        disableDefaultUI: !interactive,
        zoomControl: interactive,
        styles: heemaMapStyle,
        backgroundColor: "#08111f",
        gestureHandling: interactive ? "auto" : "none",
      });
      mapRef.current = map;
      setLoading(false);
    }).catch(err=>{
      setError(err.message);
      setLoading(false);
    });
    return ()=>{ cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Update center/zoom when changed
  useEffect(()=>{
    if(!mapRef.current || !center) return;
    mapRef.current.setCenter(center);
    if(zoom) mapRef.current.setZoom(zoom);
  },[center, zoom]);

  // Update markers
  useEffect(()=>{
    if(!mapRef.current || !window.google?.maps) return;
    const maps = window.google.maps;
    // Clear old markers
    markersRef.current.forEach(m=>m.setMap(null));
    markersRef.current = [];
    linesRef.current.forEach(l=>l.setMap(null));
    linesRef.current = [];

    // Add masjid markers
    markers.forEach((m,idx)=>{
      if(!m.lat || !m.lng) return;
      const isPro = m.plan === "pro";
      
      // Custom SVG marker for masjid
      const svgMarker = {
        path: "M0,-24 C-10,-24 -16,-16 -16,-8 C-16,4 0,16 0,16 C0,16 16,4 16,-8 C16,-16 10,-24 0,-24 Z",
        fillColor: isPro ? "#d4af37" : "#9c7a26",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 1.2,
        anchor: new maps.Point(0, 16),
        labelOrigin: new maps.Point(0, -10),
      };

      const marker = new maps.Marker({
        position: {lat:m.lat, lng:m.lng},
        map: mapRef.current,
        title: m.nama,
        icon: svgMarker,
        label: {
          text: "🕌",
          fontSize: "12px",
        },
        animation: maps.Animation.DROP,
      });

      // Info window
      const info = new maps.InfoWindow({
        content: `<div style="color:#1a1a1a;font-family:Inter,sans-serif;padding:4px;max-width:240px;">
          <div style="font-weight:bold;font-size:14px;font-family:Georgia,serif;color:#9c7a26;margin-bottom:4px;">🕌 ${m.nama}</div>
          <div style="font-size:11px;color:#666;margin-bottom:6px;">📍 ${m.kota||""}</div>
          ${m.alamat?`<div style="font-size:11px;color:#444;margin-bottom:6px;">${m.alamat}</div>`:""}
          <div style="display:flex;gap:8px;font-size:10px;">
            ${isPro?'<span style="background:#fef3c7;color:#9c7a26;padding:2px 6px;border-radius:4px;font-weight:bold;">✓ PRO</span>':""}
            <span style="background:#dcfce7;color:#16a34a;padding:2px 6px;border-radius:4px;font-weight:bold;">${m.users*23}+ Donatur</span>
          </div>
          <div style="margin-top:8px;text-align:center;">
            <button onclick="window.__heemaSelectMasjid && window.__heemaSelectMasjid('${m.id}')" style="background:linear-gradient(135deg,#9c7a26,#d4af37);color:#1a1208;border:none;padding:6px 12px;border-radius:6px;font-weight:bold;font-size:11px;cursor:pointer;">Lihat Detail →</button>
          </div>
        </div>`,
      });

      marker.addListener("click", ()=>{
        // Close other info windows
        markersRef.current.forEach(ref=>{ if(ref._info && ref._info !== info) ref._info.close(); });
        info.open(mapRef.current, marker);
        if(onMarkerClick) onMarkerClick(m);
      });
      marker._info = info;
      markersRef.current.push(marker);

      // Draw dotted line from user to nearest 3 masjids
      if(drawLines && userLoc && idx < 3) {
        const line = new maps.Polyline({
          path: [{lat:userLoc.lat, lng:userLoc.lng},{lat:m.lat, lng:m.lng}],
          geodesic: true,
          strokeColor: "#d4af37",
          strokeOpacity: 0,
          strokeWeight: 2,
          icons: [{
            icon: {path:"M 0,-1 0,1", strokeOpacity:0.6, scale:3},
            offset: "0",
            repeat: "12px",
          }],
          map: mapRef.current,
        });
        linesRef.current.push(line);
      }
    });

    // User location marker
    if(userMarkerRef.current) { userMarkerRef.current.setMap(null); userMarkerRef.current = null; }
    if(userLoc) {
      const userMarker = new maps.Marker({
        position: {lat:userLoc.lat, lng:userLoc.lng},
        map: mapRef.current,
        title: "Lokasi Anda",
        icon: {
          path: maps.SymbolPath.CIRCLE,
          fillColor: "#5fa8e8",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
          scale: 8,
        },
        zIndex: 999,
      });
      // Pulse ring effect with circle
      new maps.Circle({
        strokeColor: "#5fa8e8",
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: "#5fa8e8",
        fillOpacity: 0.1,
        map: mapRef.current,
        center: {lat:userLoc.lat, lng:userLoc.lng},
        radius: 200, // 200m radius
      });
      userMarkerRef.current = userMarker;
    }

    // Auto-fit bounds if multiple markers
    if(markers.length > 1 || (markers.length >= 1 && userLoc)) {
      const bounds = new maps.LatLngBounds();
      markers.forEach(m=>{ if(m.lat && m.lng) bounds.extend({lat:m.lat, lng:m.lng}); });
      if(userLoc) bounds.extend({lat:userLoc.lat, lng:userLoc.lng});
      mapRef.current.fitBounds(bounds, {top:50, right:30, bottom:30, left:30});
    }
  },[markers, userLoc, drawLines, onMarkerClick]);

  // Expose select handler globally for InfoWindow buttons
  useEffect(()=>{
    window.__heemaSelectMasjid = (id) => {
      const m = markers.find(x=>x.id===id);
      if(m && onMarkerClick) onMarkerClick(m);
    };
    return ()=>{ delete window.__heemaSelectMasjid; };
  },[markers, onMarkerClick]);

  return (
    <div style={{position:"relative",...style}}>
      <div ref={containerRef} style={{width:"100%",height:"100%",borderRadius:"inherit"}}/>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{background:C.navy2}}>
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-yellow-700 border-t-yellow-400 rounded-full spin mx-auto"/>
            <div className="text-xs mt-3 font-semibold" style={{color:C.gold}}>Memuat peta Google Maps...</div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-4" style={{background:C.navy2}}>
          <div className="text-center max-w-xs">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="text-sm font-bold" style={{color:C.red}}>Gagal memuat peta</div>
            <div className="text-xs mt-1" style={{color:C.textMute}}>{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAP VIEW — Interactive masjid map using Google Maps
════════════════════════════════════════════════════════════ */
function MapView({masjidList, userLoc, onSelectMasjid}) {
  if(masjidList.length === 0) {
    return <Card><EmptyState icon="🗺️" title="Tidak ada masjid di peta" desc="Belum ada masjid dengan koordinat di area pencarian Anda."/></Card>;
  }

  // Default center: user location or first masjid
  const center = userLoc ? {lat:userLoc.lat, lng:userLoc.lng} : {lat:masjidList[0].lat, lng:masjidList[0].lng};

  return (
    <div className="space-y-3">
      <Card className="overflow-hidden relative">
        <GoogleMap 
          center={center} 
          zoom={userLoc?13:6} 
          markers={masjidList} 
          userLoc={userLoc} 
          onMarkerClick={onSelectMasjid}
          drawLines={true}
          style={{aspectRatio:"4/3",maxHeight:480}}
        />
        {/* Floating info card */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none z-10">
          <div className="rounded-lg px-3 py-2 pointer-events-auto" style={{background:"rgba(8,17,31,0.9)",backdropFilter:"blur(8px)",border:`1px solid ${C.gold}44`}}>
            <div className="text-[9px] uppercase tracking-wider font-bold flex items-center gap-1" style={{color:C.gold}}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:C.gold,boxShadow:`0 0 4px ${C.gold}`}}/>
              {masjidList.length} Masjid
            </div>
            {userLoc && <div className="text-[10px] mt-0.5" style={{color:C.textDim}}>📍 {userLoc.city||"Lokasi Anda"}</div>}
          </div>
          <div className="rounded-lg px-3 py-2 pointer-events-auto" style={{background:"rgba(8,17,31,0.9)",backdropFilter:"blur(8px)",border:`1px solid ${C.navy5}`}}>
            <div className="text-[9px] font-bold flex items-center gap-1.5" style={{color:C.textDim}}>
              <div className="w-2 h-2 rounded-full" style={{background:C.blue}}/>Anda
              <div className="w-2 h-2 rounded-full ml-2" style={{background:C.gold}}/>Masjid
            </div>
          </div>
        </div>
        {/* Bottom hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 z-10" 
          style={{background:"rgba(8,17,31,0.9)",backdropFilter:"blur(8px)",border:`1px solid ${C.gold}44`,color:C.textMute}}>
          <span>💡</span>
          <span>Klik pin untuk lihat detail · Geser & zoom untuk eksplor</span>
        </div>
      </Card>

      {/* Quick action - open in Google Maps */}
      {userLoc && (
        <a href={`https://www.google.com/maps/search/masjid/@${userLoc.lat},${userLoc.lng},14z`} 
          target="_blank" rel="noopener noreferrer"
          className="press w-full rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all"
          style={{background:C.navy3,border:`1px solid ${C.blue}44`}}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{background:C.blueBg,border:`1px solid ${C.blue}44`}}>🌐</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold" style={{color:C.text}}>Buka di Google Maps</div>
            <div className="text-[10px]" style={{color:C.textMute}}>Lihat masjid di sekitar Anda dengan Maps lengkap</div>
          </div>
          <div style={{color:C.blue}}>{I.chev}</div>
        </a>
      )}

      {/* List of masjid sorted by distance */}
      <div className="space-y-2">
        <div className="font-bold serif text-sm" style={{color:C.text}}>Masjid Terdekat dari Anda</div>
        {masjidList.slice(0,5).map((m,i)=>(
          <Card key={m.id} className="p-3 cursor-pointer lift" onClick={()=>onSelectMasjid(m)}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                {m.foto ? <img src={m.foto} alt={m.nama} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-xl">🕌</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold truncate" style={{color:C.text}}>{m.nama}</span>
                  {m.plan==="pro" && <GoldBadge sm>PRO</GoldBadge>}
                </div>
                <div className="text-[10px] mt-0.5 flex items-center gap-2" style={{color:C.textMute}}>
                  <span>📍 {m.kota}</span>
                  {userLoc && m.distance < Infinity && <><span>·</span><span className="font-bold" style={{color:C.gold}}>{fmtDistance(m.distance)}</span></>}
                </div>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`} target="_blank" rel="noopener noreferrer" 
                onClick={e=>e.stopPropagation()} className="press text-[10px] font-bold px-2 py-1 rounded" style={{background:C.blueBg,color:C.blue,border:`1px solid ${C.blue}33`}}>
                🧭 Rute
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function JamaahApp({onLogout,jamaah}) {
  const [page,setPage]=useState("explore");
  const [exploreMode,setExploreMode]=useState("list"); // "list" or "map"
  const [masjidList]=usePersist("heema_masjids",SEED_MASJID);
  const [allDonasi,setAllDonasi]=usePersist("heema_donasi_publik",SEED_DONASI_PUBLIK);
  const [myDonasi,setMyDonasi]=usePersist(`heema_jamaah_donasi_${jamaah.email}`,jamaah.email==="hasan@email.com"?SEED_JAMAAH_DONASI:[]);
  const [myNotifs,setMyNotifs]=usePersist(`heema_jamaah_notifs_${jamaah.email}`,[]);
  const [userLoc,setUserLoc]=usePersist(`heema_jamaah_loc_${jamaah.email}`,null);
  const [prayerNotifs,setPrayerNotifs]=usePersist(`heema_jamaah_prayer_notif_${jamaah.email}`,true);
  const [selMasjid,setSelMasjid]=useState(null);
  const [search,setSearch]=useState("");
  const [donasiModal,setDonasiModal]=useState(null);
  const [profilModal,setProfilModal]=useState(false);
  const [thanksModal,setThanksModal]=useState(null);
  const [showJamaahNotif,setShowJamaahNotif]=useState(false);
  const [locLoading,setLocLoading]=useState(false);

  // Get programs per masjid
  const [allPrograms]=usePersist("heema_progs",SEED_PROG);

  // Auto-detect location on first load
  useEffect(()=>{
    if(!userLoc) {
      getGeoLocation().then(loc=>{
        if(loc) {
          const city = nearestCity(loc.lat, loc.lng);
          setUserLoc({...loc, city:city?.city||"Unknown"});
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Prayer times based on user location
  const prayerTimes = userLoc ? calcPrayerTimes(userLoc.lat, userLoc.lng) : null;
  const upcoming = prayerTimes ? nextPrayer(prayerTimes) : null;

  // Detect prayer reminders (check every minute)
  useEffect(()=>{
    if(!prayerNotifs || !prayerTimes) return;
    const checkPrayer = () => {
      const now = new Date();
      const curMin = now.getHours()*60 + now.getMinutes();
      const order = [["subuh","Subuh"],["dzuhur","Dzuhur"],["ashar","Ashar"],["maghrib","Maghrib"],["isya","Isya"]];
      for(const [key,label] of order) {
        const [h,m] = prayerTimes[key].split(":").map(Number);
        const t = h*60+m;
        // Notify at exact prayer time (within 1 minute window) and 10 minutes before
        if(t === curMin || t === curMin+10) {
          // Check if already notified today
          const todayKey = `${today()}-${key}-${t===curMin+10?"reminder":"adzan"}`;
          const existed = myNotifs.find(n=>n.prayerKey===todayKey);
          if(!existed) {
            const isReminder = t === curMin+10;
            setMyNotifs(ns=>[{
              id:uid(),
              judul: isReminder?`🕌 10 menit lagi waktu ${label}`:`🕌 Waktu ${label} telah tiba`,
              pesan: isReminder?`Adzan ${label} akan berkumandang pukul ${prayerTimes[key]}. Bersiap untuk berwudhu.`:`Sudah masuk waktu sholat ${label}. Mari tunaikan kewajiban kita.`,
              waktu:"Baru saja",
              read:false,
              icon:isReminder?"⏰":"🕌",
              warna:isReminder?C.blue:C.gold,
              type:"prayer",
              prayerKey:todayKey,
            },...ns]);
          }
        }
      }
    };
    checkPrayer();
    const interval = setInterval(checkPrayer, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[prayerTimes, prayerNotifs]);

  const refreshLocation = async () => {
    setLocLoading(true);
    const loc = await getGeoLocation();
    setLocLoading(false);
    if(loc) {
      const city = nearestCity(loc.lat, loc.lng);
      setUserLoc({...loc, city:city?.city||"Unknown"});
      toast(`Lokasi diperbarui: ${city?.city||"Unknown"}`,"success");
    } else {
      toast("Tidak bisa mendeteksi lokasi. Periksa izin GPS","error");
    }
  };

  // Active masjids that accept donations (with location)
  const publicMasjids = masjidList.filter(m=>(m.status==="aktif"||m.status==="trial") && m.lat && m.lng);
  
  // Add distance from user
  const masjidWithDist = publicMasjids.map(m=>({
    ...m,
    distance: userLoc ? calcDistance(userLoc.lat, userLoc.lng, m.lat, m.lng) : Infinity
  })).sort((a,b)=>a.distance - b.distance);
  
  const filteredMasjids = masjidWithDist.filter(m=>[m.nama,m.kota].join(" ").toLowerCase().includes(search.toLowerCase()));

  const totalDonasi = myDonasi.reduce((s,d)=>s+d.jumlah,0);
  const totalMasjidDibantu = new Set(myDonasi.map(d=>d.masjid_id)).size;
  const unreadJamaahNotif = myNotifs.filter(n=>!n.read).length;

  // Submit donation - auto-link to masjid's donatur database
  const submitDonasi = (data) => {
    const ref = "HRA-" + Math.random().toString(36).substring(2,10).toUpperCase();
    const newDon = {
      id:uid(), masjid_id:data.masjid.id, masjid_nama:data.masjid.nama,
      program:data.program||null, jumlah:data.jumlah, metode:data.metode,
      pesan:data.pesan||"", status:"confirmed", tanggal:today(), ref
    };
    setMyDonasi(ds=>[newDon,...ds]);
    
    // Save to public donasi for admin to see + verify
    setAllDonasi(ds=>[{
      id:uid(), masjid_id:data.masjid.id, program:data.program||null,
      jamaah_nama:jamaah.nama, jamaah_email:jamaah.email, jamaah_telepon:jamaah.telepon||"",
      jamaah_id:jamaah.email,
      googleAuth:jamaah.googleAuth||false,
      jumlah:data.jumlah, metode:data.metode, pesan:data.pesan||"",
      status:"confirmed", tanggal:today(), ref
    },...ds]);
    
    // 💌 SEND THANK-YOU NOTIFICATION
    const thankNotif = {
      id:uid(),
      judul:`Terima kasih, ${jamaah.nama.split(" ")[0]}! 💎`,
      pesan:`Donasi ${fmt(data.jumlah)} ke ${data.masjid.nama} telah kami terima. Semoga Allah membalas kebaikan Anda dengan yang lebih baik. Jazaakumullaahu khairan.`,
      detail:newDon,
      waktu:"Baru saja",
      read:false,
      icon:"💎",
      warna:C.gold,
      type:"thanks"
    };
    setMyNotifs(ns=>[thankNotif,...ns]);
    
    setDonasiModal(null);
    setSelMasjid(null);
    // Show thank-you modal instead of plain toast
    setThanksModal({donation:newDon,notif:thankNotif});
  };

  const markNotifRead = (id) => setMyNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const markAllNotifRead = () => { setMyNotifs(ns=>ns.map(n=>({...n,read:true}))); toast("Semua notifikasi dibaca"); };

  const NAV = [
    {id:"explore",icon:"🕌",label:"Jelajahi"},
    {id:"riwayat",icon:"📜",label:"Riwayat"},
    {id:"profil",icon:"👤",label:"Profil"},
  ];

  return (
    <div className="min-h-screen flex flex-col bg-pattern" style={{background:C.navy}}>
      {/* Header */}
      <header className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3 lg:px-8 lg:py-4" style={{background:`${C.navy2}f5`,borderBottom:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
        <HeemaLogo size={32}/>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-bold gold-shimmer serif tracking-tight leading-none">HEEMA</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1 h-1 rounded-full" style={{background:C.gold}}/>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{color:C.textMute}}>Portal Jamaah</div>
          </div>
        </div>
        <button onClick={()=>setShowJamaahNotif(true)} className="press p-2 rounded-lg relative" style={{color:C.textMute,background:C.navy3,border:`1px solid ${C.navy5}`}}>
          {I.bell}
          {unreadJamaahNotif>0 && <div className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full px-1 flex items-center justify-center text-[9px] font-bold pulse-gold" style={{background:C.gold,color:C.navy}}>{unreadJamaahNotif}</div>}
        </button>
        <button onClick={()=>setProfilModal(true)} className="press flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{background:C.navy3,border:`1px solid ${C.navy5}`}}>
          <div className="relative">
            <Avatar nama={jamaah.nama} size={26} gold/>
            {jamaah.googleAuth && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center" style={{background:"#fff"}}><GoogleLogo size={8}/></div>}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold leading-none" style={{color:C.text}}>{jamaah.nama.split(" ")[0]}</div>
            <div className="text-[9px] mt-0.5" style={{color:C.textMute}}>{jamaah.googleAuth?"via Google":"Jamaah"}</div>
          </div>
        </button>
      </header>

      <main className="flex-1 px-4 lg:px-8 py-4 lg:py-6 pb-24 lg:pb-8 max-w-5xl w-full mx-auto">
        {/* EXPLORE */}
        {page==="explore" && (
          <div className="space-y-4 fu">
            {/* Hero with prayer times */}
            <div className="relative rounded-2xl overflow-hidden bg-pattern-fine p-5" style={{background:`linear-gradient(135deg,${C.navy3} 0%,${C.navy2} 100%)`,border:`1px solid ${C.gold}55`,boxShadow:`0 0 32px ${C.goldGlow}`}}>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{background:C.goldGlow,filter:"blur(40px)"}}/>
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1 h-3.5 rounded-full" style={{background:C.gold}}/>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{color:C.gold}}>Assalamu'alaikum</span>
                    </div>
                    <div className="font-bold text-xl lg:text-2xl serif" style={{color:C.text}}>{jamaah.nama}</div>
                    {userLoc && (
                      <button onClick={refreshLocation} className="press text-xs mt-1 inline-flex items-center gap-1" style={{color:C.gold}}>
                        📍 {userLoc.city||"Indonesia"} · <span className="underline">Update lokasi</span>
                      </button>
                    )}
                    {!userLoc && !locLoading && (
                      <button onClick={refreshLocation} className="press text-xs mt-1 inline-flex items-center gap-1.5 px-2 py-1 rounded font-bold" style={{background:C.gold+"22",color:C.gold,border:`1px solid ${C.gold}44`}}>
                        📍 Izinkan lokasi untuk fitur penuh
                      </button>
                    )}
                  </div>
                  <div className="text-4xl float">💎</div>
                </div>

                {/* Prayer times widget */}
                {prayerTimes && upcoming && (
                  <div className="mt-4 rounded-xl p-3 bg-pattern-fine" style={{background:"rgba(8,17,31,.7)",backdropFilter:"blur(12px)",border:`1px solid ${C.gold}44`}}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{color:C.goldDk}}>Sholat Berikutnya</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <div className="font-bold serif gold-shimmer" style={{fontSize:24}}>{upcoming.label}</div>
                          <div className="text-sm font-num font-bold" style={{color:C.text}}>{upcoming.time}</div>
                        </div>
                        <div className="text-[10px] mt-0.5" style={{color:C.textMute}}>
                          {upcoming.isTomorrow?"Besok ":""}{upcoming.minutesLeft>=60 ? `${Math.floor(upcoming.minutesLeft/60)} jam ${upcoming.minutesLeft%60} menit lagi` : `${upcoming.minutesLeft} menit lagi`}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold" style={{color:prayerNotifs?C.green:C.textMute}}>
                        <Toggle value={prayerNotifs} onChange={v=>{setPrayerNotifs(v);toast(v?"Pengingat adzan aktif":"Pengingat adzan nonaktif");}}/>
                        <span>Adzan</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[
                        {k:"subuh",l:"Subuh"},
                        {k:"dzuhur",l:"Dzuhur"},
                        {k:"ashar",l:"Ashar"},
                        {k:"maghrib",l:"Maghrib"},
                        {k:"isya",l:"Isya"},
                      ].map(p=>(
                        <div key={p.k} className="rounded-lg py-1.5 text-center" style={{background:upcoming.key===p.k?C.goldGlow:C.navy2,border:`1px solid ${upcoming.key===p.k?C.gold:C.navy5}`}}>
                          <div className="text-[8px] uppercase tracking-wider font-bold" style={{color:upcoming.key===p.k?C.gold:C.textMute}}>{p.l}</div>
                          <div className="text-[11px] font-bold font-num" style={{color:upcoming.key===p.k?C.gold:C.textDim}}>{prayerTimes[p.k]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {myDonasi.length>0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="rounded-xl p-2.5" style={{background:"rgba(8,17,31,.6)",backdropFilter:"blur(12px)",border:`1px solid ${C.gold}33`}}>
                      <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Total Donasi</div>
                      <div className="font-bold text-sm font-num gold-shimmer serif"><AnimatedNum value={totalDonasi}/></div>
                    </div>
                    <div className="rounded-xl p-2.5" style={{background:"rgba(8,17,31,.6)",backdropFilter:"blur(12px)",border:`1px solid ${C.green}33`}}>
                      <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Masjid Dibantu</div>
                      <div className="font-bold text-sm font-num serif" style={{color:C.green}}>{totalMasjidDibantu} Masjid</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <BannerSlider/>

            {/* Search */}
            <div className="relative fu1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:C.textMute}}>{I.search}</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari masjid atau kota..."
                className="w-full rounded-xl pl-9 pr-9 py-3 text-sm focus:outline-none"
                style={{background:C.navy3,border:`1px solid ${C.navy5}`,color:C.text}}
                onFocus={e=>e.target.style.borderColor=C.gold+"66"} onBlur={e=>e.target.style.borderColor=C.navy5}/>
              {search && <button onClick={()=>setSearch("")} className="press absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute}}>✕</button>}
            </div>

            {/* List vs Map toggle */}
            <div className="flex items-center justify-between gap-3 fu2">
              <div className="flex rounded-lg overflow-hidden p-1 gap-1" style={{background:C.navy3,border:`1px solid ${C.navy5}`}}>
                <button onClick={()=>setExploreMode("list")} className="press px-3 py-1.5 text-xs font-bold rounded-md inline-flex items-center gap-1.5"
                  style={exploreMode==="list"?{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}:{color:C.textMute}}>
                  {I.list} List
                </button>
                <button onClick={()=>setExploreMode("map")} className="press px-3 py-1.5 text-xs font-bold rounded-md inline-flex items-center gap-1.5"
                  style={exploreMode==="map"?{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}:{color:C.textMute}}>
                  {I.map} Peta
                </button>
              </div>
              <div className="text-xs" style={{color:C.textMute}}>{filteredMasjids.length} masjid {userLoc?"di sekitar Anda":"terdaftar"}</div>
            </div>

            {/* Content based on mode */}
            {exploreMode === "map" ? (
              <MapView masjidList={filteredMasjids} userLoc={userLoc} onSelectMasjid={setSelMasjid}/>
            ) : (
              <div className="fu3">
                <div className="font-bold serif text-lg mb-3" style={{color:C.text}}>{userLoc?"Masjid Terdekat":"Masjid Terpercaya"}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredMasjids.map(m=>(
                    <Card key={m.id} className="overflow-hidden lift cursor-pointer" onClick={()=>setSelMasjid(m)}>
                      <div className="h-32 relative overflow-hidden">
                        {m.foto ? (
                          <img src={m.foto} alt={m.nama} className="w-full h-full object-cover"/>
                        ) : (
                          <div className="h-full bg-pattern-fine" style={{background:`linear-gradient(135deg,${C.navy4} 0%,${C.navy3} 100%)`}}/>
                        )}
                        <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(8,17,31,0.85) 0%,transparent 60%)"}}/>
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full" style={{background:C.goldGlow,filter:"blur(20px)"}}/>
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {m.plan==="pro" && <GoldBadge sm>VERIFIED PRO</GoldBadge>}
                          {userLoc && m.distance < Infinity && (
                            <div className="px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)"}}>
                              📍 {fmtDistance(m.distance)}
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="font-bold serif text-white" style={{fontSize:16,letterSpacing:"-0.01em"}}>{m.nama}</div>
                          <div className="text-xs flex items-center gap-1 mt-0.5" style={{color:C.textDim}}><span>📍</span>{m.kota}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg px-2 py-1.5" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                            <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Donatur</div>
                            <div className="text-xs font-bold font-num" style={{color:C.green}}>{m.users * 23}+</div>
                          </div>
                          <div className="rounded-lg px-2 py-1.5" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                            <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Transaksi</div>
                            <div className="text-xs font-bold font-num" style={{color:C.blue}}>{m.trx}</div>
                          </div>
                        </div>
                        <GoldBtn sm full className="mt-3">Lihat Detail & Berdonasi →</GoldBtn>
                      </div>
                    </Card>
                  ))}
                </div>
                {filteredMasjids.length===0 && <Card><EmptyState icon="🔍" title="Tidak ditemukan" desc="Tidak ada masjid yang cocok dengan pencarian Anda."/></Card>}
              </div>
            )}
          </div>
        )}

        {/* RIWAYAT */}
        {page==="riwayat" && (
          <div className="space-y-4 fu">
            <Card gold className="p-5 bg-pattern-fine relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full" style={{background:C.goldGlow,filter:"blur(30px)"}}/>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5" style={{color:C.textMute}}>Total Donasi Anda</div>
                <div className="text-3xl font-bold serif gold-shimmer font-num"><AnimatedNum value={totalDonasi}/></div>
                <div className="text-xs mt-1.5" style={{color:C.textMute}}>{myDonasi.length} kali donasi · {totalMasjidDibantu} masjid dibantu</div>
              </div>
            </Card>
            {myDonasi.length===0 ? (
              <Card><EmptyState icon="📜" title="Belum ada donasi" desc="Donasi yang Anda berikan akan tampil di sini. Mulai jelajahi masjid dan berdonasi sekarang." action={<GoldBtn sm onClick={()=>setPage("explore")}>Jelajahi Masjid →</GoldBtn>}/></Card>
            ) : (
              <div className="space-y-2.5">
                {myDonasi.map(d=>(
                  <Card key={d.id} className="p-4 lift">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:C.goldGlow,border:`1px solid ${C.gold}44`}}>💎</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate" style={{color:C.text,fontSize:14}}>{d.masjid_nama}</div>
                            <div className="text-[11px] mt-0.5" style={{color:C.textMute}}>{d.program||"Donasi umum"} · {d.metode}</div>
                            <div className="text-[10px] mt-0.5 font-mono" style={{color:C.textFaint}}>Ref: {d.ref}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold serif font-num" style={{color:C.gold,fontSize:15}}>{fmt(d.jumlah)}</div>
                            <div className="text-[10px]" style={{color:C.textMute}}>{fmtDate(d.tanggal)}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Chip label="✓ Terkonfirmasi" color={C.green} size="sm"/>
                          <button onClick={()=>printDonationReceipt(d,jamaah)} className="press text-[10px] font-bold flex items-center gap-1" style={{color:C.blue}}>{I.pdf} Cetak Bukti</button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFIL */}
        {page==="profil" && (
          <div className="space-y-4 fu max-w-2xl">
            <Card gold className="p-6 text-center bg-pattern-fine">
              <div className="relative inline-block">
                <Avatar nama={jamaah.nama} size={80} gold/>
                {jamaah.googleAuth && <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{background:"#fff",border:`2px solid ${C.gold}`}}><GoogleLogo size={16}/></div>}
              </div>
              <div className="font-bold text-xl serif mt-3" style={{color:C.text}}>{jamaah.nama}</div>
              <div className="text-xs mt-0.5" style={{color:C.textMute}}>{jamaah.email}</div>
              {jamaah.telepon && <div className="text-xs mt-0.5" style={{color:C.textMute}}>📞 {jamaah.telepon}</div>}
              {jamaah.googleAuth && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-2 text-[10px] font-bold" style={{background:C.goldGlow,border:`1px solid ${C.gold}55`,color:C.gold}}>
                  <GoogleLogo size={10}/> Terhubung dengan Google
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div><div className="font-bold text-lg gold-shimmer serif"><AnimatedNum value={totalDonasi} format={fmtS}/></div><div className="text-[9px] uppercase tracking-wider font-bold mt-0.5" style={{color:C.textMute}}>Total</div></div>
                <div><div className="font-bold text-lg serif" style={{color:C.green}}>{myDonasi.length}</div><div className="text-[9px] uppercase tracking-wider font-bold mt-0.5" style={{color:C.textMute}}>Donasi</div></div>
                <div><div className="font-bold text-lg serif" style={{color:C.blue}}>{totalMasjidDibantu}</div><div className="text-[9px] uppercase tracking-wider font-bold mt-0.5" style={{color:C.textMute}}>Masjid</div></div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.gold}}/><div className="font-bold serif" style={{color:C.text}}>Tentang Heema Portal Jamaah</div></div>
              <div className="space-y-3 text-xs" style={{color:C.textDim}}>
                <div className="flex items-start gap-2.5"><span className="text-base">🔒</span><div><b style={{color:C.text}}>Aman & Terpercaya</b><br/>Setiap donasi tercatat dengan bukti otomatis dan referensi unik.</div></div>
                <div className="flex items-start gap-2.5"><span className="text-base">📊</span><div><b style={{color:C.text}}>Transparan</b><br/>Lihat langsung laporan keuangan dan progress program masjid.</div></div>
                <div className="flex items-start gap-2.5"><span className="text-base">🤝</span><div><b style={{color:C.text}}>Berkah Langsung</b><br/>Donasi langsung tercatat di profil donatur masjid yang Anda bantu.</div></div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-full" style={{background:C.red}}/><div className="font-bold serif" style={{color:C.red}}>Akun</div></div>
              <NavyBtn danger full icon={I.logout} onClick={onLogout}>Keluar</NavyBtn>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 lg:hidden" style={{background:`${C.navy2}f5`,borderTop:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
        <div className="flex">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} className="flex-1 flex flex-col items-center py-2.5 gap-1 press relative">
              {page===n.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b" style={{background:C.gold,boxShadow:`0 0 8px ${C.gold}`}}/>}
              <span className="text-lg" style={{transform:page===n.id?"scale(1.1)":"none",transition:"all .2s",filter:page===n.id?"none":"grayscale(50%) opacity(0.6)"}}>{n.icon}</span>
              <span className="text-[9px] font-bold leading-none" style={{color:page===n.id?C.gold:C.textMute}}>{n.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop bottom tab bar */}
      <div className="hidden lg:flex sticky bottom-0 z-20 justify-center py-3" style={{background:`${C.navy2}f5`,borderTop:`1px solid ${C.navy5}`,backdropFilter:"blur(12px)"}}>
        <div className="flex gap-2">
          {NAV.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} className="press px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2"
            style={page===n.id?{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}:{background:C.navy3,color:C.textMute,border:`1px solid ${C.navy5}`}}>
            <span>{n.icon}</span>{n.label}
          </button>))}
        </div>
      </div>

      {/* Masjid detail modal */}
      {selMasjid && <MasjidDetail masjid={selMasjid} programs={allPrograms} onClose={()=>setSelMasjid(null)} onDonate={p=>{setDonasiModal({masjid:selMasjid,program:p?.nama});setSelMasjid(null);}} userLoc={userLoc}/>}

      {/* Donation modal */}
      <Modal open={!!donasiModal} onClose={()=>setDonasiModal(null)} title={donasiModal?.masjid?.nama||"Berdonasi"} subtitle="Donasi · Heema">
        {donasiModal && <DonasiForm data={donasiModal} programs={allPrograms.filter(p=>p.status==="aktif")} onClose={()=>setDonasiModal(null)} onSubmit={submitDonasi}/>}
      </Modal>

      {/* Profile mini modal */}
      <Modal open={profilModal} onClose={()=>setProfilModal(false)} title="Akun Jamaah" subtitle="Profil">
        <div className="p-5 text-center">
          <Avatar nama={jamaah.nama} size={64} gold/>
          <div className="font-bold text-lg serif mt-2" style={{color:C.text}}>{jamaah.nama}</div>
          <div className="text-xs mt-0.5" style={{color:C.textMute}}>{jamaah.email}</div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-lg p-3" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
              <div className="text-[10px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Total Donasi</div>
              <div className="text-base font-bold gold-shimmer serif font-num">{fmtS(totalDonasi)}</div>
            </div>
            <div className="rounded-lg p-3" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
              <div className="text-[10px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Berkontribusi</div>
              <div className="text-base font-bold serif" style={{color:C.green}}>{myDonasi.length}×</div>
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-3" style={{borderTop:`1px solid ${C.navy5}`,paddingTop:16,background:C.navy2}}>
          <NavyBtn onClick={()=>{setProfilModal(false);setPage("profil");}} full>Detail Profil</NavyBtn>
          <NavyBtn danger onClick={onLogout} full icon={I.logout}>Keluar</NavyBtn>
        </div>
      </Modal>

      {/* THANK YOU MODAL - shows after donation */}
      {thanksModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 fi" style={{background:"rgba(0,0,0,.85)",backdropFilter:"blur(8px)"}} onClick={()=>setThanksModal(null)}>
          <div className="w-full max-w-md rounded-2xl overflow-hidden si bg-pattern-fine relative" onClick={e=>e.stopPropagation()} 
            style={{background:`linear-gradient(135deg,${C.navy3} 0%,${C.navy2} 100%)`,border:`2px solid ${C.gold}`,boxShadow:`0 0 60px ${C.gold}66, 0 20px 60px rgba(0,0,0,.5)`}}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full" style={{background:C.goldGlow,filter:"blur(60px)"}}/>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full" style={{background:`${C.green}33`,filter:"blur(60px)"}}/>
            <div className="relative p-7 text-center">
              <div className="inline-block ring-in" style={{filter:`drop-shadow(0 0 24px ${C.gold})`}}>
                <div style={{fontSize:64}}>💎</div>
              </div>
              <div className="mt-3 font-bold serif gold-shimmer" style={{fontSize:26,letterSpacing:"-0.01em"}}>Jazaakumullaahu Khairan</div>
              <div className="text-sm mt-2 max-w-xs mx-auto" style={{color:C.textDim,lineHeight:1.5}}>
                Donasi Anda <b style={{color:C.gold}}>{fmt(thanksModal.donation.jumlah)}</b> telah kami terima.
                Semoga Allah membalas kebaikan Anda dengan yang lebih baik. 🤲
              </div>
              <div className="mt-5 rounded-xl p-4" style={{background:"rgba(8,17,31,.6)",border:`1px solid ${C.gold}44`}}>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>No. Referensi</div>
                    <div className="text-xs font-mono font-bold" style={{color:C.gold}}>{thanksModal.donation.ref}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Untuk</div>
                    <div className="text-xs font-bold truncate" style={{color:C.text}}>{thanksModal.donation.masjid_nama}</div>
                  </div>
                  {thanksModal.donation.program && (
                    <div className="col-span-2">
                      <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Program</div>
                      <div className="text-xs font-bold" style={{color:C.green}}>📌 {thanksModal.donation.program}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-[10px]" style={{color:C.textMute}}>✓ Notifikasi telah dikirim ke email <b style={{color:C.gold}}>{jamaah.email}</b></div>
              <div className="flex gap-3 mt-5">
                <NavyBtn full onClick={()=>setThanksModal(null)}>Tutup</NavyBtn>
                <GoldBtn full icon={I.pdf} onClick={()=>{printDonationReceipt(thanksModal.donation,jamaah);}}>Cetak Bukti</GoldBtn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JAMAAH NOTIFICATIONS PANEL */}
      {showJamaahNotif && (
        <>
          <div className="fixed inset-0 z-40 fi" onClick={()=>setShowJamaahNotif(false)} style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)"}}/>
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 slide-r overflow-hidden flex flex-col" style={{background:C.navy2,borderLeft:`1px solid ${C.gold}33`}}>
            <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`}}>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full" style={{background:C.gold}}/>
                  <div className="font-bold serif text-lg" style={{color:C.gold}}>Notifikasi Anda</div>
                  {unreadJamaahNotif>0 && <Chip label={`${unreadJamaahNotif} Baru`} color={C.gold} bg={C.goldGlow} size="sm"/>}
                </div>
                <div className="text-xs mt-0.5" style={{color:C.textMute}}>{myNotifs.length} notifikasi</div>
              </div>
              <button onClick={()=>setShowJamaahNotif(false)} className="press w-8 h-8 rounded-full flex items-center justify-center" style={{background:C.navy4,color:C.textMute}}>{I.x}</button>
            </div>
            {myNotifs.length>0 && (
              <div className="px-5 py-2.5" style={{borderBottom:`1px solid ${C.navy5}`}}>
                <button onClick={markAllNotifRead} className="press text-xs font-bold" style={{color:C.gold}}>Tandai semua dibaca</button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              {myNotifs.length===0 ? (
                <div className="py-16 text-center"><div className="text-5xl mb-3 opacity-30">💌</div><div className="text-sm font-semibold" style={{color:C.textMute}}>Belum ada notifikasi</div><div className="text-xs mt-1 max-w-xs mx-auto" style={{color:C.textFaint}}>Setelah Anda berdonasi, notifikasi terima kasih akan muncul di sini</div></div>
              ) : myNotifs.map((n,i)=>(
                <div key={n.id}>{i>0 && <Divider/>}
                  <div className="px-5 py-3.5 hover:bg-white/[0.02] relative cursor-pointer" onClick={()=>markNotifRead(n.id)}>
                    {!n.read && <div className="absolute right-3 top-3 w-2 h-2 rounded-full pulse-gold" style={{background:C.gold,boxShadow:`0 0 6px ${C.gold}`}}/>}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:n.warna+"22",border:`1px solid ${n.warna}44`}}>{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm" style={{color:C.text}}>{n.judul}</div>
                        <div className="text-xs mt-1" style={{color:C.textDim,lineHeight:1.5}}>{n.pesan}</div>
                        {n.detail && (
                          <div className="mt-2 rounded-lg p-2 flex items-center justify-between" style={{background:C.navy2,border:`1px solid ${C.navy5}`}}>
                            <div className="text-[10px] font-mono" style={{color:C.gold}}>{n.detail.ref}</div>
                            <button onClick={(e)=>{e.stopPropagation();printDonationReceipt(n.detail,jamaah);}} className="press text-[10px] font-bold" style={{color:C.blue}}>{I.pdf} Bukti</button>
                          </div>
                        )}
                        <div className="text-[10px] mt-1.5" style={{color:C.textMute}}>{n.waktu}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* Masjid detail screen (modal full) */
function MasjidDetail({masjid,programs,onClose,onDonate,userLoc}) {
  useEffect(()=>{ document.body.style.overflow="hidden"; return()=>{document.body.style.overflow="";}; },[]);
  useEffect(()=>{
    const h = e => { if(e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  },[onClose]);
  
  const distance = userLoc && masjid.lat && masjid.lng ? calcDistance(userLoc.lat, userLoc.lng, masjid.lat, masjid.lng) : null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center fi p-0 sm:p-4" style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div className="w-full sm:max-w-2xl si overflow-hidden bg-pattern-fine flex flex-col" onClick={e=>e.stopPropagation()}
        style={{background:C.navy3,borderRadius:"1.25rem 1.25rem 0 0",border:`1px solid ${C.gold}66`,borderBottomColor:"transparent",maxHeight:"92vh"}}>
        <div className="flex justify-center pt-2 pb-1 sm:hidden flex-shrink-0"><div className="w-10 h-1 rounded-full" style={{background:C.navy5}}/></div>
        {/* Cover with photo */}
        <div className="relative overflow-hidden flex-shrink-0" style={{aspectRatio:"16/9",maxHeight:240}}>
          {masjid.foto ? (
            <img src={masjid.foto} alt={masjid.nama} className="w-full h-full object-cover"/>
          ) : (
            <div className="w-full h-full" style={{background:`linear-gradient(135deg,${C.navy4} 0%,${C.navy2} 100%)`}}>
              <div className="bg-pattern w-full h-full"/>
            </div>
          )}
          <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(8,17,31,0.95) 0%,transparent 50%)"}}/>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{background:C.goldGlow,filter:"blur(40px)"}}/>
          <button onClick={onClose} className="press absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10" style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(8px)",color:"#fff",border:`1px solid ${C.gold}33`}}>{I.x}</button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              {masjid.plan==="pro" && <GoldBadge sm>VERIFIED PRO</GoldBadge>}
              <Chip label={statusLabel[masjid.status]} color={statusColor[masjid.status]} size="sm"/>
              {distance !== null && distance < Infinity && (
                <div className="px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1" style={{background:"rgba(0,0,0,0.6)",color:C.gold,backdropFilter:"blur(8px)"}}>
                  📍 {fmtDistance(distance)}
                </div>
              )}
            </div>
            <div className="font-bold text-2xl serif" style={{color:"#fff",letterSpacing:"-0.01em"}}>{masjid.nama}</div>
            <div className="text-xs flex items-center gap-1 mt-1" style={{color:C.textDim}}><span>📍</span>{masjid.alamat||masjid.kota}</div>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Map preview */}
          {masjid.lat && masjid.lng && (
            <Card className="overflow-hidden">
              <div className="px-3 py-2 flex items-center justify-between" style={{borderBottom:`1px solid ${C.navy5}`,background:C.navy2}}>
                <div className="text-xs font-bold flex items-center gap-1.5" style={{color:C.gold}}>{I.pin} Lokasi Masjid</div>
                <div className="flex gap-2">
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}`} target="_blank" rel="noopener noreferrer" className="press text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded" style={{color:C.green,background:C.greenBg,border:`1px solid ${C.green}44`}}>🧭 Rute</a>
                  <a href={`https://www.google.com/maps?q=${masjid.lat},${masjid.lng}`} target="_blank" rel="noopener noreferrer" className="press text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded" style={{color:C.blue,background:C.blueBg,border:`1px solid ${C.blue}44`}}>🌐 Maps</a>
                </div>
              </div>
              <GoogleMap 
                center={{lat:masjid.lat, lng:masjid.lng}} 
                zoom={16} 
                markers={[masjid]} 
                userLoc={userLoc}
                style={{height:200}}
              />
              <div className="px-3 py-2 flex items-center justify-between text-[10px]" style={{background:C.navy2}}>
                <span style={{color:C.textMute}}>Koordinat</span>
                <span className="font-mono font-bold" style={{color:C.gold}}>{masjid.lat.toFixed(5)}, {masjid.lng.toFixed(5)}</span>
              </div>
            </Card>
          )}
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {[["Donatur",masjid.users*23+"+",C.green],["Transaksi",masjid.trx,C.blue],["Bergabung",new Date(masjid.tgl).getFullYear(),C.gold]].map(([l,v,c])=>(
              <div key={l} className="rounded-xl p-3 text-center" style={{background:C.navy2,border:`1px solid ${c}33`}}>
                <div className="text-[9px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>{l}</div>
                <div className="font-bold serif mt-1 font-num" style={{color:c,fontSize:14}}>{v}</div>
              </div>
            ))}
          </div>
          {/* Donate umum */}
          <button onClick={()=>onDonate(null)} className="press w-full rounded-xl p-4 text-left flex items-center gap-3 bg-pattern-fine relative overflow-hidden lift"
            style={{background:`linear-gradient(135deg,${C.gold}22,${C.gold}11)`,border:`1px solid ${C.gold}55`}}>
            <div className="text-3xl">💝</div>
            <div className="flex-1">
              <div className="font-bold serif" style={{color:C.gold,fontSize:16}}>Donasi Umum</div>
              <div className="text-xs mt-0.5" style={{color:C.textDim}}>Untuk operasional & kegiatan masjid</div>
            </div>
            <div style={{color:C.gold}}>{I.chev}</div>
          </button>
          {/* Programs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full" style={{background:C.gold}}/>
              <div className="font-bold serif text-lg" style={{color:C.text}}>Program Berjalan</div>
              <Chip label={programs.filter(p=>p.status==="aktif").length+" Aktif"} color={C.green} size="sm"/>
            </div>
            <div className="space-y-2.5">
              {programs.filter(p=>p.status==="aktif").map(p=>{
                const pct=p.anggaran>0?Math.min((p.terpakai/p.anggaran)*100,100):0;
                const sisa = p.anggaran-p.terpakai;
                return (
                  <Card key={p.id} className="overflow-hidden lift cursor-pointer" onClick={()=>onDonate(p)}>
                    {p.pamflet && (
                      <div className="relative w-full" style={{aspectRatio:"1/1",maxHeight:300,overflow:"hidden"}}>
                        <img src={p.pamflet} alt={p.nama} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 flex items-end p-3" style={{background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 50%)"}}>
                          <div className="w-full">
                            <div className="font-bold serif text-white" style={{fontSize:20,letterSpacing:"-0.01em"}}>{p.nama}</div>
                            <div className="flex items-center justify-between mt-1">
                              <Chip label="● Sedang Berjalan" color={C.green} size="sm"/>
                              <div className="font-bold serif font-num" style={{color:p.warna,fontSize:20,textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{Math.round(pct)}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="h-1" style={{background:`linear-gradient(90deg,${p.warna} ${pct}%,${C.navy2} ${pct}%)`}}/>
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {!p.pamflet && <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:`${p.warna}18`,border:`1px solid ${p.warna}44`}}>{p.ikon}</div>}
                        <div className="flex-1 min-w-0">
                          {!p.pamflet && <div className="font-bold serif" style={{color:C.text,fontSize:15}}>{p.nama}</div>}
                          <p className="text-xs mt-0.5 mb-2" style={{color:C.textMute}}>{p.deskripsi}</p>
                          <div className="flex items-baseline justify-between text-[11px]">
                            <span style={{color:C.textMute}}>Terkumpul <b className="font-num" style={{color:p.warna}}>{fmt(p.terpakai)}</b></span>
                            <span style={{color:C.textMute}}>/ {fmt(p.anggaran)}</span>
                          </div>
                          <div className="text-[10px] mt-1" style={{color:C.green}}>Masih dibutuhkan <b className="font-num">{fmt(sisa)}</b></div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {!p.pamflet && <div className="font-bold serif font-num" style={{color:p.warna,fontSize:18}}>{Math.round(pct)}%</div>}
                          <button className="mt-2 press px-3 py-1.5 rounded-lg text-[10px] font-bold" style={{background:`linear-gradient(135deg,${C.goldDk},${C.gold})`,color:"#1a1208"}}>Donasi</button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {programs.filter(p=>p.status==="aktif").length===0 && (
                <Card><EmptyState icon="📌" title="Tidak ada program aktif" desc="Saat ini tidak ada program yang membutuhkan donasi khusus, tapi Anda tetap bisa berdonasi umum."/></Card>
              )}
            </div>
          </div>
          {/* Trust info */}
          <Card className="p-4">
            <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{color:C.gold}}>💎 Kenapa donasi ke sini aman?</div>
            <div className="space-y-1.5 text-xs" style={{color:C.textDim}}>
              <div className="flex items-start gap-2"><span style={{color:C.green}}>✓</span>Masjid terdaftar resmi di Heema</div>
              <div className="flex items-start gap-2"><span style={{color:C.green}}>✓</span>Laporan keuangan transparan dapat dilihat</div>
              <div className="flex items-start gap-2"><span style={{color:C.green}}>✓</span>Bukti donasi otomatis dengan kode unik</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* Donation form */
function DonasiForm({data,programs,onClose,onSubmit}) {
  const [form,setForm]=useState({program:data.program||"",jumlah:0,metode:"Transfer Bank",pesan:""});
  const [displayAmount,setDisplayAmount]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const amount = parseAmount(displayAmount);
  const valid = amount >= 10000;
  const handleAmount = (raw) => { setDisplayAmount(fmtAmountInput(raw)); set("jumlah",parseAmount(raw)); };
  const quickAmounts = [50000,100000,250000,500000,1000000];
  const metodes = ["Transfer Bank","QRIS","E-Wallet","Tunai (di Masjid)"];

  return (
    <>
      <div className="p-5 space-y-4">
        {form.program && (
          <div className="rounded-xl p-3 flex items-center gap-2.5" style={{background:`${C.gold}11`,border:`1px solid ${C.gold}44`}}>
            <div className="text-xl">📌</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider font-bold" style={{color:C.gold}}>Program</div>
              <div className="text-sm font-bold truncate" style={{color:C.text}}>{form.program}</div>
            </div>
            <button onClick={()=>set("program","")} className="press text-xs font-bold" style={{color:C.textMute}}>Ganti</button>
          </div>
        )}
        {!form.program && (
          <Select label="Pilih Program (opsional)" value={form.program} onChange={v=>set("program",v)}>
            <option value="">Donasi Umum / Operasional</option>
            {programs.map(p=><option key={p.id} value={p.nama}>{p.nama}</option>)}
          </Select>
        )}
        <div className="rounded-xl p-5 text-center" style={{background:C.navy2,border:`1px solid ${C.gold}44`}}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5" style={{color:C.textMute}}>Jumlah Donasi</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-base font-semibold" style={{color:C.textMute}}>Rp</span>
            <input inputMode="numeric" value={displayAmount} onChange={e=>handleAmount(e.target.value)} placeholder="0" autoFocus
              className="text-3xl font-bold text-center bg-transparent focus:outline-none font-num" style={{color:C.gold,maxWidth:"75%"}}/>
          </div>
          {amount>0 && amount<10000 && <div className="text-xs mt-2 font-medium" style={{color:C.red}}>Minimum donasi Rp 10.000</div>}
          {amount>=10000 && <div className="text-xs mt-2 font-medium" style={{color:C.textDim}}>{fmt(amount)}</div>}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {quickAmounts.map(qa=>(
              <button key={qa} onClick={()=>handleAmount(String(qa))} className="press px-2.5 py-1 rounded-md text-[10px] font-bold transition" 
                style={{background:amount===qa?C.gold+"33":C.navy3,color:amount===qa?C.gold:C.textMute,border:`1px solid ${amount===qa?C.gold+"55":C.navy5}`}}>
                {fmt(qa).replace("Rp","")}
              </button>
            ))}
          </div>
        </div>
        <div>
          <FieldLabel>Metode Pembayaran</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {metodes.map(m=>(
              <button key={m} onClick={()=>set("metode",m)} className="press p-2.5 rounded-lg text-xs font-bold text-left"
                style={form.metode===m?{background:C.gold+"22",border:`1px solid ${C.gold}`,color:C.gold}:{background:C.navy2,border:`1px solid ${C.navy5}`,color:C.textMute}}>
                {m==="Transfer Bank"&&"🏦"} {m==="QRIS"&&"📱"} {m==="E-Wallet"&&"💳"} {m==="Tunai (di Masjid)"&&"💵"} {m}
              </button>
            ))}
          </div>
        </div>
        <Textarea label="Pesan/Doa (opsional)" value={form.pesan} onChange={v=>set("pesan",v)} placeholder="Semoga berkah dan bermanfaat..." rows={2}/>
      </div>
      <div className="px-5 py-4 space-y-3 safe-bottom" style={{borderTop:`1px solid ${C.navy5}`,background:C.navy2}}>
        {amount>=10000 && (
          <div className="rounded-lg p-3 flex items-center justify-between" style={{background:C.goldSoft,border:`1px solid ${C.gold}44`}}>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold" style={{color:C.textMute}}>Total Donasi</div>
              <div className="font-bold gold-shimmer serif font-num">{fmt(amount)}</div>
            </div>
            <div className="text-2xl">💎</div>
          </div>
        )}
        <div className="flex gap-3">
          <NavyBtn onClick={onClose} full>Batal</NavyBtn>
          <GoldBtn onClick={()=>onSubmit({masjid:data.masjid,...form,jumlah:amount})} disabled={!valid} full>
            Donasi Sekarang
          </GoldBtn>
        </div>
        <div className="text-[10px] text-center" style={{color:C.textMute}}>🔒 Donasi aman · Bukti otomatis dikirim ke email</div>
      </div>
    </>
  );
}

function printDonationReceipt(d, jamaah) {
  const html = `<html><head><title>Bukti Donasi - ${d.ref}</title><style>
    body{font-family:'Courier New',monospace;padding:20px;max-width:380px;margin:0 auto;color:#1a1a1a;}
    .receipt{border:2px dashed #9c7a26;padding:20px;border-radius:8px;}
    .header{text-align:center;border-bottom:1px dashed #9c7a26;padding-bottom:12px;margin-bottom:12px;}
    .logo{font-size:24px;font-weight:bold;color:#9c7a26;font-family:Georgia,serif;letter-spacing:2px;}
    .stamp{display:inline-block;margin-top:8px;padding:4px 14px;font-size:11px;font-weight:bold;letter-spacing:2px;background:#9c7a26;color:#fff;border-radius:4px;}
    .amount{text-align:center;font-size:28px;font-weight:bold;margin:14px 0;color:#9c7a26;}
    .label{text-align:center;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:2px;}
    .row{display:flex;justify-content:space-between;font-size:11px;margin:6px 0;border-bottom:1px dotted #ccc;padding-bottom:4px;}
    .row b{font-weight:bold;text-align:right;max-width:60%;}
    .footer{text-align:center;margin-top:14px;padding-top:12px;border-top:1px dashed #9c7a26;font-size:10px;color:#666;line-height:1.6;}
    .note{font-style:italic;font-size:10px;color:#555;margin-top:8px;text-align:center;padding:8px;background:#fef3c7;border-radius:4px;}
    @media print{body{padding:0}.receipt{border:none}}
    </style></head><body><div class="receipt">
    <div class="header">
      <div class="logo">◆ HEEMA ◆</div>
      <div class="stamp">BUKTI DONASI</div>
    </div>
    <div class="label">Jumlah Donasi</div>
    <div class="amount">${fmt(d.jumlah)}</div>
    <div class="row"><span>No. Referensi</span><b>${d.ref}</b></div>
    <div class="row"><span>Tanggal</span><b>${fmtDate(d.tanggal)}</b></div>
    <div class="row"><span>Donatur</span><b>${jamaah.nama}</b></div>
    <div class="row"><span>Email</span><b>${jamaah.email}</b></div>
    <div class="row"><span>Untuk Masjid</span><b>${d.masjid_nama}</b></div>
    <div class="row"><span>Program</span><b>${d.program||"Donasi Umum"}</b></div>
    <div class="row"><span>Metode</span><b>${d.metode}</b></div>
    <div class="row"><span>Status</span><b style="color:#16a34a">✓ TERKONFIRMASI</b></div>
    ${d.pesan ? `<div class="note">"${d.pesan}"</div>` : ""}
    <div class="footer">
      <b>Jazaakumullaahu khairan</b><br>
      Semoga Allah membalas kebaikan Anda dengan yang lebih baik<br><br>
      Bukti ini sah & dapat digunakan untuk keperluan administrasi<br>
      Tercetak: ${new Date().toLocaleString("id-ID")}<br>
      heema.id · Pengelolaan Masjid Transparan
    </div>
    </div></body></html>`;
  const win = window.open("","_blank");
  if(!win) { toast("Browser memblokir pop-up","error"); return; }
  win.document.write(html); win.document.close();
  setTimeout(()=>{ win.print(); toast("Bukti donasi siap dicetak","success"); }, 500);
}

export default function App() {
  const [auth,setAuth]=useState(null);
  const [checkingAuth,setCheckingAuth]=useState(true);

  // On mount: check if we just came back from Google OAuth
  useEffect(()=>{
    let mounted = true;
    (async()=>{
      try {
        const oauthUser = await handleOAuthCallback();
        if (mounted && oauthUser) {
          // Clean URL params from OAuth redirect
          if (window.location.hash || window.location.search.includes("code=")) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          // Route based on role from metadata
          if (oauthUser.role === "tenant" || oauthUser.role === "tenant_admin") {
            setAuth({role:"tenant", info:{email:oauthUser.email, nama_admin:oauthUser.nama, googleAuth:true, picture:oauthUser.picture, supabaseUserId:oauthUser.supabaseUserId}});
          } else if (oauthUser.role === "superadmin") {
            setAuth({role:"superadmin"});
          } else {
            // Default: jamaah
            setAuth({role:"jamaah", jamaah:{nama:oauthUser.nama, email:oauthUser.email, telepon:oauthUser.telepon, googleAuth:true, picture:oauthUser.picture, supabaseUserId:oauthUser.supabaseUserId}});
          }
          toast(`Selamat datang, ${oauthUser.nama}!`,"gold");
        }
      } catch(e){ console.warn("OAuth check failed:",e); }
      if (mounted) setCheckingAuth(false);
    })();
    return ()=>{ mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:C.navy}}>
        <GS/>
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-yellow-700 border-t-yellow-400 rounded-full spin mx-auto"/>
          <div className="text-xs mt-3 font-semibold gold-shimmer serif" style={{letterSpacing:"0.2em"}}>HEEMA</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <GS/>
      <ToastHost/>
      <ConfirmHost/>
      {!auth && <PageAuth 
        onLogin={(r,info)=>setAuth({role:r,info})} 
        onRegister={info=>setAuth({role:"tenant",info})}
        onJamaah={jamaah=>setAuth({role:"jamaah",jamaah})}
      />}
      {auth?.role==="superadmin" && <SuperAdmin onLogout={async()=>{if(HAS_SUPABASE_AUTH){try{await _supabaseClient.auth.signOut();}catch{}}setAuth(null);}}/>}
      {auth?.role==="tenant" && <TenantApp onLogout={async()=>{if(HAS_SUPABASE_AUTH){try{await _supabaseClient.auth.signOut();}catch{}}setAuth(null);}} info={auth.info}/>}
      {auth?.role==="jamaah" && <JamaahApp onLogout={async()=>{if(HAS_SUPABASE_AUTH){try{await _supabaseClient.auth.signOut();}catch{}}setAuth(null);}} jamaah={auth.jamaah}/>}
    </>
  );
}
