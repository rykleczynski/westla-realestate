import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorPages } from "@/data/investorPages";

export default function LosAngelesInvestors() {
  return <InvestorPageTemplate page={investorPages["los-angeles"]} />;
}
