import { motion } from 'framer-motion';

function Logo({ width, height, src }) {
  return (
    <motion.img
      src={src}
      alt="Logo"
      initial={{ opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ width, height }}
    />
  );
}

export default Logo;