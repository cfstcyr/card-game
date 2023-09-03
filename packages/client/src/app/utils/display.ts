export function isRunningStandalone() {
    return ((window.navigator as any).standalone === true) || (window.matchMedia('(display-mode: standalone)').matches);
}