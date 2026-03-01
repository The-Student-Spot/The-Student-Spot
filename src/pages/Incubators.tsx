import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Rocket, Lightbulb, TrendingUp, Handshake, Users,
    CheckCircle, ArrowRight, Building, Microscope,
    Target, Globe, BarChart
} from "lucide-react";

const Incubators = () => {
    const whyPartner = [
        "Access to 20,000+ ambitious students",
        "Presence across 100+ campuses",
        "Early-stage founder discovery pipeline",
        "Startup-ready student teams",
        "Corporate collaboration network",
        "Structured innovation programs",
    ];

    const whatWeEnable = [
        {
            icon: Microscope,
            title: "1. Startup Discovery Engine",
            description: "Identify high-potential founders through:",
            points: [
                "Campus startup challenges",
                "Idea validation bootcamps",
                "Hackathons & innovation drives",
                "Founder-focused workshops & Pitch competitions"
            ],
            footer: "Early access = better nurturing."
        },
        {
            icon: Lightbulb,
            title: "2. Pre-Incubation Support",
            description: "Before startups enter your incubator, we help them with:",
            points: [
                "Idea refinement & Problem-solution validation",
                "Basic market research",
                "MVP direction & Pitch deck structuring",
                "Mentor alignment"
            ],
            footer: "You receive better-prepared founders."
        },
        {
            icon: Handshake,
            title: "3. Corporate & Startup Collaboration",
            description: "Through our ecosystem:",
            points: [
                "Companies run pilot projects with student startups",
                "Startups test solutions with real users",
                "Corporates outsource innovation experiments",
                "Industry mentors guide founders"
            ],
            footer: "This creates early traction and validation."
        },
        {
            icon: Users,
            title: "4. Talent for Portfolio Startups",
            description: "Your incubated startups get access to:",
            points: [
                "Skilled interns",
                "Freelance project teams",
                "Campus ambassadors",
                "Early team members"
            ],
            footer: "Helping them execute faster without high burn costs."
        },
        {
            icon: Globe,
            title: "5. Demo Days & Exposure",
            description: "Co-host with us:",
            points: [
                "Demo days",
                "Investor connect sessions",
                "Corporate pitch events",
                "Innovation summits"
            ],
            footer: "Increase visibility for both your incubator and your startups."
        },
        {
            icon: BarChart,
            title: "6. Research & Market Access",
            description: "Leverage campus communities for:",
            points: [
                "User surveys",
                "Product testing",
                "Feedback loops",
                "Early adoption programs"
            ],
            footer: "Students become beta users and early evangelists."
        },
    ];

    const idealPartners = [
        { title: "University Incubation Centers", icon: Building },
        { title: "Startup Accelerators", icon: Rocket },
        { title: "Corporate Innovation Labs", icon: Target },
        { title: "Government Innovation Cells", icon: Globe },
        { title: "Angel Networks & Early-Stage Funds", icon: TrendingUp },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
                {/* Dynamic Background Blurs */}
                <div className="absolute top-0 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm mx-auto lg:mx-0"
                            >
                                <Lightbulb className="w-4 h-4" />
                                For Incubators
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight"
                            >
                                Discover, Support & Scale<br />
                                the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Next Generation</span> of Founders.
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 space-y-4 font-medium"
                            >
                                <p>
                                    The Student Spot connects incubators with high-potential student founders, early-stage
                                    startups, and innovation-ready campus teams across India.
                                </p>
                                <p className="text-foreground">
                                    We help you discover ideas early, validate faster, and build stronger startup pipelines
                                    directly from campuses.
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
                                        Partner With Us <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="xl" className="h-16 px-10 text-lg rounded-full border-primary/30 hover:bg-primary/5" asChild>
                                    <Link to="/contact">Schedule a Discussion</Link>
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
                                        <Rocket className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Build a Consistent Funnel.</h3>
                                    <p className="text-muted-foreground mb-8 text-lg font-medium">We don’t just connect you to ideas.</p>

                                    <div className="space-y-4">
                                        {whyPartner.slice(0, 4).map((item, i) => (
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

            {/* Why Partner With The Student Spot */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5"
                        >
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                                Why Partner With <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">The Student Spot?</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium mb-8">
                                We don’t just connect you to ideas.<br />
                                <span className="text-foreground font-bold text-2xl">We help you build a consistent startup funnel.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
                        >
                            {whyPartner.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 bg-card border border-border shadow-sm p-5 rounded-2xl hover:shadow-md hover:border-primary/20 transition-all">
                                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                    <span className="text-foreground font-medium">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Enable for Incubators */}
            <section className="py-24 lg:py-32 bg-accent/30 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 lg:mb-24"
                    >
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            What We Enable for <span className="text-gradient">Incubators</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whatWeEnable.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-[2rem] p-8 border border-border shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                            >
                                {/* Accent glow on hover */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-sm relative z-10">
                                    <benefit.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                </div>

                                <h3 className="font-heading font-bold text-2xl text-foreground mb-4 relative z-10 leading-snug">{benefit.title}</h3>
                                <p className="text-muted-foreground mb-6 relative z-10 text-lg">{benefit.description}</p>

                                <ul className="space-y-3 mb-6 relative z-10 flex-grow">
                                    {benefit.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                                            <span className="text-foreground font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {benefit.footer && (
                                    <div className="mt-auto pt-6 border-t border-border/60 relative z-10">
                                        <p className="text-primary font-bold">{benefit.footer}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Long-Term Strategic Benefits & Ideal Partners */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2.5rem] p-8 lg:p-12 border border-primary/20 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                                <h3 className="font-heading text-3xl font-bold mb-6 text-foreground">Long-Term Strategic Benefits</h3>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Continuous founder pipeline",
                                        "Stronger campus presence",
                                        "Increased deal flow",
                                        "Corporate innovation partnerships",
                                        "National student brand visibility"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-lg font-medium text-foreground">
                                            <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-5 bg-background rounded-2xl border border-border shadow-sm">
                                    <p className="font-bold text-foreground text-center">
                                        We help you move from isolated incubation to <span className="text-primary">ecosystem-driven innovation.</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-heading text-3xl font-bold mb-8 text-foreground">Ideal Partners</h3>
                            <div className="grid gap-4">
                                {idealPartners.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-secondary" />
                                        </div>
                                        <span className="font-bold text-lg text-foreground">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Bigger Vision CTA */}
            <section className="py-20 lg:py-24 bg-accent/20">
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
                            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-white/20 shadow-sm">
                                The Bigger Vision
                            </div>

                            <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
                                India doesn’t lack ideas.
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-3xl mx-auto">
                                It lacks structured ecosystems connecting ideas to execution. The Student Spot builds that bridge from classroom curiosity to scalable startups.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {["Let’s identify the next generation of founders.", "Let’s fuel innovation from campuses."].map((text, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium text-lg">
                                        {text}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="hero" size="xl" className="h-16 px-10 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
                                    <Link to="/contact">
                                        Partner With TSS <ArrowRight className="ml-3 w-6 h-6" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Incubators;
