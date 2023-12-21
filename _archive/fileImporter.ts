import { Glob } from "bun";

export const importAllFromPath = async (path: string) => {
  const glob = new Glob(path);

  for await (const file of glob.scan(".")) {
    try {
      // Correctly transform the path for the import statement
      const modulePath = `../../${file}`;
      await import(modulePath);
    } catch (error) {
      console.error(`Error importing file ${file}:`, error);
    }
  }
};
