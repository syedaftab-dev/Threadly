import { auth } from "@/lib/auth";

export const  { GET,POST, PUT, DELETE , PATCH } = auth.handler();
// ! this will handle all the auth routes like sign in, sign up, sign out, etc. and it will be used in the app/auth/[pathname]/page.tsx to render the correct form based on the pathname
//?  mathlab register,login etc ka code hum controller main likhthe the wo is main hai