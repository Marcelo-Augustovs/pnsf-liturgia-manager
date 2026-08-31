import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CardItem } from "@/types/cardItem";

interface GridCardsProps {
  cardsData: CardItem[];
}

export default function GridCards({ cardsData }: GridCardsProps) {
  console.log("cardsData:", cardsData);

  return (
    <section className="w-full bg-[#FDF8F0] py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-[#BF953F]/30">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#1A253A] uppercase">
            Recursos & Atividades
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-[1px] w-10 bg-[#BF953F]" />
            <div className="w-2 h-2 rotate-45 bg-[#BF953F]" />
            <div className="h-[1px] w-10 bg-[#BF953F]" />
          </div>
          <p className="mt-2 text-sm text-[#1A253A]/80 max-w-xl mx-auto font-medium">
            Explore as seções da nossa pastoral litúrgica e aprofunde-se na celebração sagrada.
          </p>
        </div>

        {/* Grid Responsive: 1 col (mobile), 2 col (tablet), 5 col (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardsData.map((card) => (
            <article
              key={card.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#BF953F]/30 flex flex-col overflow-hidden transform hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-50 overflow-hidden bg-[#1A253A]">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A253A]/70 via-transparent to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FDF8F0]/40">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1A253A] group-hover:text-[#BF953F] transition-colors uppercase tracking-wide">
                    {card.title}
                  </h3>

                  <div className="w-8 h-[2px] bg-[#BF953F] my-2 group-hover:w-14 transition-all duration-300" />

                  <p className="text-xs text-[#1A253A]/75 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Card Button */}
                <div className="mt-5 pt-3 border-t border-[#BF953F]/15">
                  {card.pageReference ? (
                    <Link
                      href={card.pageReference}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider text-[#1A253A] bg-[#FDF8F0] border border-[#BF953F]/60 rounded-lg group-hover:bg-[#1A253A] group-hover:text-[#FCF6BA] group-hover:border-[#1A253A] transition-all duration-300 shadow-sm"
                    >
                      <span>MAIS INFORMAÇÕES</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider text-slate-400 bg-slate-100 border border-slate-300 rounded-lg cursor-not-allowed opacity-60 shadow-sm"
                    >
                      <span>MAIS INFORMAÇÕES</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

