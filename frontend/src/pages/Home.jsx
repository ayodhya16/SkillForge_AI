import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>SkillForge AI</h1>
      <p>Upskill with AI-powered learning</p>
      <p>Learn. Build. Get Job-Ready.</p>

    </motion.div>
  );
}
