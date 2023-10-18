type ParsedParam = {key: string, index: number};

class RadixTreeNode {
  label: string;
  handler: Function | null;
  children: RadixTreeNode[];
  params: ParsedParam[];

  constructor(label: string) {
      this.label = label;
      this.handler = null;
      this.children = [];
      this.params = [];
  }
}

export class RadixTree {
  root: RadixTreeNode;

  constructor() {
      this.root = new RadixTreeNode("");
  }

  insert(path: string, handler: Function): void {
      const segments = path.split("/").filter(segment => segment !== "");

      let currentNode = this.root;
      for (let i = 0; i < segments.length; i++) {
          const segment = segments[i];
          let childNode = currentNode.children.find(node => node.label === segment);

          if (!childNode) {
              childNode = new RadixTreeNode(segment);
              currentNode.children.push(childNode);
          }

          currentNode = childNode;
      }

      currentNode.params = this.buildParams(path, segments);
      currentNode.handler = handler;
  }

  buildParams(path:string, segments: string[]) {
    const params = path.match(/:([^/]+)/g) || [] as string[];
    
    const parsedParams = [] as ParsedParam[];

    for (const param of params) {
      const paramName = param.substring(1);
      const paramIndex = segments.indexOf(param);
      parsedParams.push({key: paramName, index: paramIndex});
    }

    return parsedParams;
  }
  
  search(path: string): { handler: Function | null; params: Map<string, string> } | null {
    const segments = path.split("/").filter(segment => segment !== "");
    let currentNode = this.root;

    for (const segment of segments) {
      const exactChild = currentNode.children.find(node => node.label === segment);

      if (exactChild) {
        currentNode = exactChild;
      } else {
        const paramNode = currentNode.children.find(node => node.label.startsWith(":"));

        if (paramNode) {
          currentNode = paramNode;
        } else {
          return null; // Path not found
        }
      }
    }

    return {
      handler: currentNode.handler,
      params: this.createParamsMap(currentNode.params, segments),
    };
  }

  createParamsMap(params: ParsedParam[], segments: string[]) {
    const mp = new Map<string, string>();


    for (const param of params) {
      mp.set(param.key, segments[param.index]);
    }

    return mp;
}
}