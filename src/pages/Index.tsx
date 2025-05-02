import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/sections/FeatureCard';
import HowItWorksStep from '@/components/sections/HowItWorksStep';
import { Button } from '@/components/ui/button';
import { Users, PieChart, Vote, Shield, ArrowRight, Briefcase, Trophy, BarChart, BookOpen } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import defiFundamentals from '@/assets/svg/defi-fundamentals.svg';
import investmentStrategies from '@/assets/svg/investment-strategies.svg';
import defaultAvatar from '@/assets/svg/default-avatar.svg';

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
                sharing knowledge, and making collective investment decisions through blockchain technology.
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

      {/* Vision and Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision & Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 text-left">
            <div className="bg-dao-purple/5 p-8 rounded-2xl border border-dao-purple/20">
              <h3 className="text-xl font-bold text-dao-purple mb-4">Vision</h3>
              <p className="text-slate-700">
                To be the principal decentralized platform for collaborative investments, 
                promoting inclusion, transparency, and efficiency in the digital financial ecosystem.
              </p>
            </div>
            <div className="bg-dao-purple/5 p-8 rounded-2xl border border-dao-purple/20">
              <h3 className="text-xl font-bold text-dao-purple mb-4">Mission</h3>
              <p className="text-slate-700">
                Empower investors through participatory governance, secure information sharing, 
                and automated execution of investment decisions, aligning interests and optimizing 
                results for all members.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Open Invest DAO?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform combines the power of decentralized governance with collective investment strategies 
              to create a more inclusive and transparent financial ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
              <FeatureCard
                icon={Users}
                title="Community Power"
                description="Join a community of like-minded investors sharing insights and strategies for better investment decisions."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <FeatureCard
                icon={PieChart}
                title="Diversified Portfolio"
                description="Access to diverse investment opportunities vetted by the community across DeFi, staking, and traditional assets."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <FeatureCard
                icon={Vote}
                title="Democratic Decisions"
                description="Every member has a voice in investment decisions through voting weight proportional to their stake."
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <FeatureCard
                icon={Shield}
                title="Transparent Operations"
                description="All transactions and decisions are recorded on-chain for full transparency and auditability."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Strategies Section */}
      <section id="investment-strategies" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Strategies</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our DAO deploys capital across multiple strategies to optimize returns while managing risk through diversification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-dao-purple/10 p-3 rounded-lg">
                  <Briefcase className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">HODL Portfolio</h3>
              </div>
              <p className="text-slate-600 mb-6">Long-term holdings of established cryptocurrencies with strong fundamentals and market presence.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bitcoin</span>
                  <span className="text-dao-purple">40%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-dao-purple h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Ethereum</span>
                  <span className="text-dao-purple">30%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-dao-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Solana</span>
                  <span className="text-dao-purple">20%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-dao-purple h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Other Blue Chips</span>
                  <span className="text-dao-purple">10%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-dao-purple h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-dao-purple/10 p-3 rounded-lg">
                  <BarChart className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">DeFi Strategies</h3>
              </div>
              <p className="text-slate-600 mb-6">Active yield generation through various decentralized finance protocols and instruments.</p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Protocol Examples</TableHead>
                    <TableHead className="text-right">Est. APY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Liquidity Pools</TableCell>
                    <TableCell>Uniswap, Curve, Balancer</TableCell>
                    <TableCell className="text-right">4-20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Staking</TableCell>
                    <TableCell>Ethereum, Solana, Polkadot</TableCell>
                    <TableCell className="text-right">5-12%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Yield Farming</TableCell>
                    <TableCell>Aave, Compound, Yearn</TableCell>
                    <TableCell className="text-right">3-15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lending</TableCell>
                    <TableCell>Maker, Aave, Compound</TableCell>
                    <TableCell className="text-right">2-8%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
              description="Sign up and contribute to the community investment pool with a minimum stake of ~$2,000."
              details="The initial contribution gives you governance tokens proportional to your investment, granting you voting rights in the DAO."
            />
            <HowItWorksStep
              number={2}
              title="Participate in Governance"
              description="Submit investment proposals or vote on existing ones to shape the portfolio direction."
              details="Proposals include detailed information about the investment opportunity, expected returns, and risk assessment that the community can evaluate."
            />
            <HowItWorksStep
              number={3}
              title="Collective Investment"
              description="When proposals pass, investments are made with the community pool through automated smart contracts."
              details="Smart contracts execute the approved investment strategy across multiple protocols like liquidity pools, staking, and yield farming."
            />
            <HowItWorksStep
              number={4}
              title="Share the Returns"
              description="Returns are distributed proportionally to your stake in the DAO, with periodic airdrops based on participation."
              details="Performance is tracked through a transparent dashboard, and profits are either reinvested or distributed based on community decisions."
              isLast
            />
          </div>
        </div>
      </section>
      
      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tokenomics</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our dual-token model powers the ecosystem, providing both governance rights and utility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-dao-purple/10 p-3 rounded-lg">
                  <Vote className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Governance Token</h3>
              </div>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Voting Rights:</span> Proportional voting power in all DAO decisions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Staking:</span> Ability to stake tokens to increase voting power and earn rewards
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Proposal Creation:</span> Token holders can submit investment proposals for community voting
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Profit Sharing:</span> Receive profit distributions proportional to token holdings
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-dao-purple/10 p-3 rounded-lg">
                  <Trophy className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Utility Token</h3>
              </div>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Internal Payments:</span> Used for fee payments and internal transactions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Referral Rewards:</span> Earn tokens by referring new members to the DAO
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Platform Services:</span> Access premium features and educational content
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 pt-1">•</div>
                  <div>
                    <span className="font-medium">Airdrops:</span> Regular airdrops based on participation and contribution
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technical Architecture Section */}
      <section id="architecture" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Architecture</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Built on robust blockchain technology to ensure security, transparency, and efficiency.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="bg-dao-purple/10 p-3 rounded-lg w-fit">
                  <Shield className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Smart Contracts</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• ERC20Votes token standards</li>
                  <li>• Multi-signature fund security</li>
                  <li>• Automated proposal execution</li>
                  <li>• External audit verification</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="bg-dao-purple/10 p-3 rounded-lg w-fit">
                  <PieChart className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Integration Hub</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Protocol connectors for DeFi platforms</li>
                  <li>• Cross-chain investment capabilities</li>
                  <li>• Automated portfolio rebalancing</li>
                  <li>• Performance analytics and reporting</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="bg-dao-purple/10 p-3 rounded-lg w-fit">
                  <BookOpen className="text-dao-purple h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">User Interface</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Intuitive investment dashboard</li>
                  <li>• Real-time portfolio tracking</li>
                  <li>• Proposal creation and voting system</li>
                  <li>• Educational content and resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-20 px-6 bg-dao-purple">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join Our Growing Community</h2>
              <p className="text-white/80 text-lg mb-8">
                Connect with other investors, share insights, and participate in the future of decentralized investing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2 text-white">500+</div>
                  <div className="text-white/70">Active Members</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold mb-2 text-white">$2.5M</div>
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
                  <img src={defaultAvatar} alt="Member Avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm text-white/70">Just funded</div>
                    <div className="font-medium text-white">Tech Startup Investment Pool</div>
                  </div>
                  <div className="text-white/80">$125K</div>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                  <img src={defaultAvatar} alt="Member Avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm text-white/70">New proposal</div>
                    <div className="font-medium text-white">Green Energy Fund</div>
                  </div>
                  <div className="text-white/80">Voting</div>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl">
                  <img src={defaultAvatar} alt="Member Avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm text-white/70">Return distributed</div>
                    <div className="font-medium text-white">Real Estate Project</div>
                  </div>
                  <div className="text-white/80">+12%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Educational Resources Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Resources</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We believe in empowering our community with knowledge to make informed investment decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48">
                <img src={defiFundamentals} alt="DeFi Fundamentals" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">DeFi Fundamentals</h3>
                <p className="text-slate-600 mb-4">Learn the basics of decentralized finance, protocols, and yield generation strategies.</p>
                <Button variant="outline" className="w-full border-dao-purple text-dao-purple">
                  Read More
                </Button>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48">
                <img src={investmentStrategies} alt="Investment Strategies" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Investment Strategies</h3>
                <p className="text-slate-600 mb-4">Discover various investment approaches from HODL to active yield farming techniques.</p>
                <Button variant="outline" className="w-full border-dao-purple text-dao-purple">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
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
