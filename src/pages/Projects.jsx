import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ProjectsPreview from '../components/ProjectsPreview';

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-20 relative overflow-hidden"
    >
      <Helmet>
        <title>Projects | CodeRise</title>
      </Helmet>

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit mb-4"
        >
          Architectural <span className="gradient-text">Registry</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl italic"
          style={{ color: 'var(--text-alt)' }}
        >
          Exploring the convergence of aesthetic mastery and high-performance engineering.
        </motion.p>
      </div>

      <ProjectsPreview />
    </motion.div>
  );
};

export default Projects;
