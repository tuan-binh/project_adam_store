import { Cookies } from "react-cookie";

export const configHeader = {
  headers: {
    Authorization: `Bearer ${new Cookies().get("token")}`,
  },
};
