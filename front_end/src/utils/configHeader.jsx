import { Cookies } from "react-cookie";

export const configHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${new Cookies().get("token")}`,
};
