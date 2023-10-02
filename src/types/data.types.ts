export type TItem = {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
  };
  export type TCategory = {
    items: TItem[];
    title: string;
  };
  export type TProducts = {
    men: TCategory[];
    women: TCategory[];
  };
  export type TCartItem = TItem & {
    quantity: number;
  }