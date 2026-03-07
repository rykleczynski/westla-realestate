import InvestorPageTemplate from "@/components/investors/InvestorPageTemplate";
import { investorPages } from "@/data/investorPages";

export default function MultifamilyLosAngeles() {
  return <InvestorPageTemplate page={investorPages["multifamily-investment-los-angeles"]} />;
}
