
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Vote, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Transparent & Secure",
    description: "All investments and decisions are recorded on blockchain for complete transparency and security."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Decisions are made collectively by DAO members through democratic voting processes."
  },
  {
    icon: TrendingUp,
    title: "High-Quality Projects",
    description: "Carefully vetted projects with strong potential and alignment with DAO values."
  },
  {
    icon: Vote,
    title: "Governance Rights",
    description: "Participate in key decisions about project selection, fund allocation, and platform development."
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Streamlined processes for quick project evaluation and fund deployment."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Open to investors and projects worldwide, breaking down traditional barriers."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Open Invest DAO?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of investment with our decentralized, transparent, and community-driven platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
