'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ReadingProgress renders a fixed top progress bar with smooth motion.
 * Uses framer-motion's useScroll + useSpring for continuous updates.
 * If targetId is provided, progress is measured for that element; otherwise the whole page.
 */
export default function ReadingProgress({ targetId }) {
  const elementRef = useRef(null)
  const [hasTarget, setHasTarget] = useState(false)

  useEffect(() => {
    if (!targetId) {
      setHasTarget(false)
      return
    }
    const el = document.getElementById(targetId)
    if (el) {
      elementRef.current = el
      setHasTarget(true)
    } else {
      setHasTarget(false)
    }
  }, [targetId])

  const scrollHookArgs = hasTarget
    ? { target: elementRef, offset: ['start start', 'end end'] }
    : undefined

  const { scrollYProgress } = useScroll(scrollHookArgs)

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 20,
    mass: 0.2
  })

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="h-1 w-full bg-border/40" />
      <motion.div
        className="h-1 bg-accent origin-left"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  )
}


