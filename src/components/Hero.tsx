
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-transparent to-secondary/30">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 z-0"></div>
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="staggered">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-gradient">Decentralized</span> Investment Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Discover, invest, and govern promising projects through 
              our transparent and collaborative DAO platform.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="gradient" size="xl" className="group">
                Explore Projects
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">2,500+</span> active investors
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-scale-in glass-card">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Investment Dashboard"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full w-fit mb-2">Featured Project</span>
                <h3 className="text-xl font-bold text-white">GreenTech Ventures</h3>
                <p className="text-white/70 mb-2">Sustainable energy solutions</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold">$1.2M</span>
                    <span className="text-white/70 text-sm ml-1">raised of $2M</span>
                  </div>
                  <div className="h-2 w-32 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-5 w-40 h-40 rounded-2xl rotate-12 bg-primary/10 backdrop-blur-sm border border-primary/20 -z-10"></div>
            <div className="absolute -top-5 -right-5 w-40 h-40 rounded-2xl -rotate-12 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 -z-10"></div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 staggered">
          {[
            { value: "500+", label: "Projects Funded" },
            { value: "$25M+", label: "Total Investments" },
            { value: "12,000+", label: "DAO Members" },
            { value: "95%", label: "Success Rate" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-xl text-center hover-scale">
              <h3 className="text-3xl font-bold text-gradient mb-1">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </section>
  );
};
