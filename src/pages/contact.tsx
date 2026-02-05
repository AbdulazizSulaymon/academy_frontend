import React, { ReactElement, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
  CheckCircle,
  Video,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/card';
import { NextPageWithLayout } from '@/types';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '@/components/ui/button';
import { message } from 'antd';
import { Input, TextArea } from '@/components/ui/input';

const ContactPage: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: t('Email') || 'Email',
      value: 'support@osonsotuv.uz',
      link: 'mailto:support@osonsotuv.uz',
      gradient: 'from-blue-500/10 to-blue-600/10',
      iconColor: 'text-blue-600',
    },
    {
      icon: Phone,
      title: t('Telefon') || 'Telefon',
      value: '+998 90 123 45 67',
      link: 'tel:+998901234567',
      gradient: 'from-green-500/10 to-green-600/10',
      iconColor: 'text-green-600',
    },
    {
      icon: MapPin,
      title: t('Manzil') || 'Manzil',
      value: t('Toshkent sh, O\'zbekiston') || 'Toshkent sh, O\'zbekiston',
      link: 'https://maps.google.com',
      gradient: 'from-red-500/10 to-red-600/10',
      iconColor: 'text-red-600',
    },
    {
      icon: Clock,
      title: t('Ish vaqti') || 'Ish vaqti',
      value: t('Dushanba - Juma: 9:00 - 18:00') || 'Dushanba - Juma: 9:00 - 18:00',
      link: null,
      gradient: 'from-purple-500/10 to-purple-600/10',
      iconColor: 'text-purple-600',
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      href: 'https://facebook.com/osonsotuv',
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/osonsotuv',
      gradient: 'from-pink-600 to-purple-600',
    },
    {
      icon: Send,
      name: 'Telegram',
      href: 'https://t.me/osonsotuv',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Video,
      name: 'YouTube',
      href: 'https://youtube.com/@osonsotuv',
      gradient: 'from-red-600 to-red-700',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      message.warning(t("Iltimos, barcha maydonlarni to'ldiring") || "Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      message.success(t("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz") || "Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-600/20 mb-4">
          <MessageSquare className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t('Biz bilan bog\'lanish') || 'Biz bilan bog\'lanish'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t(
            'Savollaringiz bormi? Biz bilan bog\'laning va tez orada javob olasiz.',
          ) || 'Savollaringiz bormi? Biz bilan bog\'laning va tez orada javob olasiz.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-600/10">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('Xabar yuborish') || 'Xabar yuborish'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Ism') || 'Ism'} *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('Imingizni kiriting') || 'Imingizni kiriting'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Email') || 'Email'} *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('Email manzilingizni kiriting') || 'Email manzilingizni kiriting'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Mavzu') || 'Mavzu'} *
              </label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('Mavzuni kiriting') || 'Mavzuni kiriting'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Xabar') || 'Xabar'} *
              </label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('Xabaringizni yozing...') || 'Xabaringizni yozing...'}
                rows={6}
                required
              />
            </div>

            <PrimaryButton
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (t('Yuborilmoqda...') || 'Yuborilmoqda...') : (t('Yuborish') || 'Yuborish')}
              <Send className="w-5 h-5" />
            </PrimaryButton>
          </form>
        </GlassCard>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${info.gradient}`}>
                    <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Social Media */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {t('Ijtimoiy tarmoqlar') || 'Ijtimoiy tarmoqlar'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${social.gradient} text-white hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <social.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Quick FAQ */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {t('Tez-tez so\'raladigan savollar') || 'Tez-tez so\'raladigan savollar'}
            </h3>
            <div className="space-y-3">
              {[
                (t('Qanday qilib kursga yozilish mumkin?') || 'Qanday qilib kursga yozilish mumkin?'),
                (t('To\'lov qanday usullarda qabul qilinadi?') || 'To\'lov qanday usullarda qabul qilinadi?'),
                (t('Kursni qaytarish mumkinmi?') || 'Kursni qaytarish mumkinmi?'),
              ].map((faq, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{faq}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Map Section */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Manzilimiz') || 'Manzilimiz'}
          </h2>
        </div>
        <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {t('Toshkent, O\'zbekiston') || 'Toshkent, O\'zbekiston'}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ContactPage;
