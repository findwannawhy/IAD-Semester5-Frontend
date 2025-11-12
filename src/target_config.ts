// Конфигурация для переключения между dev режимом (через прокси) и Tauri build (прямое подключение по IP)
// Установите target_tauri = true перед сборкой Tauri приложения
// Установите target_tauri = false для разработки через npm run dev или npm run tauri dev

const target_tauri = false;

// IP адрес вашего сервера
export const api_proxy_addr = "http://192.168.1.4:8080";
export const img_proxy_addr = "http://192.168.1.4:9000";

// В зависимости от режима используем либо прокси (dev), либо прямой IP (Tauri build)
export const dest_api = target_tauri ? api_proxy_addr : "";
export const dest_img = target_tauri ? img_proxy_addr : "";
