import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorGeoPages } from "@/data/investorPages";

export default function LongBeachInvestors() {
  return <InvestorPageTemplate page={investorGeoPages.find((p) => p.slug === "long-beach")!} />;
}
