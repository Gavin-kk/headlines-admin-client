let timer: number | null = null;

export const debounce = (fn: () => any, timeout: number): number => {
  if (timer) {
    clearTimeout(timer);
    return (timer = window.setTimeout(fn, timeout));
  }
  return (timer = window.setTimeout(fn, timeout));
};
