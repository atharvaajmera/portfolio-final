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
  githubLink,
  demoLink,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  githubLink?: string;
  demoLink?: string;
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
      <div className="transition duration-200">
        <div className="mb-2 text-white group-hover/bento:text-teal-400 transition-colors">
          {icon}
        </div>
        <div className="mb-2 font-sans text-xl font-bold text-[#E1E1E1]">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-white mb-3">
          {description}
        </div>
        {(githubLink || demoLink) && (
          <div className="flex gap-3 mt-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

