import { motion, type MotionProps } from 'framer-motion'
import * as React from 'react'

export const Fade: React.FC<MotionProps & { as?: any }> = ({ as:Tag='div', children, ...rest }) => (
  <motion.div
    initial={false}
    animate={{ opacity: 1, y: 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    {...rest}
    // as={Tag}
  >{children}</motion.div>
)