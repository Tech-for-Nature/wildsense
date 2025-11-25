// AMBER Site Analytics Tracking
// Comprehensive visitor metrics for the entire AMBER dashboard

window.amberAnalytics = {
  pageViews: 0,
  timeOnPage: 0,
  interactions: 0,
  startTime: Date.now(),
  pageName: '',

  // Initialize analytics for a specific page
  init: function(pageName) {
    this.pageName = pageName || this.getPageName();
    this.trackPageView();
    this.setupEventListeners();
    this.startTimeTracking();
  },

  // Auto-detect page name from URL
  getPageName: function() {
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) return 'home';
    if (path.includes('story_encounters')) return 'wildlife_encounters';
    if (path.includes('story_ml')) return 'machine_learning';
    if (path.includes('story_map')) return 'global_deployments';
    if (path.includes('story_big')) return 'big_moths';
    if (path.includes('story4')) return 'story4';
    if (path.includes('stories.html')) return 'stories_overview';
    if (path.includes('about.html')) return 'about';
    return 'unknown_page';
  },

  // Track page view
  trackPageView: function() {
    this.pageViews++;
    this.sendEvent('page_view', {
      page: this.pageName,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: screen.width + 'x' + screen.height,
      viewport_size: window.innerWidth + 'x' + window.innerHeight
    });
  },

  // Track user interactions
  trackInteraction: function(type, element, data = {}) {
    this.interactions++;
    this.sendEvent('user_interaction', {
      type: type,
      element: element,
      page: this.pageName,
      timestamp: new Date().toISOString(),
      ...data
    });
  },

  // Send event to analytics services
  sendEvent: function(eventType, data) {
    // Console logging for development (remove in production)
    console.log('AMBER Analytics:', eventType, data);

    // Store in localStorage
    let analytics = JSON.parse(localStorage.getItem('amberAnalytics') || '[]');
    analytics.push({
      event: eventType,
      data: data
    });

    // Keep only last 1000 events to prevent storage overflow
    if (analytics.length > 1000) {
      analytics = analytics.slice(-1000);
    }

    localStorage.setItem('amberAnalytics', JSON.stringify(analytics));

    // Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', eventType, data);
    }

    // Send to custom analytics endpoint (implement as needed)
    this.sendToCustomEndpoint(eventType, data);
  },

  // Custom analytics endpoint (placeholder)
  sendToCustomEndpoint: function(eventType, data) {
    // Implement your custom analytics endpoint here
    // Example:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({event: eventType, data: data})
    // });
  },

  // Start time tracking
  startTimeTracking: function() {
    setInterval(() => {
      this.timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
    }, 1000);
  },

  // Setup event listeners for common interactions
  setupEventListeners: function() {
    const self = this;

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;

        // Track milestone scroll depths
        const milestones = [25, 50, 75, 90];
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && maxScrollDepth < milestone + 10) {
            self.trackInteraction('scroll_depth', `${milestone}%`);
          }
        });
      }
    });

    // Track all link clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.trim();
        const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

        self.trackInteraction('link_click', href, {
          text: text,
          is_external: isExternal,
          element_class: link.className
        });
      }

      // Track button clicks
      const button = e.target.closest('button');
      if (button) {
        self.trackInteraction('button_click', button.textContent.trim(), {
          element_class: button.className
        });
      }

      // Track card clicks (for story cards, wildlife cards, etc.)
      const card = e.target.closest('.story-card, .wildlife-card, .story-carousel-card');
      if (card) {
        const title = card.querySelector('h3, h4, h5') ? card.querySelector('h3, h4, h5').textContent : 'Unknown';
        self.trackInteraction('card_click', title, {
          card_type: card.className
        });
      }
    });

    // Track form interactions
    document.addEventListener('submit', function(e) {
      const form = e.target;
      if (form.tagName === 'FORM') {
        self.trackInteraction('form_submit', form.id || 'unnamed_form');
      }
    });

    // Track tab visibility changes
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        self.trackInteraction('tab_hidden', 'user_switched_tab');
      } else {
        self.trackInteraction('tab_visible', 'user_returned_to_tab');
      }
    });

    // Track page exit
    window.addEventListener('beforeunload', function() {
      const timeOnPage = Math.floor((Date.now() - self.startTime) / 1000);
      self.sendEvent('page_exit', {
        page: self.pageName,
        time_on_page: timeOnPage,
        interactions: self.interactions,
        max_scroll_depth: maxScrollDepth,
        timestamp: new Date().toISOString()
      });
    });

    // Track window resize (responsive behavior)
    window.addEventListener('resize', function() {
      self.trackInteraction('window_resize', window.innerWidth + 'x' + window.innerHeight);
    });
  }
};

// Utility functions for analytics data access
window.getAnalyticsData = function() {
  return {
    currentSession: {
      page: window.amberAnalytics.pageName,
      timeOnPage: window.amberAnalytics.timeOnPage,
      interactions: window.amberAnalytics.interactions,
      startTime: new Date(window.amberAnalytics.startTime).toISOString()
    },
    storedData: JSON.parse(localStorage.getItem('amberAnalytics') || '[]')
  };
};

window.clearAnalyticsData = function() {
  localStorage.removeItem('amberAnalytics');
  console.log('Analytics data cleared');
};

window.exportAnalyticsData = function() {
  const data = window.getAnalyticsData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amber-analytics-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Auto-initialize analytics when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.amberAnalytics.init();
});
