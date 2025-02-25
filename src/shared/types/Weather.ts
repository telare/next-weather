export type Weather = {
  name: string;
  dt_txt?: string;
  weather: {
    icon: string;
    descr: string;
  };
  temperature: {
    feels_like: number;
    current_temp: number;
    max_temp: number;
    min_temp: number;
  };
  other: {
    pressure: number;
    visibility: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
};
