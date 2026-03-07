import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorGeoPages } from "@/data/investorPages";

export default function CulverCityInvestors() {
  return <InvestorPageTemplate page={investorGeoPages.find((p) => p.slug === "culver-city")!} />;
}
