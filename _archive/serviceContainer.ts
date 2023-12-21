type Constructor<T> = { new (...args: any[]): T };
type DependencyProvider<T> = Constructor<T> | (() => T);

const dependencies: Map<string, any> = new Map();
const providers: Map<string, DependencyProvider<any>> = new Map();

// Type guard to check if a provider is a constructor
function isConstructor<T>(
  provider: DependencyProvider<T>
): provider is Constructor<T> {
  return provider.prototype !== undefined;
}

function register<T>(token: string, provider: DependencyProvider<T>): void {
  console.log(`registered container service: ${token}`);

  providers.set(token, provider);

  // Use the type guard to check if 'provider' is a constructor
  if (isConstructor(provider)) {
    dependencies.set(token, new provider());
  }
}

function resolve<T>(token: string): T {
  if (!dependencies.has(token) && providers.has(token)) {
    const provider = providers.get(token);
    if (provider) {
      if (isConstructor(provider)) {
        // Instantiate if it's a constructor
        dependencies.set(token, new provider());
      } else if (typeof provider === "function") {
        // Call if it's a factory function
        dependencies.set(token, provider());
      }
    }
  }

  const dependency = dependencies.get(token);
  if (!dependency) {
    throw new Error(`Dependency not found: ${token}`);
  }
  return dependency as T;
}

function replaceDependency<T>(token: string, newDependency: T): void {
  dependencies.set(token, newDependency);
}

// Injectable decorator
function Injectable<T>(token?: string) {
  return function (constructor: Constructor<T>) {
    const resolvedToken = token || constructor.name;
    register(resolvedToken, constructor);
  };
}

export { register, resolve, replaceDependency, Injectable };
