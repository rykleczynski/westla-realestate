import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorGeoPages } from "@/data/investorPages";

export default function VeniceInvestors() {
  return <InvestorPageTemplate page={investorGeoPages.find((p) => p.slug === "venice")!} />;
}
