import s from './node-dialog.module.scss';
import { useState, useEffect, useCallback } from "react";
import type { NodeDialogProps } from "../../types/node-tree.ts";
import { fileExtensions } from "./node-dialog.const.ts";
import type { FileExtension } from "../../types/file-item.types.ts";


function NodeDialog({ isOpen, onClose, onConfirm, type, mode, initialData }: NodeDialogProps) {
  const [name, setName] = useState('');
  const [extension, setExtension] = useState<FileExtension | undefined>(undefined);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        initialData.extension && setExtension(initialData.extension);
      } else {
        setName('');
        setExtension(fileExtensions[0]);
      }
    }
  }, [isOpen, initialData]);

  const handleConfirm = useCallback(() => {
    onConfirm(name, type === 'file' ? extension : undefined);
    setName('');
    setExtension(undefined);
  }, [onConfirm, name, extension, type]);

  const handleClose = useCallback(() => {
    setName('');
    setExtension(undefined);
    onClose();
  }, [onClose]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleExtensionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setExtension(e.target.value as FileExtension);
  }, []);

  if (!isOpen) return null;

  const isEditMode: boolean = mode === 'edit';
  const title = isEditMode 
    ? `Edit ${type === 'file' ? 'File' : 'Folder'}`
    : `Add ${type === 'file' ? 'File' : 'Folder'}`;
  
  const confirmButtonText = isEditMode ? 'Save' : 'Add';

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h3>{title}</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        {type === 'file' && (
          <select
            value={extension}
            onChange={handleExtensionChange}
          >
            {fileExtensions.map((extension) => (
              <option key={extension} value={extension}>.{extension}</option>
            ))}
          </select>
        )}
        <div className={s.actions}>
          <button onClick={handleConfirm}>{confirmButtonText}</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NodeDialog;
