const v2 = "https://v2.api.noroff.dev/";
const holidaze = v2 + "holidaze";

export const venuesUrl = holidaze + "/venues";
export const profilesUrl = holidaze + "/profiles";
export const bookingsUrl = holidaze + "/bookings";
export const searchUrl = venuesUrl + "/search?q=";
export const createdByUrl =
  venuesUrl + "?sort=created&sortOrder=desc&_owner=true&page=";

export const registerUrl = v2 + "auth/register";
export const loginUrl = v2 + "auth/login?_holidaze=true";
export const apiKeyUrl = v2 + "auth/create-api-key";

export const currency = "NOK";
export const unit = "/day";
export const timeout = 2000;
export const defaultAvatar = "https://robohash.org/prof";
export const noImageUrl =
  "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
