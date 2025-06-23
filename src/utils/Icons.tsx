import {
  Github,
  Search,
  Command,
  MoveUp,
  Navigation,
  Sunset,
  Sunrise,
  Wind,
  SprayCan,
  SunDim,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudSun,
  Cloudy,
  CloudLightning,
  CloudFog,
  Shell,
  Gauge,
  Droplets,
  Thermometer,
  Eye,
  CalendarDays,
  XIcon,
  UsersRound,
  Moon,
} from "lucide-react";
import { ElementType } from "react";

function accessibleWrapper(Icon: ElementType, label?: string) {
  return (
    <Icon
      data-cy="icon"
      aria-hidden="true"
      focusable={false}
      aria-label={label ? label : ""}
    />
  );
}

export const searchIcon = accessibleWrapper(Search);
export const commandIcon = accessibleWrapper(Command);
export const navigationIcon = accessibleWrapper(Navigation);
export const thermometerIcon = accessibleWrapper(Thermometer);
export const sunSetIcon = accessibleWrapper(Sunset, "Sunset Icon");
export const sunRiseIcon = accessibleWrapper(Sunrise, "Sunrise Icon");
export const windIcon = accessibleWrapper(Wind, "Wind Icon");

export const cloudDrizzleIcon = accessibleWrapper(
  CloudDrizzle,
  "Cloud Drizzle Icon"
);
export const cloudRainIcon = accessibleWrapper(CloudRain, "Cloud Rain Icon");
export const snowFlakeIcon = accessibleWrapper(Snowflake, "Snowflake Icon");
export const cloudSunIcon = accessibleWrapper(CloudSun, "Cloud Sun Icon");
export const cloudyRainIcon = accessibleWrapper(Cloudy, "Cloudy Rain Icon");
export const pressureIcon = accessibleWrapper(Gauge, "Pressure Icon");
export const thunderstormIcon = accessibleWrapper(
  CloudLightning,
  "Thunderstorm Icon"
);
export const cloudfogIcon = accessibleWrapper(CloudFog, "Cloud Fog Icon");
export const sandIcon = accessibleWrapper(Shell, "Sand Icon");

export const pollutionIcon = accessibleWrapper(SprayCan);
export const humidityIcon = accessibleWrapper(Droplets);
export const visibilityIcon = accessibleWrapper(Eye);

export const calendarIcon = accessibleWrapper(CalendarDays);
export const userIcon = accessibleWrapper(UsersRound);
export const lightThemeIcon = accessibleWrapper(SunDim);
export const nightThemeIcon = accessibleWrapper(Moon);
export const githubIcon = accessibleWrapper(Github);
export const windDirectionIcon = accessibleWrapper(MoveUp);
export const closeIcon = accessibleWrapper(XIcon);
