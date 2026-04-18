'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telepon',
    detail: '+62 812-3456-7890',
    sub: 'Senin - Sabtu, 09:00 - 18:00',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'info@ruanganelegan.id',
    sub: 'Respon dalam 24 jam',
  },
  {
    icon: MapPin,
    title: 'Alamat',
    detail: 'Jl. Sudirman No. 123',
    sub: 'Jakarta Selatan, 12190',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    detail: 'Senin - Sabtu',
    sub: '09:00 - 18:00 WIB',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontak"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white to-amber-50/30 py-20 dark:from-background dark:to-amber-950/10 sm:py-28"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-80 rounded-full bg-amber-100/30 dark:bg-amber-900/10" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-amber-100/20 dark:bg-amber-900/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
            <Send className="size-3.5" />
            Hubungi Kami
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Konsultasi Gratis
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ceritakan proyek impian Anda dan kami akan membantu mewujudkannya
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <Card
                  key={item.title}
                  className="border-amber-100/60 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-amber-900/30 dark:bg-card/60"
                >
                  <CardContent className="flex items-start gap-4 pt-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                        {item.detail}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.sub}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-white shadow-lg">
              <h3 className="font-[var(--font-playfair)] text-lg font-bold">
                Chat via WhatsApp
              </h3>
              <p className="mt-2 text-sm text-amber-100">
                Dapatkan respon cepat langsung dari tim kami
              </p>
              <Button
                className="mt-4 w-full bg-white text-amber-700 hover:bg-amber-50"
                asChild
              >
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 size-4" />
                  Hubungi via WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Card className="border-amber-100/60 bg-white/80 backdrop-blur-sm dark:border-amber-900/30 dark:bg-card/80">
              <CardContent className="p-6 sm:p-8">
                {isSubmitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="size-16 text-green-500" />
                    <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-foreground">
                      Terima Kasih!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Pesan Anda telah terkirim. Tim kami akan menghubungi Anda
                      dalam 24 jam.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Masukkan nama Anda"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="nama@email.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+62 812-xxxx-xxxx"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Layanan</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              service: value,
                            }))
                          }
                        >
                          <SelectTrigger className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40">
                            <SelectValue placeholder="Pilih layanan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interior">
                              Desain Interior
                            </SelectItem>
                            <SelectItem value="renovasi">
                              Renovasi Rumah
                            </SelectItem>
                            <SelectItem value="konstruksi">
                              Konstruksi Bangunan
                            </SelectItem>
                            <SelectItem value="konsultasi">
                              Konsultasi Desain
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Perkiraan Anggaran</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, budget: value }))
                        }
                      >
                        <SelectTrigger className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40">
                          <SelectValue placeholder="Pilih range anggaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<50">
                            Di bawah Rp 50 Juta
                          </SelectItem>
                          <SelectItem value="50-100">
                            Rp 50 - 100 Juta
                          </SelectItem>
                          <SelectItem value="100-250">
                            Rp 100 - 250 Juta
                          </SelectItem>
                          <SelectItem value="250-500">
                            Rp 250 - 500 Juta
                          </SelectItem>
                          <SelectItem value=">500">
                            Di atas Rp 500 Juta
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Detail Proyek *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Ceritakan tentang proyek Anda, lokasi, dan kebutuhan spesifik..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-amber-200/60 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-900/40"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 size-4" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Konsultasi awal GRATIS. Kami akan merespon dalam 24 jam
                      kerja.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
