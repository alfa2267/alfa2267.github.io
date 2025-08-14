import { useState, useEffect } from 'react';
import ProjectService from '../services/projectService.js';

/**
 * Custom hook for managing dynamic menu items
 */
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true);
        const projectService = new ProjectService();
        const items = await projectService.generateMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err) {
        console.error('Error loading menu items:', err);
        setError(err);
        // Fallback to static menu items
        setMenuItems(getStaticMenuItems());
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  return { menuItems, loading, error };
};

/**
 * Fallback static menu items if dynamic loading fails
 */
const getStaticMenuItems = () => {
  const {
    IconAperture, IconCopy, IconLayoutDashboard, IconLogin, 
    IconMoodHappy, IconTypography, IconUserPlus, IconChecks, IconBrandGithub
  } = require('@tabler/icons');
  const { uniqueId } = require('lodash');

  return [
    {
      navlabel: true,
      subheader: 'Home',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: '/dashboard',
    },
    {
      id: uniqueId(),
      title: 'Community Vote',
      icon: IconChecks,
      href: 'https://alfa2267.github.io/community-vote/',
      external: true,
    },
    {
      navlabel: true,
      subheader: 'GitHub Projects',
    },
    {
      id: uniqueId(),
      title: 'alfa2267.github.io',
      icon: IconBrandGithub,
      href: 'https://github.com/alfa2267/alfa2267.github.io',
      external: true,
    },
    {
      id: uniqueId(),
      title: 'community-vote',
      icon: IconBrandGithub,
      href: 'https://github.com/alfa2267/community-vote',
      external: true,
    },
    {
      navlabel: true,
      subheader: 'Utilities',
    },
    {
      id: uniqueId(),
      title: 'Icons',
      icon: IconMoodHappy,
      href: '/icons',
    },
    {
      id: uniqueId(),
      title: 'Sample Page',
      icon: IconAperture,
      href: '/sample-page',
    },
  ];
};