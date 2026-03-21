import { useState, useEffect, useCallback } from 'react';

const TOUR_KEY = 'arthistory_tour_completed';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const useTour = (steps: TourStep[]) => {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const isCompleted = () => localStorage.getItem(TOUR_KEY) === 'true';

  useEffect(() => {
    // Allow resetting tour via URL param ?tour=reset
    const params = new URLSearchParams(window.location.search);
    if (params.get('tour') === 'reset') {
      localStorage.removeItem(TOUR_KEY);
      localStorage.removeItem('arthistory_detail_tour_completed');
      // Clean URL
      params.delete('tour');
      const newUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
    if (!isCompleted()) {
      const timer = setTimeout(() => setActive(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finish();
    }
  }, [currentStep, steps.length]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const finish = useCallback(() => {
    setActive(false);
    setCurrentStep(0);
    localStorage.setItem(TOUR_KEY, 'true');
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(TOUR_KEY);
    setCurrentStep(0);
    setActive(true);
  }, []);

  // Start with specific steps (for phase 2)
  const startWith = useCallback((newSteps: TourStep[]) => {
    setCurrentStep(0);
    setActive(true);
  }, []);

  return {
    active, currentStep, step: steps[currentStep], totalSteps: steps.length,
    next, prev, finish, restart, startWith, setActive, setCurrentStep,
    isCompleted: isCompleted(),
  };
};

// Separate key for detail tour
const DETAIL_TOUR_KEY = 'arthistory_detail_tour_completed';

export const useDetailTour = (steps: TourStep[]) => {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const start = useCallback(() => {
    if (localStorage.getItem(DETAIL_TOUR_KEY)) return;
    setCurrentStep(0);
    setTimeout(() => setActive(true), 800);
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finish();
    }
  }, [currentStep, steps.length]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const finish = useCallback(() => {
    setActive(false);
    setCurrentStep(0);
    localStorage.setItem(DETAIL_TOUR_KEY, 'true');
  }, []);

  return {
    active, currentStep, step: steps[currentStep], totalSteps: steps.length,
    next, prev, finish, start,
    isCompleted: !!localStorage.getItem(DETAIL_TOUR_KEY),
  };
};
