export type FileExtension =
  | 'txt' | 'md' | 'js' | 'ts' | 'jsx' | 'tsx'
  | 'pdf' | 'png' | 'jpg' | 'jpeg' | 'mp3' | 'mp4';

export type FileNodeType = 'file' | 'folder';

export type FileItemProps = {
  name: string;
  type: FileNodeType;
  extension?: FileExtension;
  isRoot?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};