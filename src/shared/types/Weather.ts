export type Weather = {
//   general: {
//     name:string;
//     sunset: number;
//     sunrise: number;
//   };

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
    // uv: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
};
