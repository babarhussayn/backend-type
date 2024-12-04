export type TProduct = {
  name?: string; // Optional as it's not marked `required` in the schema
  description: string;
  price: number;
  stock: string; // Should this be `number`? `min` works with numbers, not strings.
  imageurl: string[]; // Array of strings
  title: string;
  category: Types.ObjectId; // Reference to the Category model
  size?: "small" | "medium" | "large" | "extraLarge"; // Enum with default value
  createdAt?: Date; // Automatically added by timestamps
  updatedAt?: Date; // Automatically added by timestamps
};
