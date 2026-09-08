import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className = 'w-5 h-5', size }: DynamicIconProps) {
  if (!name) return null;

  // Safely look up icon by string name in lucide-react exports
  const iconLookup = Icons as Record<string, unknown>;
  const IconComponent = iconLookup[name] as React.ComponentType<{ className?: string; size?: number }> | undefined;

  if (!IconComponent || typeof IconComponent !== 'function' && typeof IconComponent !== 'object') {
    const Fallback = Icons.BookOpen;
    return <Fallback className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
