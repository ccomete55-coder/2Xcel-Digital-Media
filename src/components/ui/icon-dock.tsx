import {
  SiFacebook,
  SiUpwork,
  SiYoutube,
  SiX,
  SiInstagram,
  SiYelp,
} from 'react-icons/si';
import { Dock, DockIcon, DockItem, DockLabel } from './dock';

type DockLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const ICON_CLASS =
  'h-full w-full transition-colors duration-200 group-hover:text-brand-orange';

// Official brand colors (source: simple-icons). Applied as the resting
// state so each mark reads correctly at a glance; hover still shifts
// every icon to brand-orange via ICON_CLASS for a consistent interaction.
const BRAND_COLORS = {
  facebook: '#1877F2',
  google: '#4285F4',
  youtube: '#FF0000',
  yelp: '#AF0606',
  x: '#000000',
  instagram: '#E4405F',
  upwork: '#14A800',
} as const;

// Google Business Profile - Map Pin Mark
const GoogleBusinessIcon = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.44 11.6 6.72 11.87a1.1 1.1 0 0 0 1.56 0c.28-.27 6.72-6.62 6.72-11.87C19.5 5.36 16.14 2 12 2Zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"
    />
  </svg>
);

const gigSites: DockLink[] = [
  {
    title: 'Upwork',
    href: 'https://www.upwork.com/',
    icon: <SiUpwork className={ICON_CLASS} style={{ color: BRAND_COLORS.upwork }} />,
  },
];

const socials: DockLink[] = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: <SiFacebook className={ICON_CLASS} style={{ color: BRAND_COLORS.facebook }} />,
  },
  {
    title: 'Google Business Profile',
    href: 'https://www.google.com/business/',
    icon: <GoogleBusinessIcon className={ICON_CLASS} style={{ color: BRAND_COLORS.google }} />,
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: <SiYoutube className={ICON_CLASS} style={{ color: BRAND_COLORS.youtube }} />,
  },
  {
    title: 'Yelp',
    href: 'https://www.yelp.com/',
    icon: <SiYelp className={ICON_CLASS} style={{ color: BRAND_COLORS.yelp }} />,
  },
  {
    title: 'X',
    href: 'https://x.com/',
    // X's own brand guidelines allow the mark to flip white on dark
    // surfaces  true brand black would be invisible on this dock.
    icon: <SiX className={`${ICON_CLASS} text-black dark:text-white`} />,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: <SiInstagram className={ICON_CLASS} style={{ color: BRAND_COLORS.instagram }} />,
  },
];

const allLinks = [...gigSites, { title: 'divider', href: '', icon: null }, ...socials];

// The 3 links kept in the persistent top toolbar  content showcase (IG,
// YouTube) plus a local-trust signal (Google Business). Everything else
// (gig sites, Facebook, Yelp, X) lives in the footer's full dock instead,
// so the fixed top bar doesn't compete with the hero on every scroll position.
const primaryLinks = socials.filter((s) =>
  ['Instagram', 'YouTube', 'Google Business Profile'].includes(s.title)
);

function renderLinks(links: DockLink[]) {
  return links.map((item, idx) =>
    item.title === 'divider' ? (
      <div
        key={`divider-${idx}`}
        className="w-px self-stretch my-2 bg-slate-300/40 dark:bg-white/10"
        aria-hidden="true"
      />
    ) : (
      <DockItem
        key={item.title}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.title}
        className="group rounded-full bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors"
      >
        <DockLabel>{item.title}</DockLabel>
        <DockIcon>{item.icon}</DockIcon>
      </DockItem>
    )
  );
}

export interface IconDockProps {
  /** "primary" = 3 curated social icons for the persistent top toolbar.
   *  "full" = every gig site + social link, for the footer. */
  variant?: 'primary' | 'full';
}

export function IconDock({ variant = 'primary' }: IconDockProps) {
  const links = variant === 'full' ? allLinks : primaryLinks;
  return (
    <div className="w-full flex justify-center px-4">
      <Dock>{renderLinks(links)}</Dock>
    </div>
  );
}
