import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Brain, Code, Shield, Sparkles, Target, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    const contentEl = contentRef.current;

    // Pinned video timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "bottom+=100% top",
        scrub: 1.5,
        pin: true,
      },
    });

    // 🎥 Smooth background zoom + blur
    tl.fromTo(
      videoEl,
      { scale: 1, opacity: 1, filter: "blur(0px)" },
      {
        scale: 1.2,
        opacity: 0.4,
        filter: "blur(4px)",
        ease: "power3.inOut",
      },
      0
    );

    // 🔆 Content fade slightly with scroll
    tl.fromTo(
      contentEl,
      { opacity: 1, y: 0 },
      {
        opacity: 0.7,
        y: -50,
        ease: "power2.inOut",
      },
      0.3
    );

    // 🌀 Cards fade left/right with reversible animation
    gsap.utils.toArray(cardsRef.current).forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 1, x: 0, filter: "blur(0px)" },
        {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          filter: "blur(4px)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 50%",
            end: "bottom -10%",
            scrub: true,
            markers: true,
            toggleActions: "play none reverse none", // ✅ Smooth reverse
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const cardData = [
    {
      icon: <Code className="w-12 h-12 text-white" />,
      title: "Strategic Web Initiative",
      desc: "Frontend & Backend Operations",
      points: [
        "React, Next.js, Vue.js",
        "Full-stack architectures",
        "Modern UI/UX systems",
      ],
    },
    {
      icon: <Brain className="w-10 h-10 text-white" />,
      title: "AI/ML Titan",
      desc: "Intelligence Warfare Division",
      points: [
        "Machine Learning models",
        "Natural Language Processing",
        "Computer Vision",
      ],
    },
    {
      icon: <Shield className="w-10 h-10 text-white" />,
      title: "Security Titan",
      desc: "Protector of Digital Walls",
      points: ["Security tools", "Threat detection", "Privacy solutions"],
    },
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "Chain Titan",
      desc: "Decentralized Territory",
      points: ["Smart contracts", "DeFi applications", "NFT platforms"],
    },
    {
      icon: <Sparkles className="w-10 h-10 text-white" />,
      title: "Mobile Titan",
      desc: "Pocket Dimension Warrior",
      points: [
        "iOS & Android apps",
        "Cross-platform solutions",
        "Mobile-first design",
      ],
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Wings of Freedom",
      desc: "Ultimate Creative Liberty",
      points: [
        "Unique solutions",
        "Creative problem solving",
        "Out-of-the-box thinking",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/djrs8vc5s/video/upload/f_auto,q_auto:good/v1730902345/1106_2_-1_ltl6d2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 🧭 Foreground Content */}
      <div
        ref={contentRef}
        className="relative z-20 py-4 flex flex-col items-center justify-center"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1 font-light">
              STRATEGIC OPERATIONS CLASSIFICATION
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-light tracking-tight mb-3">
              Battle Fronts
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Select your strategic division and deploy your expertise
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((item, i) => (
              <Card
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/10 hover:scale-105 transform transition-all duration-500"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-2xl text-white">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm uppercase tracking-wide mt-2">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 text-sm font-medium">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-white">▸</span> {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
