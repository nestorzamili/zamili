'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<motion.button
			type="button"
			onClick={toggleTheme}
			className="p-2.5 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 light:bg-gray-100/80 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200 transition-colors"
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				initial={false}
				animate={{ rotate: theme === 'dark' ? 0 : 180 }}
				transition={{ duration: 0.3 }}
			>
				{theme === 'dark' ? (
					<Sun size={20} className="text-yellow-400" />
				) : (
					<Moon size={20} className="text-slate-700" />
				)}
			</motion.div>
		</motion.button>
	);
}
