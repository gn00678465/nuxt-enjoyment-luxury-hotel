declare module '#app' {
  interface PageMeta {
    contentClass?: string;
    headerClass?: string;
    navClass?: string;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
