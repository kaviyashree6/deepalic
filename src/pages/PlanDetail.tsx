import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Info, Users, Calendar, IndianRupee } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getPlanCategory } from "@/data/insurancePlansData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const PlanDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? getPlanCategory(categoryId) : undefined;

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Plan Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The insurance plan category you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/#insurance">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insurance Plans
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container">
            <Link
              to="/#insurance"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Plans
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                {category.name}
              </h1>
              <p className="text-xl text-accent font-medium mb-4">
                {category.tagline}
              </p>
              <p className="text-primary-foreground/80 text-lg">
                {category.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans Overview */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              Available Plans
            </h2>
            
            <Tabs defaultValue={category.plans[0]?.name} className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-secondary p-2 mb-8">
                {category.plans.map((plan) => (
                  <TabsTrigger
                    key={plan.name}
                    value={plan.name}
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    {plan.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {category.plans.map((plan) => (
                <TabsContent key={plan.name} value={plan.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-custom mb-8">
                      <CardHeader>
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div>
                            <CardTitle className="text-2xl text-foreground">
                              {plan.name}
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                              {plan.planNumber !== "Online" && (
                                <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm mr-2">
                                  Plan No. {plan.planNumber}
                                </span>
                              )}
                              {plan.description}
                            </CardDescription>
                          </div>
                          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <a href="#contact">Get Quote</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                            <Users className="w-5 h-5 text-accent" />
                            <div>
                              <p className="text-sm text-muted-foreground">Entry Age</p>
                              <p className="font-semibold text-foreground">{plan.minAge}-{plan.maxAge} years</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                            <Calendar className="w-5 h-5 text-accent" />
                            <div>
                              <p className="text-sm text-muted-foreground">Policy Term</p>
                              <p className="font-semibold text-foreground">
                                {plan.minTerm === plan.maxTerm 
                                  ? `${plan.minTerm} years` 
                                  : `${plan.minTerm}-${plan.maxTerm} years`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                            <IndianRupee className="w-5 h-5 text-accent" />
                            <div>
                              <p className="text-sm text-muted-foreground">Min Sum Assured</p>
                              <p className="font-semibold text-foreground">
                                ₹{(plan.minSumAssured / 100000).toFixed(1)} Lakh
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                            <Info className="w-5 h-5 text-accent" />
                            <div>
                              <p className="text-sm text-muted-foreground">Plan Type</p>
                              <p className="font-semibold text-foreground">{category.name.replace(" Plans", "")}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Features */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">Key Features</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          {/* Benefits */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {plan.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          {/* Eligibility */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">Eligibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {plan.eligibility.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              Plan Comparison
            </h2>
            <Card className="shadow-custom overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary">
                      <TableHead className="text-primary-foreground font-semibold">Feature</TableHead>
                      {category.plans.map((plan) => (
                        <TableHead key={plan.name} className="text-primary-foreground font-semibold text-center">
                          {plan.name.replace("LIC ", "")}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Plan Number</TableCell>
                      {category.plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center">
                          {plan.planNumber}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Entry Age</TableCell>
                      {category.plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center">
                          {plan.minAge}-{plan.maxAge} years
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Policy Term</TableCell>
                      {category.plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center">
                          {plan.minTerm === plan.maxTerm 
                            ? `${plan.minTerm} years` 
                            : `${plan.minTerm}-${plan.maxTerm} years`}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Min Sum Assured</TableCell>
                      {category.plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center">
                          ₹{(plan.minSumAssured / 100000).toFixed(1)}L
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Key Highlight</TableCell>
                      {category.plans.map((plan) => (
                        <TableCell key={plan.name} className="text-center text-sm">
                          {plan.features[0]}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent">
          <div className="container text-center">
            <h2 className="text-3xl font-display font-bold text-accent-foreground mb-4">
              Need Help Choosing the Right Plan?
            </h2>
            <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
              I'm here to help you find the perfect insurance plan based on your needs, 
              goals, and budget. Get personalized recommendations today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="/#contact">Get Free Consultation</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <a href="/#calculator">Calculate Premium</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PlanDetail;
