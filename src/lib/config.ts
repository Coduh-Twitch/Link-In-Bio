export interface Social {
  id: string;
  icon: string;
  handle: string;
  handlePrefix: string;
  description?: string;
  color: string;
  url: string;
}

export interface Redirect {
  id: string;
  url: string;
}

interface AppConfigTypes {
  urls: {
    source: string;
  },
  redirects: Redirect[];
  socials: Social[];
}

export const AppConfig: AppConfigTypes = {
  urls: {
    source: "https://github.com/Coduh-Twitch/Link-In-Bio"
  },
  redirects: [
    {
      id: "files",
      url: "https://coduh-files.ducky.wiki",
    },
  ],
  socials: [
    {
      id: "twitch",
      handle: "coduh",
      handlePrefix: "@",
      color: "#4400A9",
      icon: "/assets/icons/twitch.png",
      url: "https://twitch.tv/coduh",
      description: "Streams every Thursday-Sunday",
    },
    {
      id: "schedule",
      handle: "Stream Schedule",
      handlePrefix: "",
      color: "#4400A9",
      icon: "/assets/icons/twitch.png",
      url: "https://twitch.tv/coduh/schedule",
      description: "THU/SUN 7:30pst/10:30est | FRI/SAT 8pst/11est",
    },
    {
      id: "tiktok",
      handle: "coduh",
      handlePrefix: "@",
      color: "#FB2B54",
      icon: "/assets/icons/tiktok.png",
      url: "https://twitch.tv/coduh",
      description: "Edited gaming content, and streams every Thursday-Sunday",
    },
    {
      id: "youtube",
      handle: "CoduhVODS",
      handlePrefix: "@",
      color: "#FF0033",
      icon: "/assets/icons/youtube.png",
      url: "https://youtube.com/@coduhvods",
      description: "VOD Archival Channel",
    },
    {
      id: "discord",
      handle: "Crib",
      handlePrefix: "Coduh's ",
      color: "#5865F2",
      icon: "/assets/icons/discord.png",
      url: "https://discord.gg/cTVvyh3zke",
      description: "Join {members} members!",
    },
    // {
    //   id: "youtube",
    //   handle: "coduh",
    //   handlePrefix: "@",
    //   color: "#FF0033",
    //   icon: "/assets/icons/youtube.png",
    //   url: "https://youtube.com/@coduh",
    // },
    {
      id: "github",
      handle: "Coduh-Twitch",
      handlePrefix: "@",
      color: "#0B0B0B",
      icon: "/assets/icons/github.png",
      url: "https://github.com/coduh-twitch",
      description: "You can find the code for most Coduh software projects on GitHub.",
    },
  ],
};
