import React from 'react';

const cn = (...classes: Array<string | undefined | null | false>): string =>
  classes.filter((c): c is string => Boolean(c)).join(' ');

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-end space-y-4 rounded-xl border border-white/10 bg-[#111111] p-6 transition duration-200 hover:bg-white/5",
        className,
      )}
    >
      {header && (
        <div className="flex-1 min-h-[140px] w-full rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 mb-4 border border-white/5">
          {header}
        </div>
      )}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        <div className="mb-2 text-neutral-400 group-hover/bento:text-teal-400 transition-colors">
          {icon}
        </div>
        <div className="mb-2 font-sans text-xl font-bold text-[#E1E1E1]">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-[#A1A1AA]">
          {description}
        </div>
      </div>
    </div>
  );
};

