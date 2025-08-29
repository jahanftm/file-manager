import type { FileExtension, FileNodeType } from "./file-item.types.ts";

export type NodeModeType = 'create' | 'edit';

export interface NodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, extension?: FileExtension) => void;
  type: FileNodeType
  mode: NodeModeType;
  initialData?: {
    name: string;
    extension?: FileExtension;
  };
}

export interface NodeTreeProps {
  node: Node;
  onAddFile: (parentId: string) => void;
  onAddFolder: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
  onEdit: (nodeId: string) => void;
  rootId: string;
}

export type Node = {
  id: string;
  name: string;
  type: FileNodeType;
  extension?: FileExtension;
  children?: Node[];
};