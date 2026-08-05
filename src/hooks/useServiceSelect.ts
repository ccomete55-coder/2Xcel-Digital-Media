/**
 * Shared "pick this service, then scroll to the inquiry form" behavior used by
 * every pricing/tier CTA across the site (Ad Video Production, Enterprise
 * Strategy, Automations & Workflows, Social Media Tiers, Luna Voice Agents).
 */
export function useServiceSelect(setServiceInterested: (val: string) => void) {
  return (label: string) => {
    setServiceInterested(label);
    document.getElementById("inquiries")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
}
