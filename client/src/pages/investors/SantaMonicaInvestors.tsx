import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorGeoPages } from "@/data/investorPages";

export default function SantaMonicaInvestors() {
  return <InvestorPageTemplate page={investorGeoPages.find((p) => p.slug === "santa-monica")!} />;
}
