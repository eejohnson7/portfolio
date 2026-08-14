import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

const presentationByCategory = {
  backend: {
    label: "Backend Systems",
    Icon: HubRoundedIcon,
    surface: "rgba(255, 219, 233, 0.72)"
  },
  full_stack: {
    label: "Full-Stack",
    Icon: CodeRoundedIcon,
    surface: "rgba(255, 255, 255, 0.62)"
  },
  data_analytics: {
    label: "Data & Analytics",
    Icon: InsightsRoundedIcon,
    surface: "rgba(255, 250, 252, 0.82)"
  },
  platform: {
    label: "Platform Engineering",
    Icon: AccountTreeRoundedIcon,
    surface: "rgba(255, 255, 255, 0.62)"
  },
  personal: {
    label: "Personal Project",
    Icon: AutoAwesomeRoundedIcon,
    surface: "rgba(255, 255, 255, 0.42)"
  }
};

const defaultPresentation = {
  label: "Engineering Project",
  Icon: CodeRoundedIcon,
  surface: "rgba(255, 255, 255, 0.58)"
};

export function getProjectPresentation(category) {
  return presentationByCategory[category] || defaultPresentation;
}
