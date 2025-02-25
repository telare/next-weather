export function descriptionBuilder(metric: {
  title: string;
  value: number;
}): string {
  switch (metric.title) {
    case "wind":
      if (metric.value < 1.6) return `Calm, little wind`;
      if (metric.value < 5.6) return `Moderate wind, comfortable`;
      if (metric.value < 10.9) return `Strong wind, can feel challenging`;
      return `Very strong wind, risk of damage`;

    case "humidity":
      if (metric.value < 31) return `Dry, may cause discomfort`;
      if (metric.value < 51) return `Comfortable and balanced`;
      if (metric.value < 71) return `Slightly humid, can feel sticky`;
      return `Very humid, risk of fog or rain`;

    case "visibility":
      if (metric.value < 500) return `Hazardous, dense fog`;
      if (metric.value < 1000) return `Very low, drive cautiously`;
      if (metric.value < 5000) return `Moderate, slight haze`;
      if (metric.value < 10000) return `Good, clear view`;
      return `Excellent, unobstructed`;

    case "pressure":
      if (metric.value < 980) return `Stormy, unstable weather`;
      if (metric.value < 1000) return `Cloudy or rainy`;
      if (metric.value < 1020) return `Stable, pleasant`;
      return `Clear and dry`;

    case "feelslike":
      if (metric.value < 0) return `Freezing, risk of ice`;
      if (metric.value < 10) return `Cold, wear layers`;
      if (metric.value < 20) return `Cool, comfortable`;
      if (metric.value < 30) return `Warm, mild heat`;
      return `Hot, possible heat stress`;

    case "uvIndex":
      if (metric.value < 2) return `Low risk, minimal protection needed`;
      if (metric.value < 5)
        return `Moderate risk, wear sunscreen and protective clothing`;
      if (metric.value < 7)
        return `High risk, limit exposure, use sunscreen, and protective gear.`;
      if (metric.value < 10)
        return `Very high risk, stay indoors or take extreme precautions`;
      return `Extreme risk, avoid outdoor activities, and take full protection`;

    case "pollution":
      if (metric.value < 1)
        return `Good air quality, safe for all outdoor activities`;
      if (metric.value < 2)
        return `Moderate air quality, sensitive groups may need to take precautions`;
      if (metric.value < 3)
        return `Unhealthy for sensitive groups, limit prolonged outdoor exertion`;
      if (metric.value < 4)
        return `Unhealthy, everyone should reduce outdoor exposure`;
      if (metric.value < 5)
        return `Very unhealthy, avoid outdoor activities and stay indoors`;
      return `Hazardous, do not go outside and stay indoors at all times`;

    default:
      return `Unknown data`;
  }
}
