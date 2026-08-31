import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">

      {/* Latin & Portuguese Motto Header */}
      <div className="mb-6 max-w-2xl px-2">
        <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-[#BF953F]/15 border border-[#BF953F]/40 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FCF6BA]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#FCF6BA] uppercase">
            Portal Litúrgico Paroquial
          </span>
        </div>

        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-sm">
          COR ET UNA UNUM ET ANIMA
        </h2>

        <p className="mt-1 text-xs sm:text-sm font-medium tracking-wider text-[#FDF8F0]/80 uppercase">
          UM SÓ CORAÇÃO UMA SÓ ALMA
        </p>

        {/* Decorative Divider */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#BF953F]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#FCF6BA]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#BF953F]" />
        </div>
      </div>

      {/* Hero Frame - Stylized Metallic Gold CSS Border */}
      <div className="w-full relative group">
        {/* Outer Gold Gradient Border Frame */}
        <div className="p-1 sm:p-1.5 md:p-2 rounded-2xl bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] via-[#B38728] to-[#AA771C] shadow-2xl shadow-[#1A253A]/80 transition-all duration-300">

          {/* Inner Accent Line */}
          <div className="p-1 rounded-[14px] bg-[#1A253A] border border-[#BF953F]/50">

            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[3/2] rounded-xl overflow-hidden bg-[#1A253A]">
              <Image
                src="/images/nossa_senhora_de_fatima.webp"
                alt="Altar da Paróquia Nossa Senhora de Fátima - Liturgia"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
              />

              {/* Subtle Gradient Overlay for visual warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A253A] via-transparent to-[#1A253A]/2" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
