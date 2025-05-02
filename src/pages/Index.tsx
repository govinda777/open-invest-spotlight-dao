
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/sections/FeatureCard';
import HowItWorksStep from '@/components/sections/HowItWorksStep';
import { Button } from '@/components/ui/button';
import { Users, PieChart, Vote, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white to-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                Investing, <span className="text-dao-purple">Together</span>
              </h1>
              <p className="text-xl text-slate-700 mb-8 max-w-lg">
                Open Invest DAO is a decentralized community of investors pooling resources,
                sharing knowledge, and making collective investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-dao-purple hover:bg-dao-darkPurple text-lg px-8 py-6">
                  Join the Community
                </Button>
                <Button variant="outline" className="border-dao-purple text-dao-purple hover:bg-dao-purple/5 text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block bg-dao-purple/5 rounded-3xl p-8 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="space-y-4">
                  <div className="h-4 bg-dao-lightPurple/20 rounded-full w-3/4"></div>
                  <div className="h-4 bg-dao-lightPurple/20 rounded-full"></div>
                  <div className="h-4 bg-dao-lightPurple/20 rounded-full w-5/6"></div>
                  <div className="h-4 bg-dao-lightPurple/20 rounded-full w-2/3"></div>
                  <div className="h-20 bg-dao-lightPurple/20 rounded-xl"></div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-dao-purple text-white">Vote Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Open Invest DAO?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform combines the power of decentralized governance with collective investment strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
              <FeatureCard
                icon={Users}
                title="Community Power"
                description="Join a community of like-minded investors sharing insights and strategies."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <FeatureCard
                icon={PieChart}
                title="Diversified Portfolio"
                description="Access to diverse investment opportunities vetted by the community."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <FeatureCard
                icon={Vote}
                title="Democratic Decisions"
                description="Every member has a voice in investment decisions through voting."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <FeatureCard
                icon={Shield}
                title="Transparent Operations"
                description="All transactions and decisions are recorded on-chain for full transparency."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A simple process to join the DAO and start participating in collective investments.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <HowItWorksStep
              number={1}
              title="Join the DAO"
              description="Sign up and contribute to the community investment pool with a minimum stake."
            />
            <HowItWorksStep
              number={2}
              title="Participate in Governance"
              description="Submit investment proposals or vote on existing ones to shape the portfolio direction."
            />
            <HowItWorksStep
              number={3}
              title="Collective Investment"
              description="When proposals pass, investments are made with the community pool."
            />
            <HowItWorksStep
              number={4}
              title="Share the Returns"
              description="Returns are distributed proportionally to your stake in the DAO."
              isLast
            />
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section id="community" className="py-20 px-6 bg-gradient-to-br from-dao-purple to-dao-darkPurple text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
              <p className="text-white/80 text-lg mb-8">
                Connect with other investors, share insights, and participate in the future of decentralized investing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-white/70">Active Members</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2">$2.5M</div>
                  <div className="text-white/70">Total Invested</div>
                </div>
              </div>
              <Button className="bg-white text-dao-purple hover:bg-white/90 group">
                Join Discord 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white/20"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">Just funded</div>
                    <div className="font-medium">Tech Startup Investment Pool</div>
                  </div>
                  <div className="text-white/80">$125K</div>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white/20"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">New proposal</div>
                    <div className="font-medium">Green Energy Fund</div>
                  </div>
                  <div className="text-white/80">Voting</div>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white/20"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">Return distributed</div>
                    <div className="font-medium">Real Estate Project</div>
                  </div>
                  <div className="text-white/80">+12%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Investing with the Community?</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Join Open Invest DAO today and be part of the future of decentralized collective investing.
          </p>
          <Button className="bg-dao-purple hover:bg-dao-darkPurple text-lg px-8 py-6">
            Join Open Invest DAO
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
