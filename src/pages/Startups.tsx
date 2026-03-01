import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Rocket, Users, Briefcase, Zap, Target,
    ArrowRight, CheckCircle, LineChart, Handshake, Network, Lightbulb
} from "lucide-react";

const Startups = () => {
    const hiringOptions = [
        { title: "Internships", desc: "Execution-driven short-term roles.", icon: Users },
        { title: "Freelance Projects", desc: "Flexible task-based hiring.", icon: Zap },
        { title: "Full-Time Hiring", desc: "Job-ready graduates.", icon: Briefcase },
        { title: "Consulting & Research Projects", desc: "Campus-led market research and testing.", icon: LineChart },
        { title: "Startup Collaborations", desc: "Corporate partnerships and project builds.", icon: Handshake },
        { title: "Campus Events", desc: "Hackathons, innovation challenges, and branding activations.", icon: Target },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
                {/* Dynamic Background Blurs */}
                <div className="absolute top-10 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm mx-auto lg:mx-0"
                            >
                                <Rocket className="w-4 h-4" />
                                For Startups
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-[1.1]"
                            >
                                Get Execution <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Power.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 space-y-3"
                            >
                                <p className="text-foreground text-xl">
                                    Access interns, freelancers, and student teams to accelerate product, marketing, and
                                    operations.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Button variant="hero" size="xl" className="h-16 px-10 text-lg shadow-xl shadow-primary/25 rounded-full hover:scale-105 transition-transform" asChild>
                                    <Link to="/contact">
                                        Start Hiring <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="xl" className="h-16 px-10 text-lg rounded-full border-primary/30 hover:bg-primary/5" asChild>
                                    <Link to="/auth">Post a Job</Link>
                                </Button>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-5 hidden lg:block"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] transform rotate-3 scale-105 blur-sm opacity-50"></div>
                                <div className="bg-card rounded-[2.5rem] p-10 shadow-2xl border border-border/50 relative z-10 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg">
                                        <Network className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Fuel & Scale Your Startup</h3>
                                    <div className="space-y-4">
                                        {[
                                            "Access skilled interns",
                                            "Collaborate with consulting partners",
                                            "Get campus-level user testing",
                                            "Run beta programs within student communities"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-muted/30 p-3 rounded-xl">
                                                <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                                <span className="text-foreground font-medium text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Corporate Connections & Investor Access */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                {/* Subtle Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10"></div>

                <div className="container mx-auto px-4 z-10 relative">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary/20 uppercase tracking-widest shadow-sm">
                                <Handshake className="w-4 h-4" />
                                Strategic Access
                            </div>
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                                Connect With <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Client Companies</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium mb-8">
                                We connect startups to companies inside our ecosystem for:
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Paid pilot projects",
                                    "Service contracts",
                                    "Strategic collaborations",
                                    "Vendor partnerships",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-card border border-border/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
                                        <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-card border border-border/50 p-6 rounded-2xl shadow-sm">
                                <h4 className="font-heading text-xl font-bold text-foreground mb-2">Corporate Startup Collaboration</h4>
                                <p className="text-muted-foreground">Companies can test solutions by working directly with startups in our network, helping validate, refine, and scale innovative ideas.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-card text-foreground rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-border/50">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                                    <Lightbulb className="w-8 h-8 text-secondary" />
                                </div>
                                <h3 className="font-heading text-3xl font-bold mb-6">Investor & Strategic Access</h3>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Connect with corporate leaders and ecosystem partners who may:
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Fund pilot programs",
                                        "Offer strategic investments",
                                        "Become early clients",
                                        "Provide mentorship and advisory support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-lg font-medium text-foreground">
                                            <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                                    <p className="font-bold text-secondary text-center px-4">
                                        We help startups move from idea to validation to traction to funding conversations.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Hiring & Collaboration Options */}
            <section className="py-24 lg:py-32 bg-accent/30 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 lg:mb-24"
                    >
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Hiring & Collaboration <span className="text-gradient">Options</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hiringOptions.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-[2rem] p-8 border border-border shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 group relative overflow-hidden text-center flex flex-col items-center"
                            >
                                {/* Accent glow on hover */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 relative z-10">
                                    <item.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                </div>

                                <h3 className="font-heading font-bold text-2xl text-foreground mb-4 relative z-10">{item.title}</h3>
                                <p className="text-muted-foreground text-lg relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="gradient-hero rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-primary/20"
                    >
                        {/* Decorative blurs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[50px] pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
                                This Is Not Just Hiring.
                            </h2>
                            <p className="text-2xl text-white/90 font-medium mb-10 max-w-3xl mx-auto">
                                It’s Talent + Freelance + Startup Fuel + Corporate Growth.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {["Build your workforce.", "Outsource smartly.", "Partner with startups.", "Discover future leaders.", "Support innovation and benefit from it."].map((text, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium text-lg">
                                        {text}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="hero" size="xl" className="h-16 px-10 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
                                    <Link to="/contact">
                                        Start Hiring <ArrowRight className="ml-3 w-6 h-6" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="xl" className="h-16 px-10 text-xl rounded-full border-white/50 text-white hover:bg-white hover:text-primary transition-colors" asChild>
                                    <Link to="/auth">Post a Job</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Startups;
