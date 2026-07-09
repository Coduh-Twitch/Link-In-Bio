import { PRIVATE_TWITCH_TK } from "$env/static/private";
import { PUBLIC_CLIENT_ID, PUBLIC_TWITCH_CHANNEL } from "$env/static/public";
import axios from "axios";

export const load = async () => {
  try {
    const streamRes = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${PUBLIC_TWITCH_CHANNEL}`,
      {
        headers: {
          "Client-Id": PUBLIC_CLIENT_ID,
          Authorization: `Bearer ${PRIVATE_TWITCH_TK}`,
        },
      },
    );

    console.log("STREAM RES", streamRes.data);

    const stream = streamRes.data?.data?.[0];

    let vod = null;

    if (!stream) {
      const userRes = await axios.get(
        `https://api.twitch.tv/helix/users?login=${PUBLIC_TWITCH_CHANNEL}`,
        {
          headers: {
            "Client-Id": PUBLIC_CLIENT_ID,
            Authorization: `Bearer ${PRIVATE_TWITCH_TK}`,
          },
        },
      );

      console.log("user res", userRes.data);

      if (userRes && userRes.data?.data?.[0]?.id) {
        let user = userRes.data.data[0];

        const videoRes = await axios.get(
          `https://api.twitch.tv/helix/videos?user_id=${user.id}`,
          {
            headers: {
              "Client-Id": PUBLIC_CLIENT_ID,
              Authorization: `Bearer ${PRIVATE_TWITCH_TK}`,
            },
          },
        );

        vod = videoRes.data?.data?.[0] || null;
        console.log("VOD", vod);
      }
    }

    return {
      stream: stream || null,
      vod: vod || null,
    };
  } catch (e) {
    console.log("STREAM ERROR", e);
    return {
      stream: null,
      vod: null,
    };
  }
};
