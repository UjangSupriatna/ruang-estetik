'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  ArrowUp,
  Shield,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

const quickLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
]

const services = [
  'Desain Interior',
  'Renovasi Rumah',
  'Konstruksi Bangunan',
  'Konsultasi Desain',
  'Desain 3D & Rendering',
  'Manajemen Proyek',
]

/* ─── Kebijakan Privasi Content ─── */
const privacySections = [
  {
    title: '1. Pendahuluan',
    content:
      'Ruang Estetik ("kami", "kita", atau "perusahaan") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat Anda menggunakan website kami (ruangestetik.com) dan layanan kami.',
  },
  {
    title: '2. Informasi yang Kami Kumpulkan',
    content: null,
    subsections: [
      {
        title: 'a. Informasi yang Anda Berikan',
        items: [
          'Nama lengkap dan data identitas',
          'Alamat email dan nomor telepon/WhatsApp',
          'Alamat lokasi proyek',
          'Detail proyek termasuk anggaran dan preferensi desain',
          'Pesan dan komunikasi yang Anda kirimkan melalui form kontak atau WhatsApp',
          'Dokumen yang Anda unggah terkait proyek (denah, foto referensi, dll.)',
        ],
      },
      {
        title: 'b. Informasi yang Dikumpulkan Secara Otomatis',
        items: [
          'Alamat IP dan informasi browser',
          'Perangkat dan sistem operasi yang digunakan',
          'Halaman yang dikunjungi dan durasi kunjungan',
          'Sumber rujukan dan data navigasi',
          'Cookie dan teknologi pelacakan serupa',
        ],
      },
    ],
  },
  {
    title: '3. Penggunaan Informasi',
    content:
      'Kami menggunakan informasi yang dikumpulkan untuk tujuan berikut:',
    subsections: [
      {
        title: null,
        items: [
          'Merespons pertanyaan dan permintaan konsultasi Anda',
          'Menyediakan dan meningkatkan layanan desain interior dan bangunan kami',
          'Mengirimkan penawaran, proposal, dan informasi proyek',
          'Mengelola dan melaksanakan proyek yang telah disepakati',
          'Mengirimkan informasi promosi dan update (dengan persetujuan Anda)',
          'Menganalisis penggunaan website untuk peningkatan layanan',
          'Memenuhi kewajiban hukum dan regulasi yang berlaku',
        ],
      },
    ],
  },
  {
    title: '4. Penyimpanan dan Keamanan Data',
    content:
      'Kami menyimpan informasi pribadi Anda selama diperlukan untuk memenuhi tujuan yang diuraikan dalam kebijakan ini, atau selama diwajibkan oleh hukum. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran.',
  },
  {
    title: '5. Berbagi Informasi dengan Pihak Ketiga',
    content:
      'Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dalam situasi berikut:',
    subsections: [
      {
        title: null,
        items: [
          'Mitra kerja dan subkontraktor yang terlibat dalam proyek Anda (dengan persetujuan Anda)',
          'Penyedia layanan teknis yang mendukung operasional website kami',
          'Otoritas hukum jika diwajibkan oleh hukum atau peraturan yang berlaku',
          'Untuk melindungi hak, keselamatan, dan properti kami atau pihak lain',
        ],
      },
    ],
  },
  {
    title: '6. Cookie dan Teknologi Pelacakan',
    content:
      'Website kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman browsing Anda. Cookie membantu kami memahami bagaimana Anda menggunakan website kami sehingga kami dapat terus memperbaikinya. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.',
  },
  {
    title: '7. Hak Anda',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Mengakses dan memperoleh salinan data pribadi Anda yang kami simpan',
          'Meminta perbaikan data pribadi yang tidak akurat',
          'Meminta penghapusan data pribadi Anda (dengan batasan tertentu)',
          'Menolak pemrosesan data pribadi Anda untuk tujuan pemasaran',
          'Menarik persetujuan yang sebelumnya diberikan',
        ],
      },
    ],
  },
  {
    title: '8. Layanan Pihak Ketiga',
    content:
      'Website kami mungkin berisi tautan ke website atau layanan pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi situs tersebut. Kami menyarankan Anda untuk membaca kebijakan privasi setiap website yang Anda kunjungi.',
  },
  {
    title: '9. Perubahan Kebijakan Privasi',
    content:
      'Kami berhak memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru. Penggunaan berkelanjutan atas layanan kami setelah perubahan dianggap sebagai penerimaan atas kebijakan yang diperbarui.',
  },
  {
    title: '10. Hubungi Kami',
    content:
      'Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda terkait data pribadi, silakan hubungi kami:',
    subsections: [
      {
        title: null,
        items: [
          'Nama Perusahaan: Ruang Estetik',
          'Alamat: Bandung, Jawa Barat, Indonesia',
          'Email: derrycp37@gmail.com',
          'WhatsApp: +62 838-6229-5779',
        ],
      },
    ],
  },
]

/* ─── Syarat & Ketentuan Content ─── */
const termsSections = [
  {
    title: '1. Ketentuan Umum',
    content:
      'Dengan mengakses dan menggunakan website serta layanan Ruang Estetik, Anda menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, mohon untuk tidak menggunakan layanan kami. Ruang Estetik berhak mengubah syarat & ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.',
  },
  {
    title: '2. Definisi',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          '"Perusahaan" merujuk pada Ruang Estetik, jasa desain interior dan bangunan yang berdomisili di Bandung, Jawa Barat.',
          '"Klien" merujuk pada individu atau entitas yang menggunakan layanan kami.',
          '"Layanan" merujuk pada seluruh jasa yang ditawarkan termasuk desain interior, renovasi rumah, konstruksi bangunan, dan konsultasi desain.',
          '"Proyek" merujuk pada pekerjaan spesifik yang disepakati antara Perusahaan dan Klien.',
          '"Proposal" merujuk pada dokumen resmi yang berisi ruang lingkup pekerjaan, biaya, dan timeline proyek.',
        ],
      },
    ],
  },
  {
    title: '3. Layanan Kami',
    content:
      'Ruang Estetik menyediakan layanan desain interior dan bangunan yang meliputi:',
    subsections: [
      {
        title: null,
        items: [
          'Desain Interior — perencanaan dan perancangan ruangan sesuai kebutuhan klien',
          'Renovasi Rumah — transformasi dan perbaikan ruangan yang sudah ada',
          'Konstruksi Bangunan — pembangunan baru dari nol sesuai desain',
          'Konsultasi Desain — saran dan rekomendasi ahli (konsultasi awal gratis)',
          'Desain 3D & Rendering — visualisasi desain dalam format 3D',
          'Manajemen Proyek — pengawasan dan koordinasi pelaksanaan proyek',
        ],
      },
    ],
  },
  {
    title: '4. Proses Pemesanan dan Kerja',
    content: null,
    subsections: [
      {
        title: 'a. Konsultasi Awal',
        items: [
          'Konsultasi awal bersifat gratis dan tanpa komitmen',
          'Klien diharapkan memberikan informasi yang akurat mengenai kebutuhan dan anggaran',
        ],
      },
      {
        title: 'b. Proposal dan Kesepakatan',
        items: [
          'Setelah konsultasi, Perusahaan akan menyusun proposal resmi',
          'Proposal mencakup ruang lingkup pekerjaan, biaya, timeline, dan syarat pembayaran',
          'Proyek dimulai setelah proposal ditandatangani dan pembayaran DP diterima',
        ],
      },
      {
        title: 'c. Pelaksanaan Proyek',
        items: [
          'Perusahaan akan melaksanakan pekerjaan sesuai proposal yang disepakati',
          'Perubahan ruang lingkup pekerjaan harus disetujui kedua belah pihak secara tertulis',
          'Klien berhak mendapatkan update progres pekerjaan secara berkala',
        ],
      },
    ],
  },
  {
    title: '5. Pembayaran',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Skema pembayaran akan ditentukan dalam proposal (umumnya: DP 40%, progres 40%, pelunasan 20%)',
          'Pembayaran dapat dilakukan melalui transfer bank atau metode lain yang disepakati',
          'Keterlambatan pembayaran dapat mengakibatkan penundaan pelaksanaan proyek',
          'Biaya tambahan akibat perubahan ruang lingkup akan dikenakan sesuai kesepakatan tertulis',
          'Harga yang tertera dalam proposal sudah termasuk PPN kecuali dinyatakan lain',
        ],
      },
    ],
  },
  {
    title: '6. Revisi dan Perubahan Desain',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Revisi desain sesuai ruang lingkup awal termasuk dalam paket layanan',
          'Revisi di luar ruang lingkup awal dapat dikenakan biaya tambahan',
          'Jumlah revisi yang termasuk akan ditentukan dalam proposal',
          'Perubahan desain setelah tahap pelaksanaan dimulai dikenakan biaya sesuai pekerjaan yang harus diulang',
        ],
      },
    ],
  },
  {
    title: '7. Garansi',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Perusahaan memberikan garansi kualitas selama 1 (satu) tahun sejak serah terima proyek',
          'Garansi mencakup perbaikan gratis untuk masalah yang timbul akibat pekerjaan Perusahaan',
          'Garansi tidak berlaku untuk kerusakan akibat penggunaan tidak wajar, bencana alam, atau modifikasi oleh pihak ketiga',
          'Klaim garansi harus diajukan secara tertulis melalui email atau WhatsApp resmi Perusahaan',
        ],
      },
    ],
  },
  {
    title: '8. Pembatalan dan Pengembalian Dana',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Pembatalan sebelum proyek dimulai: DP dikembalikan 50%',
          'Pembatalan setelah proyek berjalan: pembayaran sesuai progres yang sudah dikerjakan, sisa dikembalikan setelah dikurangi biaya administrasi',
          'Perusahaan berhak membatalkan proyek jika klien melanggar syarat & ketentuan yang berlaku',
          'Pembatalan oleh Perusahaan sebelum proyek dimulai: DP dikembalikan 100%',
        ],
      },
    ],
  },
  {
    title: '9. Hak Kekayaan Intelektual',
    content: null,
    subsections: [
      {
        title: null,
        items: [
          'Seluruh desain, gambar teknis, dan dokumen terkait proyek merupakan hak milik Perusahaan hingga pelunasan penuh',
          'Setelah pelunasan, hak penggunaan desain berpindah kepada Klien',
          'Perusahaan berhak menggunakan dokumentasi proyek (foto before/after) untuk portofolio dan pemasaran, kecuali Klien menolak secara tertulis',
          'Klien tidak boleh menyalin atau menggunakan desain untuk proyek lain tanpa izin tertulis',
        ],
      },
    ],
  },
  {
    title: '10. Batasan Tanggung Jawab',
    content:
      'Perusahaan tidak bertanggung jawab atas:',
    subsections: [
      {
        title: null,
        items: [
          'Kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami',
          'Keterlambatan yang disebabkan oleh force majeure (bencana alam, pandemi, kebijakan pemerintah, dll.)',
          'Kerusakan atau cacat yang disebabkan oleh pihak ketiga atau penggunaan tidak wajar oleh Klien',
          'Ketidaksesuaian yang diakibatkan oleh informasi yang tidak akurat dari Klien',
        ],
      },
    ],
  },
  {
    title: '11. Penyelesaian Sengketa',
    content:
      'Setiap sengketa yang timbul dari atau terkait dengan Syarat & Ketentuan ini akan diselesaikan melalui musyawarah mufakat. Jika musyawarah tidak berhasil, sengketa akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) yang keputusannya bersifat final dan mengikat.',
  },
  {
    title: '12. Hukum yang Berlaku',
    content:
      'Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul akan tunduk pada yurisdiksi eksklusif pengadilan yang berwenang di Indonesia.',
  },
  {
    title: '13. Hubungi Kami',
    content:
      'Untuk pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi:',
    subsections: [
      {
        title: null,
        items: [
          'Nama Perusahaan: Ruang Estetik',
          'Alamat: Bandung, Jawa Barat, Indonesia',
          'Email: derrycp37@gmail.com',
          'WhatsApp: +62 838-6229-5779',
        ],
      },
    ],
  },
]

/* ─── Legal Section Renderer ─── */
function LegalContent({ sections }: { sections: typeof privacySections }) {
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 text-sm font-bold text-foreground sm:text-base">
            {section.title}
          </h3>
          {section.content && (
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {section.content}
            </p>
          )}
          {section.subsections?.map((sub, i) => (
            <div key={i} className="mb-2">
              {sub.title && (
                <p className="mb-1.5 text-sm font-semibold text-foreground">
                  {sub.title}
                </p>
              )}
              <ul className="ml-4 space-y-1.5">
                {sub.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Footer Component ─── */
export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative bg-neutral-900 text-neutral-300 dark:bg-neutral-950">
        {/* Main Footer */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-5">
              <div>
                <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-white">
                  Ruang Estetik
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-400">
                Mengubah ruangan impian Anda menjadi kenyataan dengan desain yang
                elegan dan fungsional sejak 2020.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-silver-500 hover:text-neutral-900"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-silver-500 hover:text-neutral-900"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex size-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-silver-500 hover:text-neutral-900"
                >
                  <Youtube className="size-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Navigasi
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-silver-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Layanan
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-sm text-neutral-400">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Kontak
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-silver-500" />
                  <span className="text-sm text-neutral-400">
                    Bandung, Jawa Barat, Indonesia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-silver-500" />
                  <span className="text-sm text-neutral-400">
                    +62 838-6229-5779
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-silver-500" />
                  <span className="text-sm text-neutral-400">
                    derrycp37@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-800" />

        {/* Bottom Footer */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Ruang Estetik. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-silver-400"
            >
              <Shield className="size-3" />
              Kebijakan Privasi
            </button>
            <button
              onClick={() => setTermsOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-silver-400"
            >
              <FileText className="size-3" />
              Syarat & Ketentuan
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="text-neutral-400 hover:bg-neutral-800 hover:text-silver-400"
            aria-label="Scroll to top"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </footer>

      {/* Kebijakan Privasi Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Shield className="size-5 text-silver-500" />
              Kebijakan Privasi
            </DialogTitle>
            <DialogDescription>
              Terakhir diperbarui: Maret 2025
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[65vh] px-6 py-5">
            <LegalContent sections={privacySections} />
          </ScrollArea>
          <div className="px-6 py-4 border-t bg-muted/30">
            <Button
              onClick={() => setPrivacyOpen(false)}
              className="w-full bg-silver-500 text-white hover:bg-silver-600"
            >
              Saya Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Syarat & Ketentuan Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="size-5 text-silver-500" />
              Syarat & Ketentuan
            </DialogTitle>
            <DialogDescription>
              Terakhir diperbarui: Maret 2025
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[65vh] px-6 py-5">
            <LegalContent sections={termsSections} />
          </ScrollArea>
          <div className="px-6 py-4 border-t bg-muted/30">
            <Button
              onClick={() => setTermsOpen(false)}
              className="w-full bg-silver-500 text-white hover:bg-silver-600"
            >
              Saya Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
