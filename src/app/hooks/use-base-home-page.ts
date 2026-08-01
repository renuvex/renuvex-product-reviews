'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook for managing the base home page authentication and routing logic.
 * 
 * This hook handles the initial authentication flow for the application by:
 * - Delegating iframe authentication to the persistent dashboard shell
 * - Managing OAuth authorization redirects for new users
 * - Routing users to appropriate pages based on their authentication status
 * - Handling both internal (iFrame within ikas dashboard) and external (direct browser) access scenarios
 */
export function useBaseHomePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      if (window.self !== window.top) {
        // AdminShell is the single owner of AppBridge loader and token bootstrap.
        router.replace('/dashboard/reviews');
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const storeName = urlParams.get('storeName');

      if (storeName) {
        window.location.replace(`/api/oauth/authorize/ikas?storeName=${storeName}`);
        return;
      }

      router.push('/authorize-store');
    } catch (error) {
      console.error('Error during base home page initialization:', error);
      router.push('/authorize-store');
    }
  }, [router]);
}
