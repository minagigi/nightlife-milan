'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Shirt, Music, MessageCircle, Star, Calendar, ArrowLeft, ShieldCheck, Check, CreditCard } from 'lucide-react';
import { Dictionary } from '@/lib/get-dictionary';

export default function JustMeClientView({ dict, locale }: { dict: Dictionary, locale: string }) {
  const waLink = "https://wa.me/393000000000?text=Hi,%20I'd%20like%20to%20book%20VIP%20access%20at%20Just%20Me%20Milano";

  const servicesTags = dict.labels.services.split(',').map(s => s.trim());

  return (
    <main className="bg-[#131009] min-h-screen text-white font-sans selection:bg-champagne selection:text-white pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/just-me-milano.webp"
            alt="Just Me Milano"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/60 to-black/30" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <Link href={`/${locale}/clubs`} className="inline-flex items-center text-white/50 hover:text-champagne transition-colors mb-8 text-sm uppercase tracking-wider font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dict.labels.back}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-champagne/20 border border-champagne/50 text-champagne text-xs uppercase tracking-widest rounded-sm flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  OFFICIAL PARTNER
                </span>
                <span className="px-3 py-1 border border-white/20 text-white/70 text-xs uppercase tracking-widest rounded-full">
                  CLUB & RESTAURANT
                </span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                Just Me <span className="text-champagne">Milano</span>
              </h1>
            </div>
            
            <div className="shrink-0">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-champagne text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-sm">
                <MessageCircle className="w-5 h-5 mr-2" />
                {dict.labels.vipAccess}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* QuickInfoBar (4 Info Blocks) */}
      <section className="border-y border-white/10 bg-[#131009]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            <div className="flex flex-col px-4 first:pl-0">
              <MapPin className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{dict.labels.address}</span>
              <span className="text-sm font-medium text-white/80">Viale Luigi Camoens 2</span>
            </div>
            <div className="flex flex-col px-4">
              <Clock className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{dict.labels.targetAge}</span>
              <span className="text-sm font-medium text-white/80">25-45</span>
            </div>
            <div className="flex flex-col px-4">
              <Shirt className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{dict.labels.dressCode}</span>
              <span className="text-sm font-medium text-white/80">Elegante / Smart Casual</span>
            </div>
            <div className="flex flex-col px-4">
              <Music className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{dict.labels.music}</span>
              <span className="text-sm font-medium text-white/80">House, Hip-Hop, Hits</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Descrizione & Tags */}
          <section>
            <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
              {dict.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {servicesTags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-transparent border border-champagne/30 text-champagne text-xs uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Weekly Schedule (Event Component) */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-champagne" />
              {dict.labels.weeklyProgram}
            </h2>
            <div className="space-y-4">
              {dict.events.map((event, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={idx} 
                  className="p-6 bg-white/[0.03] border border-white/10 rounded-xl hover:border-champagne/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-champagne/10 border border-champagne/30 shrink-0">
                      <span className="text-champagne font-bold text-lg leading-none">{event.day}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <span className="px-2 py-0.5 bg-white/[0.08] text-white/70 text-[10px] uppercase tracking-widest rounded-sm border border-white/20">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm">{event.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <a 
                      href={`https://wa.me/393000000000?text=Hi,%20I'd%20like%20to%20book%20for%20${event.title}%20(${event.day})%20at%20Just%20Me%20Milano`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-sm hover:bg-[#25D366] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider w-full md:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {dict.labels.bookWa}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="sticky top-32 space-y-8">
            
            {/* VIP Booking Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] border border-champagne/30 rounded-lg p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-champagne to-yellow-200" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">VIP Booking</h3>
              <p className="text-white/50 text-sm mb-6">Assicurati l&apos;accesso prioritario e i migliori tavoli del locale.</p>
              
              <div className="space-y-4">
                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-4 bg-[#25D366] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#20bd5a] transition-colors rounded-sm shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {dict.labels.bookWa}
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </main>
  );
}
