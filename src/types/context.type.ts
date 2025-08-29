import type { FileExtension, FileNodeType } from "./file-item.types.ts";

export type FileNode = {
  id: string;
  name: string;
  type: FileNodeType;
  extension?: FileExtension;
  children?: FileNode[];
};

export type State = {
  root: FileNode;
};

export type Action =
  | { type: 'ADD_FILE'; parentId: string; name: string; extension: FileExtension }
  | { type: 'ADD_FOLDER'; parentId: string; name: string }
  | { type: 'DELETE_NODE'; id: string }
  | { type: 'EDIT_NODE'; id: string; name: string; extension?: FileExtension };
