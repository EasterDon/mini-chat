import { Socket } from "socket.io";

import { friends_profile as get } from "#services/ws/index.js";

export const get_friends_profile = async (
  socket: Socket,
  msg: any,
  akt: any,
) => {
  try {
    const friends_profile = await get(msg.id);
    akt({ status: true, friends_profile });
  } catch (error) {
    akt({ status: false, friends_profile: null });
  }
};
