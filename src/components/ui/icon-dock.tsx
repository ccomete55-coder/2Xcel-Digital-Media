import {
  SiFacebook,
  SiFiverr,
  SiUpwork,
  SiFreelancer,
  SiPinterest,
  SiYoutube,
  SiTiktok,
  SiX,
  SiInstagram,
} from 'react-icons/si';
import { Briefcase, Compass } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from './dock';

type DockLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const ICON_CLASS =
  'h-full w-full text-[#229AD6] dark:text-[#229AD6] transition-colors duration-200 group-hover:text-[#E55B2B]';

const gigSites: DockLink[] = [
  {
    title: 'Kuubiik',
    href: 'https://kuubiik.com/',
    icon: <Compass className={ICON_CLASS} />,
  },
  {
    title: 'Fiverr',
    href: 'https://www.fiverr.com/',
    icon: <SiFiverr className={ICON_CLASS} />,
  },
  {
    title: 'PeoplePerHour',
    href: 'https://www.peopleperhour.com/',
    icon: <Briefcase className={ICON_CLASS} />,
  },
  {
    title: 'Freelancer',
    href: 'https://www.freelancer.com/',
    icon: <SiFreelancer className={ICON_CLASS} />,
  },
  {
    title: 'Workana',
    href: 'https://www.workana.com/',
    icon: <Briefcase className={ICON_CLASS} />,
  },
  {
    title: 'Upwork',
    href: 'https://www.upwork.com/',
    icon: <SiUpwork className={ICON_CLASS} />,
  },
];

const socials: DockLink[] = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: <SiFacebook className={ICON_CLASS} />,
  },
  {
    title: 'Pinterest',
    href: 'https://www.pinterest.com/',
    icon: <SiPinterest className={ICON_CLASS} />,
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: <SiYoutube className={ICON_CLASS} />,
  },
  {
    title: 'TikTok',
    href: 'https://www.tiktok.com/',
    icon: <SiTiktok className={ICON_CLASS} />,
  },
  {
    title: 'X',
    href: 'https://x.com/',
    icon: <SiX className={ICON_CLASS} />,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: <SiInstagram className={ICON_CLASS} />,
  },
];

const allLinks = [...gigSites, { title: 'divider', href: '', icon: null }, ...socials];

export function IconDock() {
  return (
    <div className="w-full flex justify-center px-4">
      <Dock>
        {allLinks.map((item, idx) =>
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
        )}
      </Dock>
    </div>
  );
}
