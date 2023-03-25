export interface ImpressionConfigType {
  url: string;
  items: ImpressionConfigItemType[];
  wait_for_selector?: string;
}

export interface ImpressionConfigItemType {
  title: string;
  css_selector: string;
  get_attributes: HTMLAttributes[];
}

export type HTMLAttributes = "class" | "id" | "href" | "src" | "title";
