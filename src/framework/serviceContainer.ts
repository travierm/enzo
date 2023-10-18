type ServiceStore<T> = {
  [key: string]: () => T;
};

export class ServiceContainer {
  private services: ServiceStore<any> = {};

  public register<T>(name: string, callback: () => T): void {
    this.services[name] = callback;
  }

  public resolve<T>(
    target: { new (...args: any[]): T } | ((...args: any[]) => T)
  ): T;
  public resolve<T>(name: string): T;
  public resolve<T>(arg: any): T {
    let name: string;

    if (typeof arg === "string") {
      name = arg;
    } else {
      name = arg.name;
    }

    if (!name) {
      throw new Error("No service name provided");
    }

    const callback = this.services[name];
    const service = callback();

    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    return service as T;
  }
}
