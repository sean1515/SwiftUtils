type EventParams = Record<string, string | number | boolean>;

// Track custom events
export const trackEvent = (eventName: string, eventParams?: EventParams) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      event_category: 'user_action',
      non_interaction: false,
    });
  }
};

// Track page views manually (if needed)
export const trackPageView = (path: string, title?: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.origin + path,
      page_path: path,
      non_interaction: true,
    });
  }
};

// Track user interactions
export const trackInteraction = (
  interactionType: string,
  componentName: string,
  additionalParams?: EventParams
) => {
  trackEvent('user_interaction', {
    interaction_type: interactionType,
    component_name: componentName,
    ...additionalParams,
    event_category: 'engagement',
  });
};

// Track errors
export const trackError = (errorMessage: string, errorCode?: string, componentName?: string) => {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_code: errorCode || 'unknown',
    component_name: componentName || 'unknown',
    event_category: 'error',
  });
};
