export interface LocationProps {
  ip: string;
  city: {
    name: string;
    postalCode: string;
  };
  country: {
    name: string;
    emojiFlag: string;
    timeZone: string;
  };
  sysInfo: {
    system: string;
    webBrowser: {
      browser: string;
      version: string;
    };
  };
}

export const getLocation = async (): Promise<LocationProps> => {
  try {
    const response = await fetch(
      "https://solid-geolocation.vercel.app/location",
    );
    const location = await response.json();

    if (!response.ok) {
      throw new Error("Error en el fetch " + response.statusText);
    }
    return location;
  } catch (error) {
    throw error;
  }
};
