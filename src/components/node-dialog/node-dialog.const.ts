import type { FileExtension } from "../../types/file-item.types.ts";

export const fileExtensions: FileExtension[] = [
  'txt', 'md', 'js', 'ts', 'jsx', 'tsx',
  'pdf', 'png', 'jpg', 'jpeg', 'mp3', 'mp4',
] as const;