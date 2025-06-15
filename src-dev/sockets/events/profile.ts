import { Socket } from "socket.io";

import * as service from "#services/sockets/index.js";

export const get_friends_profile = async (
  socket: Socket,
  msg: any,
  akt: any,
) => {
  try {
    const friends_profile = await service.get_friends_profile(msg.id);
    akt({ status: true, friends_profile });
  } catch (error) {
    akt({ status: false, friends_profile: null });
  }
};
