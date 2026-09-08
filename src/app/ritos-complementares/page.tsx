'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MENU_LIST } from '@/data/ritosData';
import { DynamicIcon } from '@/components/DynamicIcon';
import { MediaRenderer } from '@/components/MediaRenderer';
import { CheckCircle2, ChevronRight, Church, BookOpen, Layers, ArrowLeft, Sparkles } from 'lucide-react';

export default function RitosComplementaresPage() {
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(0);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number>(0);
  const [activeVariationIndex, setActiveVariationIndex] = useState<number>(0);

  const currentItem = MENU_LIST[selectedNavIndex] || MENU_LIST[0];
  const currentSubMenu = currentItem?.navContent?.[activeSubMenuIndex] || currentItem?.navContent?.[0];
  const currentVariation = currentSubMenu?.rightContent?.[activeVariationIndex] || currentSubMenu?.rightContent?.[0];

  const handleSelectNav = (index: number) => {
    setSelectedNavIndex(index);
    setActiveSubMenuIndex(0);
    setActiveVariationIndex(0);
  };

  const handleSelectSubMenu = (index: number) => {
    setActiveSubMenuIndex(index);
    setActiveVariationIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shadow-inner">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif tracking-wide text-amber-400">
                Ritos Complementares & Sacramentais
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Portal Litúrgico • Guia Orientativo dos Ritos e Cerimoniais
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Início</span>
            </Link>
            <Link
              href="/ritos"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ritos da Missa</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Mobile Horizontal Menu (Scrollable) */}
        <div className="md:hidden mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" /> Selecione o Sacramento
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {MENU_LIST.map((item, idx) => {
              const isActive = selectedNavIndex === idx;
              return (
                <button
                  key={item.refContent}
                  onClick={() => handleSelectNav(idx)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${isActive
                    ? 'bg-slate-800 text-white border-l-4 border-amber-500 shadow-sm'
                    : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                    }`}
                >
                  {item.iconName && (
                    <DynamicIcon
                      name={item.iconName}
                      className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`}
                    />
                  )}
                  <span>{item.navButton}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
          {/* Sidebar Fixed Left (Desktop) */}
          <aside className="hidden md:flex md:w-72 flex-shrink-0 bg-[#0F172A] text-white p-5 rounded-2xl shadow-md border border-slate-800 flex-col gap-6 sticky top-20">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3 px-2 flex items-center gap-2">
                <span>❖</span> Sacramentos & Ritos
              </h2>
              <nav className="space-y-1.5">
                {MENU_LIST.map((item, idx) => {
                  const isActive = selectedNavIndex === idx;
                  return (
                    <button
                      key={item.refContent}
                      onClick={() => handleSelectNav(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all cursor-pointer ${isActive
                        ? 'bg-slate-800 text-white border-l-4 border-amber-500 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.iconName && (
                          <DynamicIcon
                            name={item.iconName}
                            className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
                          />
                        )}
                        <span>{item.navButton}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Info Banner */}
            <div className="mt-auto bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Church className="w-4 h-4 text-amber-400" /> Paróquia N. S. de Fátima
              </div>
              <p className="text-slate-400 leading-relaxed">
                Diretrizes pastorais e orientações gerais baseadas no Ritual Romano.
              </p>
            </div>
            {/* Navigation Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <Link
                href="/ritos"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ir para Ritos da Missa</span>
              </Link>
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para o Início</span>
              </Link>
            </div>
          </aside>

          {/* Right Panel Content */}
          <div className="flex-1 w-full space-y-6">
            {/* Header Badge & Title */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                  <DynamicIcon name={currentItem.iconName} className="w-4 h-4 text-amber-600" />
                  <span>{currentItem.navButton}</span>
                </div>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  {currentSubMenu?.menuTitle || currentItem.navButton}
                </h2>
              </div>
            </div>

            {/* Submenu Pills / Tabs */}
            {currentItem.navContent && currentItem.navContent.length > 0 && (
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
                {currentItem.navContent.map((sub, idx) => {
                  const isActive = activeSubMenuIndex === idx;
                  return (
                    <button
                      key={sub.menuTitle}
                      onClick={() => handleSelectSubMenu(idx)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${isActive
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                        }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-slate-400'}`} />
                      {sub.menuTitle}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2-Column Content Grid (Left & Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Column Content */}
              <div className="space-y-6">
                {currentSubMenu?.leftSubTitle && (
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      {currentSubMenu.leftSubTitle}
                    </h3>
                  </div>
                )}

                {currentSubMenu?.leftContent?.map((topic, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      {topic.iconName && (
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={topic.iconName} className="w-5 h-5 text-amber-700" />
                        </div>
                      )}
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {topic.title}
                      </h4>
                    </div>

                    {topic.texts && topic.texts.length > 0 && (
                      <div className="space-y-2">
                        {topic.texts.map((text, tIdx) => (
                          <p key={tIdx} className="text-slate-600 leading-relaxed text-sm">
                            {text}
                          </p>
                        ))}
                      </div>
                    )}

                    {topic.items && topic.items.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {topic.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {topic.media && <MediaRenderer media={topic.media} />}
                  </div>
                ))}
              </div>

              {/* Right Column Content */}
              <div className="space-y-6">
                {currentSubMenu?.rightSubTitle && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      {currentSubMenu.rightSubTitle}
                    </h3>
                  </div>
                )}

                {/* Rite Variation Selector Tabs (if multiple variations) */}
                {currentSubMenu?.rightContent && currentSubMenu.rightContent.length > 1 && (
                  <div className="bg-slate-200/60 p-1.5 rounded-xl flex gap-1.5 overflow-x-auto">
                    {currentSubMenu.rightContent.map((varItem, vIdx) => {
                      const isActive = activeVariationIndex === vIdx;
                      return (
                        <button
                          key={varItem.variationTitle}
                          onClick={() => setActiveVariationIndex(vIdx)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                            ? 'bg-amber-600 text-white shadow-sm font-semibold'
                            : 'bg-transparent text-slate-600 hover:bg-slate-200/80 font-medium'
                            }`}
                        >
                          {varItem.variationTitle}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Right Variation Sections */}
                {currentVariation?.sections?.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      {sec.iconName && (
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={sec.iconName} className="w-5 h-5 text-slate-800" />
                        </div>
                      )}
                      <div>
                        {sec.title && (
                          <h4 className="text-base font-bold text-slate-900 font-serif">
                            {sec.title}
                          </h4>
                        )}
                        {sec.subTitle && (
                          <p className="text-xs font-semibold text-amber-700">
                            {sec.subTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {sec.texts && sec.texts.length > 0 && (
                      <div className="space-y-2">
                        {sec.texts.map((t, tIdx) => (
                          <p key={tIdx} className="text-slate-600 leading-relaxed text-sm">
                            {t}
                          </p>
                        ))}
                      </div>
                    )}

                    {sec.items && sec.items.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {sec.items.map((it, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.media && <MediaRenderer media={sec.media} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
