import { ScrapeResult } from "../../firebase/store/resultHandler";

export const sortResultsByDate = (results: ScrapeResult[]) => {
  let returnObject: any = {};
  let dates = [];
  for (let result of results) {
    const jsDateObject = new Date(result.scrapeDatetime.toDate());
    const ddmmyyyy = `${jsDateObject.getDate() + 1}/${
      jsDateObject.getMonth() + 1
    }/${jsDateObject.getFullYear()}`;
    if (!Object.keys(returnObject).includes(ddmmyyyy)) {
      dates.push(ddmmyyyy);
      returnObject[ddmmyyyy] = [result];
    } else {
      returnObject[ddmmyyyy].push(result);
    }
  }
  dates.reverse();
  return [dates as string[], returnObject];
};
