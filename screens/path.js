const authentication_service = "http://192.168.8.43:8001";
const usuarios_service = "http://192.168.8.43:8003";
const social_service = "http://192.168.8.43:8004";
const almacenamiento_service = "http://192.168.8.43:8005";
const publicaciones_service = "http://192.168.8.43:8006";
const notificaciones_service = "http://192.168.8.43:8007";
const copiloto_service = "https://8001-jesusbhz-redipoint-k3hynxrkp8y.ws-us115.gitpod.io";

export const pathToToken = `${authentication_service}/token`;
export const pathToRegistroUsuario = `${usuarios_service}/create_usuario`;
export const pathToGustosUsuario = `${usuarios_service}/create_interes_usuario`;
export const pathToCheckGustos = `${usuarios_service}/checkIntereses`;
export const pathToMyProfile = `${usuarios_service}/myProfile`;
export const pathMyFollowers = `${social_service}/myFollowers`;
export const pathMyPublicaciones = `${publicaciones_service}/myPublicaciones`;
export const pathUploadFotos = `${almacenamiento_service}/upload_photos`;
export const pathToPublicationForAdminNewPublication = `${notificaciones_service}/publicationForAdminNewPublication`;
export const pathToMyNotifications = `${notificaciones_service}/myNotifications`;
export const pathToEditPublication = `${publicaciones_service}/editPublicacion`;
export const pathToWatchWebGL = `${almacenamiento_service}/watchwebgl/`;
export const pathToGenerateWordsKey = `${copiloto_service}/generateWords`;
