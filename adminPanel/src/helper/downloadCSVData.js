export const handleDownloadCSVData = (blob, fileName = "csvData") => {
  if (!blob) return;

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${fileName}.csv`;
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
