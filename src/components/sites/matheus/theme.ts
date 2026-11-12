export const LIGHT_THEME = "cream";
export const DARK_THEME = "tokyo-night";
export const THEME_STORAGE_KEY = "matheus-theme";

// Runs before first paint: restores the theme and, unless the visitor prefers reduced motion,
// sets html[data-motion] so motion.css hides animated elements in their start state (no flash).
// If SiteMotion never mounts (script error), the safety timer reveals everything again.
export const themeBootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="${LIGHT_THEME}"||t==="${DARK_THEME}")d.dataset.theme=t;}catch(e){}if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","");setTimeout(function(){if(!d.hasAttribute("data-motion-ready"))d.removeAttribute("data-motion");},4000);}})();`;
