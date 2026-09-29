'use client';

import React from 'react';

export const ModuleSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-7 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-6 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D8BE]/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E5D8BE]/60 flex-shrink-0" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-48 bg-[#E5D8BE]/70 rounded-md" />
              <div className="h-4 w-24 bg-[#DDBB70]/30 rounded-full" />
            </div>
            <div className="h-3.5 w-72 bg-[#E5D8BE]/40 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-44 bg-[#17243A]/10 rounded-full flex-shrink-0" />
      </div>

      {/* SEARCH / FILTERS BAR SKELETON */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8F4EC] p-3 rounded-2xl border border-[#E5D8BE]/70">
        <div className="h-9 w-full sm:w-72 bg-[#E5D8BE]/40 rounded-xl" />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="h-8 w-16 bg-[#E5D8BE]/50 rounded-full" />
          <div className="h-8 w-20 bg-[#E5D8BE]/50 rounded-full" />
          <div className="h-8 w-24 bg-[#E5D8BE]/50 rounded-full" />
        </div>
      </div>

      {/* CARDS LIST SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/90 border border-[#E5D8BE]/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-[#17243A]/15 rounded-full" />
                  <div className="h-4 w-20 bg-[#E5D8BE]/60 rounded-full" />
                </div>
                <div className="h-5 w-56 bg-[#E5D8BE]/70 rounded-md" />
              </div>
              <div className="h-6 w-24 bg-[#DDBB70]/30 rounded-full" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-[#E5D8BE]/40 rounded" />
              <div className="h-3 w-1/2 bg-[#E5D8BE]/30 rounded" />
            </div>

            <div className="h-10 bg-[#FAF7F0] rounded-xl border border-[#E5D8BE]/40" />

            <div className="pt-2 border-t border-[#E5D8BE]/40 flex items-center justify-between">
              <div className="h-3 w-28 bg-[#E5D8BE]/40 rounded" />
              <div className="h-8 w-24 bg-[#E5D8BE]/50 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
