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
  MessageCircle,
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

const WHATSAPP_NUMBER = '6283862295779';

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp',
    detail: '+62 838-6229-5779',
    sub: 'Respon cepat setiap hari',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'derrycp37@gmail.com',
    sub: 'Respon dalam 24 jam',
  },
  {
    icon: MapPin,
    title: 'Alamat',
    detail: 'Bandung, Jawa Barat',
    sub: 'Indonesia',
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

    // Build WhatsApp message
    const serviceLabels: Record<string, string> = {
      interior: 'Desain Interior',
      renovasi: 'Renovasi Rumah',
      konstruksi: 'Konstruksi Bangunan',
      konsultasi: 'Konsultasi Desain',
    };

    const budgetLabels: Record<string, string> = {
      '<50': 'Di bawah Rp 50 Juta',
      '50-100': 'Rp 50 - 100 Juta',
      '100-250': 'Rp 100 - 250 Juta',
      '250-500': 'Rp 250 - 500 Juta',
      '>500': 'Di atas Rp 500 Juta',
    };

    const waMessage = `Halo, saya tertarik dengan jasa desain interior & bangunan Anda.

*Nama:* ${formData.name}
*Email:* ${formData.email}${formData.phone ? `\n*Telepon:* ${formData.phone}` : ''}${formData.service ? `\n*Layanan:* ${serviceLabels[formData.service] || formData.service}` : ''}${formData.budget ? `\n*Anggaran:* ${budgetLabels[formData.budget] || formData.budget}` : ''}

*Detail Proyek:*
${formData.message}

Terima kasih!`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Reset form after a bit
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      id="kontak"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white to-neutral-50/50 py-20 dark:from-background dark:to-neutral-950/20 sm:py-28"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-80 rounded-full bg-neutral-200/30 dark:bg-neutral-800/10" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-neutral-200/20 dark:bg-neutral-800/5" />
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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-600 dark:text-gold-400">
            <MessageCircle className="size-3.5" />
            Hubungi Kami
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Konsultasi Gratis
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Isi form di bawah dan langsung terhubung ke WhatsApp kami
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
                  className="border-gold-100/60 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gold-900/30 dark:bg-card/60"
                >
                  <CardContent className="flex items-start gap-4 pt-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-gold-500 dark:bg-neutral-800 dark:text-gold-400">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm font-medium text-gold-600 dark:text-gold-400">
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
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 text-white shadow-lg dark:from-neutral-700 dark:to-neutral-800">
              <h3 className="font-[var(--font-playfair)] text-lg font-bold">
                Chat via WhatsApp
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                Dapatkan respon cepat langsung dari kami
              </p>
              <Button
                className="mt-4 w-full bg-gold-500 text-neutral-900 hover:bg-gold-400 dark:bg-gold-500 dark:text-neutral-900 dark:hover:bg-gold-400 font-semibold"
                asChild
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
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
            <Card className="border-gold-100/60 bg-white/80 backdrop-blur-sm dark:border-gold-900/30 dark:bg-card/80">
              <CardContent className="p-6 sm:p-8">
                {isSubmitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="size-16 text-gold-500" />
                    <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-foreground">
                      Terima Kasih!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Anda akan diarahkan ke WhatsApp. Tim kami siap membantu Anda!
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
                          className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="nama@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. Telepon / WhatsApp</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+62 838-xxxx-xxxx"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40"
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
                          <SelectTrigger className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40">
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
                        <SelectTrigger className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40">
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
                        className="border-neutral-200/60 focus:border-gold-400 focus:ring-gold-400 dark:border-neutral-700/40"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gold-500 text-neutral-900 hover:bg-gold-600 dark:bg-gold-500 dark:text-neutral-900 dark:hover:bg-gold-400 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Mengarahkan...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="mr-2 size-4" />
                          Kirim via WhatsApp
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Klik tombol di atas untuk langsung terhubung ke WhatsApp kami
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
