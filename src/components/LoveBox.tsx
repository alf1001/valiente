"use client"

import gsap from "gsap"
import { useRef, useState } from "react"

export default function LoveBox() {
  const envelopeRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  const [stage, setStage] = useState(0)
  const [giftStage, setGiftStage] = useState(0)

  // ================= HEART RAIN =================
  const hearts = Array.from({ length: 25 })

  const photos = [
  { src: "/assets/1.jpeg", date: "25 Jul 2025" },
  { src: "/assets/2.jpeg", date: "16 Aug 2025" },
  { src: "/assets/3.jpeg", date: "13 Sep 2025" },
  { src: "/assets/4.jpeg", date: "18 Oct 2025" },
  { src: "/assets/5.jpeg", date: "24 Nov 2025" },
  { src: "/assets/6.jpeg", date: "23 Dec 2025" },
  { src: "/assets/7.jpeg", date: "15 Jan 2026" },
  { src: "/assets/8.jpeg", date: "10 Feb 2026" },
]


  // ================= BOX =================
  const handleBoxClick = () => {
    if (stage !== 0) return

    gsap.to(envelopeRef.current, {
      opacity: 1,
      y: -140,
      duration: 1,
      ease: "power4.out",
      onComplete: () => setStage(1)
    })
  }

  // ================= ENVELOPE =================
  const handleEnvelopeClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (stage === 1) {
      gsap.to(envelopeRef.current, {
        scale: 2.2,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      })
      setStage(2)
    }

    else if (stage === 2) {
      const tl = gsap.timeline()

      tl.to(flapRef.current, {
        rotateX: -180,
        duration: 0.8,
        ease: "power2.inOut"
      })

      tl.to(letterRef.current, {
        opacity: 1,
        y: -130,
        duration: 1,
        ease: "power3.out"
      }, "-=0.4")

      setStage(3)
    }

    else if (stage === 3) {
      setStage(4)
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-pink-50 overflow-hidden">

      {/* ================= BOX ================= */}
      <div 
        className="relative w-80 h-80 bg-red-600 rounded-2xl shadow-2xl cursor-pointer flex items-center justify-center"
        onClick={handleBoxClick}
      >
        <div className="absolute top-10 w-60 h-4 bg-black rounded-full" />

        <div className="absolute bottom-14 text-red-900 text-3xl font-bold">
          Love Box
        </div>

        {/* ================= ENVELOPE ================= */}
        <div 
          ref={envelopeRef}
          onClick={handleEnvelopeClick}
          className="absolute w-60 h-40 bg-rose-100 rounded-md shadow-xl opacity-0 cursor-pointer"
          style={{ transform: "translateY(120px)" }}
        >
          <div
            ref={flapRef}
            className="absolute top-0 w-full h-20 bg-rose-200 origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)"
            }}
          />

          <div
            ref={letterRef}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 bg-[#f7cfd8] rounded-lg shadow-2xl opacity-0 p-6"
          >
            {stage < 4 ? (
              <div className="text-center text-2xl font-bold">
                💌 Happy Valentine’s Day 💕
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-6">
                  Will You Be My{" "}
                  <span className="text-pink-600">Valentine?</span>
                </h1>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setGiftStage(1)
                    }}
                    className="px-6 py-2 bg-pink-500 text-white rounded-xl shadow-lg hover:scale-110 transition"
                  >
                    Yes 💖
                  </button>

                  <button
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 100 - 50,
                        duration: 0.3
                      })
                    }}
                    className="px-6 py-2 bg-pink-300 text-white rounded-xl shadow-lg"
                  >
                    No 💔
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= GIFT 1 ================= */}
      {giftStage === 1 && (
        <div className="absolute inset-0 bg-[#f6efe7] flex flex-col items-center justify-center z-50 text-center">
          <h1 className="text-4xl font-bold text-rose-700 mb-3">
            YAYYYY!!
          </h1>

          <p className="text-lg text-rose-600 mb-6">
            I have a gift for you!
          </p>

          <img
            src="/assets/meow.gif"
            alt="cute cat"
            className="w-64 h-64 mb-6"
          />

          <button
            onClick={() => setGiftStage(2)}
            className="px-8 py-3 bg-red-700 text-white rounded-full shadow-xl hover:scale-110 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* ================= HEART RED ================= */}
      {giftStage === 2 && (
        <div className="absolute inset-0 bg-[#f6efe7] flex items-center justify-center z-50">
          <img
            src="/assets/heart.png"
            alt="heart"
            className="w-72 cursor-pointer hover:scale-110 transition"
            onClick={() => setGiftStage(3)}
          />
        </div>
      )}

      {/* ================= FINAL STAGE ================= */}
      {giftStage === 3 && (
        <div className="absolute inset-0 bg-pink-200 flex flex-col items-center justify-center z-50 text-center overflow-hidden">

          

          <h1 className="text-3xl font-bold mb-4 z-10">
            Website just for you my one and only love LN💖
          </h1>

          <p className="mb-6 text-gray-700 z-10">
            Click one of the chocolate!
          </p>

          <img
  src="/assets/chocolate.png"
  alt="chocolate box"
  className="w-80 z-10 cursor-pointer hover:scale-105 transition"
  onClick={() => setGiftStage(4)}
/>


          {/* HEART RAIN */}
          {hearts.map((_, i) => (
            <span
              key={i}
              className="absolute text-pink-500 text-2xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}
      {/* ================= PHOTO GALLERY ================= */}
{giftStage === 4 && (
  <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-rose-100 flex flex-col items-center justify-center z-50 overflow-hidden">

    {/* MUSIC */}
    <audio src="/assets/valentine.mp3" autoPlay loop />

    <h1 className="text-4xl font-bold mb-10 text-rose-700 drop-shadow-lg z-10">
      Our Memories 💖
    </h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-10 z-10">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-0 transition duration-500"
          style={{
            rotate: `${Math.random() * 10 - 5}deg`
          }}
        >
          <img
            src={photo.src}
            alt="memory"
            className="w-40 h-48 object-cover rounded-lg"
          />

          <div className="mt-3 text-center">
            <p className="font-semibold text-rose-600">
              Us 💕
            </p>
            <p className="text-xs text-gray-500">
              {photo.date}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* HEART RAIN */}
    {hearts.map((_, i) => (
      <span
        key={i}
        className="absolute text-pink-400 text-2xl animate-fall"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${4 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      >
        💕
      </span>
    ))}

  </div>
)}




      {/* HEART ANIMATION STYLE */}
      <style jsx>{`
  @keyframes fall {
    0% {
      transform: translateY(-100px);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  .animate-fall {
    position: absolute;
    top: 0;
    animation-name: fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`}</style>


    </div>
  )
}
