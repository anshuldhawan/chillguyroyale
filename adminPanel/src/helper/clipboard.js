export const copyToClipBoard = (string, tooltip) => {
  tooltip(true);
  navigator.clipboard?.writeText(string);

  setTimeout(() => {
    tooltip(false);
  }, 1000);
};
