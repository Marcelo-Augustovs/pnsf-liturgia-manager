import { CardItem } from "../types/cardItem";

export const CARDS_DATA: CardItem[] = [
    {
        id: "ritos",
        title: "GUIA DOS RITOS",
        description: "Instruções e rubricas litúrgicas para a celebração solene e digna da Santa Missa.",
        imageUrl: "/images/missal.webp",
        pageReference: "/ritos"
    },
    {
        id: "capela",
        title: "CAPELA MUSICAL",
        description: "Repertório sacro, partituras e orientações para o coral e salmistas paroquiais.",
        imageUrl: "/images/capela.webp"
    },
    {
        id: "sacristia",
        title: "SACRISTIA",
        description: "Organização das alfaias, vasos sagrados e paramentos das cores litúrgicas.",
        imageUrl: "/images/sacristia.webp"
    },
    {
        id: "complementares",
        title: "RITOS COMPLEMENTARES",
        description: "Bênçãos solenes, procissões, adoração eucarística e ritos da Semana Santa.",
        imageUrl: "/images/ritos.webp",
        pageReference: "/ritos-complementares"
    },
    {
        id: "devocionais",
        title: "ATOS DEVOCIONAIS",
        description: "Oração do Santo Terço, novenas, via-sacra e devoções da nossa comunidade.",
        imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop",
    },
];