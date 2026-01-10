"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";

const MotionDiv = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(function MotionDiv(
    { children, ...props },
    ref,
) {
    return (
        <motion.div ref={ref} {...props}>
            {children}
        </motion.div>
    );
});

const MotionHeader = React.forwardRef<HTMLElement, HTMLMotionProps<"header">>(function MotionHeader(
    { children, ...props },
    ref,
) {
    return (
        <motion.header ref={ref} {...props}>
            {children}
        </motion.header>
    );
});


export {
    MotionDiv,
    MotionHeader
};