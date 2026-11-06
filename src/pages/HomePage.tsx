import React from 'react';
import { Hero } from '../components/home/Hero';
import { SearchForm } from '../components/home/SearchForm';
import { PopularRoutes } from '../components/home/PopularRoutes';
import { FeaturedJourneys } from '../components/home/FeaturedJourneys';
import { Benefits } from '../components/home/Benefits';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <SearchForm />
      <PopularRoutes />
      <FeaturedJourneys />
      <Benefits />
    </div>
  );
};
