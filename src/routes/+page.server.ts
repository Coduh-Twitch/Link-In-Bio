import { PRIVATE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_CLIENT_ID, PUBLIC_TWITCH_CHANNEL } from "$env/static/public";
import { clearTokens, getToken, setToken } from "$lib/server/db/util";
import axios from "axios";

export const load = async () => {
  let token: string | null = getToken();

  try {
    const validationRes = await axios.get(
      `https://id.twitch.tv/oauth2/validate`,
      {
        headers: {
          "Client-Id": PUBLIC_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!validationRes.data || validationRes.status !== 200) {
      token = null;
    }

  } catch (e) {
    token = null;
  }

  if (!token) {
    clearTokens();
    const params = new URLSearchParams();
    params.append("client_id", PUBLIC_CLIENT_ID);
    params.append("client_secret", PRIVATE_CLIENT_SECRET);
    params.append("grant_type", "client_credentials");

    try {
      const newTokenRes = await axios.post(`https://id.twitch.tv/oauth2/token`, params.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

      console.log("NEW TOKEN RES", newTokenRes.data)
      if (newTokenRes?.data && newTokenRes?.data?.access_token) {
        token = newTokenRes.data.access_token
        setToken(token as string);

      } else token = null;
    } catch (e) {
      console.log("NEW TOKEN ERROR", e)
    }
  }

  if (token) {
    try {
      const streamRes = await axios.get(
        `https://api.twitch.tv/helix/streams?user_login=${PUBLIC_TWITCH_CHANNEL}`,
        {
          headers: {
            "Client-Id": PUBLIC_CLIENT_ID,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("STREAM RES", streamRes.data);

      const stream = streamRes.data?.data?.[0];

      let vod = null;

      if (!stream) {
        const userRes = await axios.get(
          `https://api.twitch.tv/helix/users?login=${PUBLIC_TWITCH_CHANNEL}`,
          {
            headers: {
              "Client-Id": PUBLIC_CLIENT_ID,
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // console.log("user res", userRes.data);

        if (userRes && userRes.data?.data?.[0]?.id) {
          let user = userRes.data.data[0];

          const videoRes = await axios.get(
            `https://api.twitch.tv/helix/videos?user_id=${user.id}`,
            {
              headers: {
                "Client-Id": PUBLIC_CLIENT_ID,
                Authorization: `Bearer ${token}`,
              },
            },
          );

          vod = videoRes.data?.data?.[0] || null;
          // console.log("VOD", vod);
        }
      }

      return {
        stream: stream || null,
        vod: vod || null,
      };
    } catch (e) {
      // console.log("STREAM ERROR", e);
      return {
        stream: null,
        vod: null,
      };
    }
  } else return { stream: null, vod: null };
};
