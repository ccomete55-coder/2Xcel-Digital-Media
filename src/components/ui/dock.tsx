import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'motion/react';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

const DEFAULT_MAGNIFICATION = 48;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};
type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};
type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type DocContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};
type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within an DockProvider');
  }
  return context;
}

function Dock({
  children,
  className,
  spring = { mass: 0.2, stiffness: 200, damping: 24 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="mx-2 flex max-w-full justify-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      <motion.div
        onMouseMove={({ clientX }) => {
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={cn(
          'mx-auto flex w-fit items-center gap-3 rounded-full px-4 glass backdrop-blur-md border border-white/10',
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Gig sites and social links"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </div>
  );
}

function DockItem({ children, className, href, target, rel, ...rest }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null as any);

  const { distance, magnification, mouseX, spring } = useDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [36, magnification, 36]
  );

  const width = useSpring(widthTransform, spring);

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      style={{ width, height: width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        'relative inline-flex items-center justify-center shrink-0',
        className
      )}
      tabIndex={0}
      role={href ? undefined : 'button'}
      aria-haspopup={href ? undefined : 'true'}
      {...rest}
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { width, isHovered, itemRef: ref } as any)
      )}
    </Component>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps['isHovered'] as MotionValue<number>;
  const itemRef = restProps['itemRef'] as RefObject<HTMLElement>;
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest) => {
      if (latest === 1 && itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        setCoords({ top: rect.bottom, left: rect.left + rect.width / 2 });
      }
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered, itemRef]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && coords && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed z-[100] w-fit whitespace-pre rounded-md border border-white/10 bg-brand-obsidian/95 dark:bg-brand-obsidian/95 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand-orange shadow-lg pointer-events-none',
            className
          )}
          role="tooltip"
          style={{ top: coords.top, left: coords.left, x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps['width'] as MotionValue<number>;

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
