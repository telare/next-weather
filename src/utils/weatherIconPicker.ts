import {
  cloudfogIcon,
  cloudRainIcon,
  cloudSunIcon,
  lightThemeIcon,
  sandIcon,
  snowFlakeIcon,
  thunderstormIcon,
} from "./Icons";

export function weatherIconPicker(
  weatherDescription: string
): React.ReactElement {
  switch (weatherDescription) {
    case "Clouds":
      return cloudSunIcon;
    case "Rain":
      return cloudRainIcon;
    case "Thunderstorm":
      return thunderstormIcon;
    case "Snow":
      return snowFlakeIcon;
    case "Mist":
    case "Ash":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
      return cloudfogIcon;
    case "Sand":
      return sandIcon;
    case "Clear":
    default:
      return lightThemeIcon;
  }
}
