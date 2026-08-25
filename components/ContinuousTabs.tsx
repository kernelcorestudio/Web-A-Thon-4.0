"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "framer-motion";

/* ---------- Types ---------- */
export interface TabItem {
    id: string;
    label: string;
}

interface ContinuousTabsProps {
    tabs?: TabItem[];
    defaultActiveId?: string;
    onChange?: (id: string) => void;
}

/* ---------- Defaults ---------- */
const DEFAULT_TABS: TabItem[] = [
    { id: "home", label: "Home" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact Us" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
    tabs = DEFAULT_TABS,
    defaultActiveId = "home",
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultActiveId);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (id: string) => {
        setActive(id);
        const el = document.querySelector(`#${id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        onChange?.(id);
    };

    if (!isMounted) return null;

    return (
        <LayoutGroup>
            <nav className="continuous-tabs-nav">
                {tabs.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleChange(tab.id)}
                            className={`continuous-tab-btn ${isActive ? 'active' : ''}`}
                        >
                            {/* Active pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    className="continuous-tab-active-pill"
                                />
                            )}

                            {/* Text */}
                            <motion.span
                                layout="position"
                                className="continuous-tab-text"
                            >
                                {tab.label}
                            </motion.span>
                        </button>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};
