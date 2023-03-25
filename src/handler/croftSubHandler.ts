import axios from "axios";

export interface CroftSubPostConfig {
  url: string;
  impression_id: string;
  result_doc_id: string;
  items: object[];
  wait_for_selector?: string;
}

export const postCroftScrapeConfig = async (
  croftScrapeConfig: CroftSubPostConfig
) => {
  try {
    const body = {
      configs: [{ ...croftScrapeConfig, wait_for_selector: "html" }],
    };
    console.log(body);
    await axios.post(
      process.env.REACT_APP_CROFT_SCRAPE_ENDPOINT as string,
      body
    );
  } catch (e) {
    throw new Error(
      "There was a problem sending scraping configuration to workers at this momment!"
    );
  }
};
