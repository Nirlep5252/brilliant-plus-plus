"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const popUpAnimationVariants = {
  hidden: {
    opacity: 0,
    translateY: "50px",
    scale: 0.75,
  },
  visible: (custom: number) => {
    return {
      opacity: 1,
      translateY: "-50px",
      scale: 1,
      transition: { delay: custom || 0 },
    };
  },
};

export default function Home() {
  return (
    <div className="mashcode-landing -z-10 flex h-screen w-full flex-col items-center justify-center">
      <div className="mashcode flex text-9xl font-bold">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popUpAnimationVariants}
        >
          Brilliant
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popUpAnimationVariants}
          custom={0.1}
        >
          ++
        </motion.div>
      </div>
      <motion.div
        variants={popUpAnimationVariants}
        initial="hidden"
        animate="visible"
        custom={0.25}
        className="text-4xl"
      >
        Compete & Conquer
      </motion.div>
      <motion.div
        className="button-group mt-8 flex gap-4"
        variants={popUpAnimationVariants}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        <Link href="/api/auth/signin">
          <Button
            className="px-10 py-6 text-lg transition-all duration-100 hover:shadow-[rgba(255,_255,_255,_0.5)_0px_25px_50px_-12px]"
            variant="default"
            size="lg"
          >
            Let's dive in!
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
