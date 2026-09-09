import { Phone, MapPin, Mail, Clock, Cross } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A253A] text-[#FDF8F0] relative overflow-hidden">

      {/* Fine Metallic Gold Gradient Top Divider Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#BF953F] to-transparent shadow-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Responsive Grid: 1 column on mobile (centered), 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Column 1: Parish Brand & Motto */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] p-[1.5px] shadow-md">
                <div className="w-full h-full bg-[#1A253A] rounded-full flex items-center justify-center">
                  <img
                    src="/images/brasao_paroquia.webp"
                    alt="brasao da paroquia"
                    className="w-full h-full object-contain -translate-x-[-2px]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl tracking-wider text-[#FCF6BA]">
                  PNS FÁTIMA
                </span>
                <span className="text-[11px] tracking-widest text-[#BF953F] uppercase">
                  Paróquia N. Sra. de Fátima
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FDF8F0]/80 leading-relaxed max-w-sm">
              Servindo à comunidade com fé, devoção e excelência na celebração litúrgica. Um só coração e uma só alma no amor de Cristo.
            </p>

            <div className="pt-2 text-[11px] font-serif text-[#BF953F] tracking-widest uppercase">
              “Cor et Una Unum et Anima”
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="font-serif font-bold text-base text-[#FCF6BA] uppercase tracking-wider border-b border-[#BF953F]/30 pb-1.5 w-fit">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-xs text-[#FDF8F0]/80">
              <li>
                <Link href="#" className="hover:text-[#FCF6BA] transition-colors">
                  Horários de Missa
                </Link>
              </li>
              <li>
                <Link href="#atividades" className="hover:text-[#FCF6BA] transition-colors">
                  Guia dos Ritos Litúrgicos
                </Link>
              </li>
              <li>
                <Link href="#paginas" className="hover:text-[#FCF6BA] transition-colors">
                  Pastoral da Música Sacra
                </Link>
              </li>
              <li>
                <Link href="#contato" className="hover:text-[#FCF6BA] transition-colors">
                  Sacristia e Intentório
                </Link>
              </li>
              <li>
                <Link href="#doe" className="hover:text-[#FCF6BA] transition-colors">
                  Contribuições e Dízimo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-serif font-bold text-base text-[#FCF6BA] uppercase tracking-wider border-b border-[#BF953F]/30 pb-1.5 w-fit">
              Atendimento & Contato
            </h3>

            <div className="space-y-3 text-xs text-[#FDF8F0]/90">
              <div className="flex items-center md:items-start gap-3 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#BF953F] shrink-0 mt-0.5" />
                <span>Avenida Darcy Bittencourt Costa, 150, Olaria - RJ</span>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#BF953F] shrink-0" />
                <span>(21) 99118-9166</span>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#BF953F] shrink-0" />
                <span>contato@pnsfatima.org.br</span>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="w-4 h-4 text-[#BF953F] shrink-0" />
                <span>Seg a Sex: 08h - 18h | Sáb: 08h - 12h</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#BF953F]/20 text-center text-xs text-[#FDF8F0]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Paróquia Nossa Senhora de Fátima. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#BF953F]">Liturgia Mobile — Excelência Eclesiástica</p>
        </div>

      </div>
    </footer>
  );
}
