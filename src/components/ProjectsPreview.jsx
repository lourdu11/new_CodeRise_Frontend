import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectsPreview = () => {
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return img.includes('uploads')
      ? `${API_URL}${img.startsWith('/') ? '' : '/'}${img}`
      : img;
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  const categories = [
    'All',
    'Client Live',
    'Completed Project',
    'Our Own Project',
    'Frontend Only',
    'Others'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Vibrant background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit mb-3">
              Elite <span className="gradient-text">Portfolio</span>
            </h2>
            <p
              className="max-w-xl italic text-sm md:text-base"
              style={{ color: 'var(--text-alt)' }}
            >
              A curated collection of high-performance digital architectures engineered for market dominance.
            </p>
          </div>
          {!isProjectsPage && (
            <Link to="/projects" className="shrink-0">
              <button className="glass px-6 py-3 rounded-full hover:bg-white/10 transition-all border border-[var(--surface-border)] text-sm font-bold tracking-widest uppercase hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
                Explore All →
              </button>
            </Link>
          )}
        </div>

        {/* Category Filter (Projects page only) */}
        {isProjectsPage && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105'
                    : 'glass text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic text-lg">
            No projects found in <span className="text-blue-400 font-semibold">{activeCategory}</span> category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  delay: Math.min(index * 0.08, 0.4),
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link to={`/projects/${project._id}`} className="block h-full">
                  <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--surface-border)] hover:border-blue-500/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 bg-[var(--surface-color)] hover:-translate-y-1">

                    {/* Image Area */}
                    <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                      {project.image ? (
                        <>
                          <img
                            src={getImageUrl(project.image)}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                          />
                          {/* Subtle overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                          <Layout className="text-blue-400 opacity-50" size={48} />
                        </div>
                      )}

                      {/* Category badge - always visible */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Shimmer on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>

                    {/* Card Body - always visible content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors leading-tight" style={{ color: 'var(--text-main)' }}>
                        {project.title}
                      </h3>

                      {/* Tech stack */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.slice(0, 4).map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 uppercase font-bold tracking-wider"
                              style={{ color: 'var(--text-alt)' }}
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>View Project</span>
                        <ExternalLink size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPreview;
