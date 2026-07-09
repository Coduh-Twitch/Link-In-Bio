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
  redirects: Redirect[];
  socials: Social[];
}

export const AppConfig: AppConfigTypes = {
  redirects: [
    {
      id: "files",
      url: "https://coduh.ducky.wiki",
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
      id: "tiktok",
      handle: "coduh",
      handlePrefix: "@",
      color: "#FB2B54",
      icon: "/assets/icons/tiktok.png",
      url: "https://twitch.tv/coduh",
      description: "Edited gaming content, and streams every Thursday-Sunday",
    },
    {
      id: "youtube-vods",
      handle: "CoduhVODS",
      handlePrefix: "@",
      color: "#FF0033",
      icon: "/assets/icons/youtube.png",
      url: "https://youtube.com/@coduhvods",
      description: "VOD Archival Channel",
    },
    {
      id: "discord",
      handle: "cTVvyh3zke",
      handlePrefix: ".gg/",
      color: "#5865F2",
      icon: "/assets/icons/discord.png",
      url: "https://discord.gg/cTVvyh3zke",
      description: "Join {members} members!",
    },
    {
      id: "youtube",
      handle: "coduh",
      handlePrefix: "@",
      color: "#FF0033",
      icon: "/assets/icons/youtube.png",
      url: "https://youtube.com/@coduh",
    },
    {
      id: "github",
      handle: "Coduh-Twitch",
      handlePrefix: "@",
      color: "#0B0B0B",
      icon: "/assets/icons/github.png",
      url: "https://github.com/coduh-twitch",
      description: "Code for most Coduh software projects is open source.",
    },
  ],
};
