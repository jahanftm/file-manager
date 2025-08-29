import type { FileNode } from "../types/context.type.ts";

export function findNodeById(root: FileNode, id: string): FileNode | null {
  if (root.id === id) return root;

  if (!root.children || root.children.length === 0) return null;

  for (const child of root.children) {
    if (child.id === id) return child;

    if (child.children && child.children.length > 0) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  
  return null;
}
