import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorGeoPages } from "@/data/investorPages";

export default function SouthBayInvestors() {
  return <InvestorPageTemplate page={investorGeoPages.find((p) => p.slug === "south-bay")!} />;
}
