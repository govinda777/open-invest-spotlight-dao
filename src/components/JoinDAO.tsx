
import { Button } from "./ui/button";

export const JoinDAO = () => {
  return (
    <section id="dao" className="py-20 bg-gradient-to-b from-secondary/30 to-transparent relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 rounded-full bg-primary/10" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/5" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center staggered">
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
            DAO Governance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Decentralized Autonomous Organization</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Become a member of our DAO to participate in platform governance, vote on project funding, and shape the future of decentralized investment.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Voting Rights",
                description: "Participate in all platform decisions and proposals",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                )
              },
              {
                title: "Rewards",
                description: "Earn rewards for active governance participation",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                )
              },
              {
                title: "Exclusive Access",
                description: "Get early access to premium investment opportunities",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <path d="M7 7h.01"/>
                    <path d="M17 7h.01"/>
                    <path d="M7 17h.01"/>
                    <path d="M17 17h.01"/>
                  </svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-slow opacity-75">
              <div className="absolute inset-0 animate-ripple rounded-full bg-primary/10" style={{ animationDelay: '0s' }}></div>
              <div className="absolute inset-0 animate-ripple rounded-full bg-primary/10" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-0 animate-ripple rounded-full bg-primary/10" style={{ animationDelay: '2s' }}></div>
            </div>
            <Button variant="gradient" size="xl" className="relative z-10">
              Join Open Invest DAO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
