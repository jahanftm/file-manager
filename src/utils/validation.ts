import type { FileNode } from "../types/context.type.ts";
import { fileExtensions } from "../components/node-dialog/node-dialog.const.ts";
import type { FileExtension, FileNodeType } from "../types/file-item.types.ts";

export function validateNode(
  name: string,
  type: FileNodeType,
  parentChildren: FileNode[],
  extension?: FileExtension
): { valid: boolean; message?: string } {
  if (!name?.trim()) return { valid: false, message: 'Name cannot be empty' };

  const forbiddenChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
  if (forbiddenChars.test(name)) return { valid: false, message: 'Name contains forbidden characters' };

  if (type === 'folder') {
    if (parentChildren.some(c => c.name === name && c.type === 'folder')) {
      return { valid: false, message: 'Folder name already exists in parent directory' };
    }
  }

  if (type === 'file') {
    if (!extension) return { valid: false, message: 'File extension is required' };
    if (!fileExtensions.includes(extension)) {
      return { valid: false, message: 'Invalid file extension' };
    }

    if (parentChildren.some(c => c.type === 'file' && c.name === name && c.extension === extension)) {
      return { valid: false, message: 'File with same name and extension already exists in parent directory' };
    }
  }

  return { valid: true };
}
