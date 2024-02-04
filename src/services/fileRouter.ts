import path from "path";
import { readdir } from "node:fs/promises";
import { Hono } from "hono";
import { renderComponent } from "@/core";

type FileRouterConfig = {
  routesPath: string;
};

type RouteDef = {
  originalFilePath: string;
  originalFileName: string;
  segments: string[];
  route: string;
};

const defaultConfig: FileRouterConfig = {
  routesPath: "./src/pages",
};

function camelToKebabCase(fileName: string) {
  // Replace capital letters (excluding the first character) with a hyphen and the lowercase letter
  // Then convert the entire string to lowercase
  const kebabCaseFileName = fileName
    .replace(/\.tsx$/, "") // Remove the .tsx extension first
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert a hyphen between lower and upper case letters
    .toLowerCase(); // Convert the entire string to lowercase

  return kebabCaseFileName;
}

export class FileRouter {
  private config: FileRouterConfig;

  constructor(config: FileRouterConfig = defaultConfig) {
    this.config = config;
  }

  private async getRoutes() {
    const files = await readdir(this.config.routesPath, {
      recursive: true,
    });

    const templateFiles = files.filter((el) => path.extname(el) === ".tsx");

    const routeDefs: RouteDef[] = [];

    for (const file of templateFiles) {
      routeDefs.push(this.createRouteDef(file));
    }

    return routeDefs;
  }

  private createRouteDef(filepath: string): RouteDef {
    const segments = filepath.split("/");
    const originalFileName = segments[segments.length - 1];

    segments.splice(-1, 1);

    segments.push(camelToKebabCase(originalFileName));

    return {
      originalFilePath: this.config.routesPath + "/" + filepath,
      originalFileName,
      segments,
      route: segments.join("/"),
    };
  }

  public async getRouter() {
    const routes = await this.getRoutes();
    const app = new Hono();

    for (const route of routes) {
      app.get("/" + route.route, async (c) => {
        const pagePath = path.join(
          import.meta.dir,
          "../../",
          route.originalFilePath
        );

        const page = await import(pagePath);
        for (const exportName in page) {
          if (page.hasOwnProperty(exportName)) {
            return renderComponent(c, page[exportName]());
          }
        }

        throw new Error(
          `No default export or named exports found in module: ${pagePath}`
        );
      });
    }

    return app;
  }
}
