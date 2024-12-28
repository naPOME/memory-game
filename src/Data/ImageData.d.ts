// imageData.d.ts
declare module "*.json" {
    const value: {
      [key: string]: string[];
    };
    export default value;
  }