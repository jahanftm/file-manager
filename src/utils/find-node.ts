import type { FileNode } from "../types/context.type.ts";

export function findNodeById(node: FileNode, id: string): FileNode | undefined {
  if (node.id === id) return node;

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }

  return undefined;
}
