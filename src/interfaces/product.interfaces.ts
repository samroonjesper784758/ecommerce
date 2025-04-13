export interface createProductDto {
  name: string;
  description: string;
  tags: string[];
  price: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
}
