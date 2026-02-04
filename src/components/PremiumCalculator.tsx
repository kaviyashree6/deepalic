import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const planTypes = [
  { value: "term", label: "Term Insurance", baseRate: 0.003 },
  { value: "endowment", label: "Endowment Plan", baseRate: 0.045 },
  { value: "moneyback", label: "Money Back Plan", baseRate: 0.048 },
  { value: "ulip", label: "ULIP", baseRate: 0.035 },
  { value: "pension", label: "Pension Plan", baseRate: 0.055 },
  { value: "wholelife", label: "Whole Life Plan", baseRate: 0.042 },
  { value: "child", label: "Children Plan", baseRate: 0.05 },
];

const policyTerms = [10, 15, 20, 25, 30, 35];
const paymentModes = [
  { value: "yearly", label: "Yearly", factor: 1 },
  { value: "halfyearly", label: "Half-Yearly", factor: 0.51 },
  { value: "quarterly", label: "Quarterly", factor: 0.26 },
  { value: "monthly", label: "Monthly", factor: 0.09 },
];

export function PremiumCalculator() {
  const [age, setAge] = useState<string>("30");
  const [sumAssured, setSumAssured] = useState<string>("1000000");
  const [planType, setPlanType] = useState<string>("endowment");
  const [policyTerm, setPolicyTerm] = useState<string>("20");
  const [paymentMode, setPaymentMode] = useState<string>("yearly");
  const [premium, setPremium] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculatePremium = () => {
    const ageNum = parseInt(age);
    const sumNum = parseInt(sumAssured);
    const termNum = parseInt(policyTerm);

    const selectedPlan = planTypes.find((p) => p.value === planType);
    const selectedMode = paymentModes.find((m) => m.value === paymentMode);

    if (!selectedPlan || !selectedMode || isNaN(ageNum) || isNaN(sumNum)) {
      return;
    }

    // Age factor: higher age = higher premium
    const ageFactor = 1 + (ageNum - 25) * 0.015;

    // Term factor: longer term = slightly lower per-year premium
    const termFactor = 1 - (termNum - 10) * 0.005;

    // Base premium calculation
    let basePremium =
      sumNum * selectedPlan.baseRate * ageFactor * termFactor;

    // Adjust for payment mode
    basePremium = basePremium * selectedMode.factor;

    // Add GST (4.5%)
    basePremium = basePremium * 1.045;

    setPremium(Math.round(basePremium));
    setShowResult(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mx-auto">Premium Calculator</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Get an estimated premium for your LIC insurance plan. This is an
            indicative calculation - contact us for exact quotes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-accent" />
                Calculate Your Premium
              </CardTitle>
              <CardDescription>
                Enter your details to get an estimated premium amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Your Age (Years)</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="65"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sumAssured">Sum Assured (₹)</Label>
                    <Input
                      id="sumAssured"
                      type="number"
                      min="100000"
                      step="100000"
                      value={sumAssured}
                      onChange={(e) => setSumAssured(e.target.value)}
                      placeholder="Enter sum assured"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Type</Label>
                    <Select value={planType} onValueChange={setPlanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {planTypes.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value}>
                            {plan.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Policy Term (Years)</Label>
                    <Select value={policyTerm} onValueChange={setPolicyTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy term" />
                      </SelectTrigger>
                      <SelectContent>
                        {policyTerms.map((term) => (
                          <SelectItem key={term} value={term.toString()}>
                            {term} Years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Mode</Label>
                    <Select value={paymentMode} onValueChange={setPaymentMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={calculatePremium}
                    className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Premium
                  </Button>
                </div>
              </div>

              {showResult && premium && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Estimated {paymentModes.find((m) => m.value === paymentMode)?.label} Premium
                    </p>
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-accent">
                      <IndianRupee className="w-8 h-8" />
                      {formatCurrency(premium).replace("₹", "")}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      *Inclusive of 4.5% GST. This is an indicative premium. Actual
                      premium may vary based on underwriting.
                    </p>
                    <Button
                      asChild
                      className="mt-4 bg-primary hover:bg-primary/90"
                    >
                      <a href="#contact">Get Exact Quote</a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
