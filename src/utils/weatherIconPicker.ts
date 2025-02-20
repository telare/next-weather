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
    case "Clear":
      return lightThemeIcon;
    case "Clouds":
      return cloudSunIcon;
    case "Rain":
      return cloudRainIcon;
    case "Thunderstorm":
      return thunderstormIcon;
    case "Snow":
      return snowFlakeIcon;
    case "Mist":
      return cloudfogIcon;
    case "Ash":
      return cloudfogIcon;
    case "Smoke":
      return cloudfogIcon;
    case "Haze":
      return cloudfogIcon;
    case "Dust":
      return cloudfogIcon;
    case "Fog":
      return cloudfogIcon;
    case "Sand":
      return sandIcon;
    default:
      return lightThemeIcon;
  }
}
