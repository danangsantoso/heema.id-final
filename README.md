# 💎 Heema

**Platform pengelolaan keuangan masjid multi-tenant berbasis cloud**

Aplikasi web untuk masjid yang ingin mengelola keuangan, donasi, program kegiatan, dan jamaah dengan transparan. Mendukung 3 role: Super Admin, Admin Masjid, dan Jamaah.

## ✨ Fitur Utama

- 🕌 **Multi-tenant**: Tiap masjid punya data terisolasi
- 👥 **3 Role**: Super Admin, Admin Masjid (admin/bendahara/ketua/viewer), Jamaah
- 💝 **Portal Jamaah**: Browse masjid, donasi online dengan bukti otomatis
- 🗺️ **Google Maps**: Peta interaktif masjid + rute navigasi
- 🕌 **Pengingat Adzan**: Notifikasi otomatis berdasar lokasi jamaah
- 📊 **Export Laporan**: Excel & PDF profesional
- 🔐 **Google OAuth**: Login cepat dengan Google
- 📸 **Image Upload**: Foto masjid & pamflet program (square)
- 💎 **Notifikasi Terima Kasih**: Otomatis setelah jamaah donasi

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Supabase (Postgres + Auth + Storage + RLS)
- **Maps**: Google Maps JavaScript API
- **Hosting**: Vercel

## 🚀 Setup Local

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

## 🌐 Deploy ke Vercel

1. Push ke GitHub
2. Import project di Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GMAPS_KEY`
4. Deploy

## 📱 Demo Login

- **Super Admin**: `superadmin@heema.id`
- **Admin Masjid**: email apapun
- **Jamaah**: tab "Jamaah" di halaman login

## 📄 License

MIT
