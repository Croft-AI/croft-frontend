import { ScrapeResult } from "../../firebase/store/resultHandler";

export const downloadCSV = (name: string, twoDArray: string[][]) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  twoDArray.forEach((rowArray) => {
    rowArray = rowArray.map((item) => {
      item = item.replaceAll('"', '""');
      return `"${item}"`;
    });
    let row = rowArray.join(",");
    console.log(row);
    csvContent += row + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.style.display = "none";
  link.setAttribute("download", `${name}.csv`); //change it to give your own name
  link.innerHTML = "Click Here to download";
  document.body.appendChild(link); // Required for FF

  link.click();
  link.remove(); //removing the link after the download
};

export const exportJSONData = (filename: string, data: ScrapeResult) => {
  const { result, scrapeDatetime } = data;
  const JSONData = { result, scrapeDatetime };
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(JSONData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${filename}.json`;

  link.click();
};
