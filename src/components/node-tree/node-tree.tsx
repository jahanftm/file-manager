import { memo } from 'react';
import FileItem from '../file-item/file-item';
import type { NodeTreeProps } from "../../types/node-tree.ts";
import s from "./node-tree.module.scss"

const NodeTree = memo(function NodeTree({node, onAddFile, onAddFolder, onDelete, onEdit, rootId}: NodeTreeProps) {

  return (
    <div style={{paddingLeft: '20px'}}>
      <FileItem
        name={node.name}
        type={node.type}
        extension={node?.extension}
        isRoot={node.id === rootId}
        onDelete={() => onDelete(node.id)}
        onEdit={() => onEdit(node.id)}
      />

      {node.type === 'folder' && (
        <>
          <div className={s.btns}>
            <button onClick={() => onAddFile(node.id)}>Add File 📄</button>
            <button onClick={() => onAddFolder(node.id)}>Add Folder 📂</button>
          </div>
          {node.children?.map(child => (
            <NodeTree
              key={child.id}
              node={child}
              rootId={rootId}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default NodeTree;
