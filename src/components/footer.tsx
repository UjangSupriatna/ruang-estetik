'use client';

import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  ArrowUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
];

const services = [
  'Desain Interior',
  'Renovasi Rumah',
  'Konstruksi Bangunan',
  'Konsultasi Desain',
  'Desain 3D & Rendering',
  'Manajemen Proyek',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-stone-900 text-stone-300 dark:bg-stone-950">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-white">
                Ruangan Elegan
              </h3>
              <p className="mt-1 text-sm text-amber-400">
                Desain Interior & Bangunan Profesional
              </p>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Mengubah ruangan impian Anda menjadi kenyataan dengan desain yang
              elegan dan fungsional sejak 2009.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-lg bg-stone-800 text-stone-400 transition-colors hover:bg-amber-600 hover:text-white"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-lg bg-stone-800 text-stone-400 transition-colors hover:bg-amber-600 hover:text-white"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex size-10 items-center justify-center rounded-lg bg-stone-800 text-stone-400 transition-colors hover:bg-amber-600 hover:text-white"
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
                    className="text-sm text-stone-400 transition-colors hover:text-amber-400"
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
                  <span className="text-sm text-stone-400">{service}</span>
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
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber-500" />
                <span className="text-sm text-stone-400">
                  Jl. Sudirman No. 123, Jakarta Selatan, 12190
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-amber-500" />
                <span className="text-sm text-stone-400">
                  +62 812-3456-7890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-amber-500" />
                <span className="text-sm text-stone-400">
                  info@ruanganelegan.id
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-stone-800" />

      {/* Bottom Footer */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-stone-500">
          © {new Date().getFullYear()} Ruangan Elegan. Hak cipta dilindungi.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-stone-500 transition-colors hover:text-amber-400"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="#"
            className="text-xs text-stone-500 transition-colors hover:text-amber-400"
          >
            Syarat & Ketentuan
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToTop}
          className="text-stone-400 hover:bg-stone-800 hover:text-amber-400"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </footer>
  );
}
