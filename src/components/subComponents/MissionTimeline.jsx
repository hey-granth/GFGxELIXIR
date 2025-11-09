import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger);

const MissionTimeline = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;

    // 🎥 Background zoom + blur
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "bottom+=80% top",
        scrub: 1.5,
        pin: true,
      },
    });

    tl.fromTo(
      videoEl,
      { scale: 1, opacity: 1, filter: "blur(0px)" },
      {
        scale: 1.15,
        opacity: 0.5,
        filter: "blur(6px)",
        ease: "power3.inOut",
      },
      0
    );

    // 🌀 Alternate fade/slide animations
    gsap.utils.toArray(cardsRef.current).forEach((card, i) => {
      const dir = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(
        card,
        { opacity: 0, x: dir, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const events = [
    { date: "Jan 15", title: "Registration Opens", desc: "Sign up starts now!" },
    { date: "Feb 1", title: "Deadline Extended", desc: "Last chance to register" },
    { date: "Feb 15–17", title: "Hackathon Begins", desc: "72 hours of coding" },
    { date: "Feb 17", title: "Submissions Due", desc: "Final demos presented" },
    { date: "Feb 18", title: "Results & Awards", desc: "Winners announced" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white py-4"
    >
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/djrs8vc5s/video/upload/f_auto,q_auto:good/v1730902345/1106_4_-1_ngskzm.mp4"
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

      {/* 🧭 Foreground */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl text-white font-light tracking-tight mb-3">
            Mission Timeline
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            The Survey Corps battle plan
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/25 -translate-x-1/2"></div>

          <div className="space-y-1 md:space-y-1">
            {events.map((event, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`flex items-center relative ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Horizontal connector line (from dot to card edge) */}
                <div
                  className={`absolute top-1/3 h-[1px] bg-white/30 ${
                    i % 2 === 0
                      ? "right-1/2 w-[calc(17%-2rem)]"
                      : "left-1/2 w-[calc(17%-2rem)]"
                  }`}
                ></div>

                {/* Event card */}
                <div
                  className={`w-[40%] ${
                    i % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-xl hover:bg-white/10 transition-all duration-500">
                    <CardHeader className="px-5 py-3 flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-base md:text-lg text-white font-light whitespace-nowrap">
                          {event.title}
                        </CardTitle>
                        <Badge className="bg-white text-black text-[0.65rem] font-medium px-2 py-0.5 rounded-full">
                          {event.date}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-300 text-xs md:text-sm leading-relaxed mt-1">
                        {event.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Center Dot */}
                {/* <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white/20 shadow-lg"></div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionTimeline;
