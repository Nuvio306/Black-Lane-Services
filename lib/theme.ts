export const THEME_KEY = "Black Lane Services";

// Runs before first paint so a saved "day mode" never flashes dark.
export const themeInitScript = `(function(){try{if(localStorage.getItem("${THEME_KEY}")==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`;
