import { memo } from 'react';
import s from './file-item.module.scss'
import type { FileItemProps } from "../../types/file-item.types.ts";

const FileItem = memo(function FileItem({name, type, isRoot, extension, onEdit, onDelete}: FileItemProps) {
  return (
    <div className={s.fileItem}>
      <div className={s.fileInfo}>
        <div className={type === 'folder' ? s.yellowFolder : ''}>
          {type === 'file' ? '📄' : '📂'}
        </div>
        <div>
          <span className={s.fileName}>{name}</span>
          {extension && <span>.{extension}</span>}
        </div>
      </div>
      {!isRoot && <div className={s.actions}>
        <button onClick={onEdit} title="Edit">✎</button>
        <button className={s.delete} onClick={onDelete} title="Delete">❌</button>
      </div>}
    </div>
  )
});

export default FileItem;