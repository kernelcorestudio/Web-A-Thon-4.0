'use client';

import { useEffect, useRef, type FC, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'bottom';
  delay?: number; // ms
  className?: string;
}

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any pending timer
        if (timerRef.current) clearTimeout(timerRef.current);

        if (entry.isIntersecting) {
          // Entering viewport → reveal with delay
          timerRef.current = setTimeout(() => {
            el.classList.add('scroll-revealed');
          }, delay);
        } else {
          // Leaving viewport → instantly hide again (reverse)
          el.classList.remove('scroll-revealed');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-${direction} ${className}`}
    >
      {children}
    </div>
  );
};
