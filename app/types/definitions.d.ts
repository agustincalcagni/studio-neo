interface LocationProps {
  message?: string;
  ip: string;
  city: {
    name: string;
    postalCode: string;
  };
  country: {
    name: string;
    emojiFlag: string;
    timezone: string;
  };
  sysInfo: {
    system: string;
    webBrowser: {
      browser: string;
      version: string;
    };
  };
}

interface SnVisitorsProps {
  id: string;
  count: number;
  city: string;
  country: string;
  timezone: string;
  system: string;
  browser: string;
  emoji_flag: string;
  ip: string;
  created_at: Date | string;
}

export { SnVisitorsProps, LocationProps };
