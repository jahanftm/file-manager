import { createContext, useReducer, useContext, type ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import type { FileNode, State, Action } from '../types/context.type.ts';
import { validateNode } from '../utils/validation.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { initialState } from './file-manager-context.consts.ts';
import type { FileExtension } from "../types/file-item.types.ts";


function addNode(node: FileNode, parentId: string, newNode: FileNode): FileNode {
  if (node.id === parentId && node.type === 'folder') {
    return { ...node, children: [...(node.children || []), newNode] };
  }
  if (node.children) {
    return { ...node, children: node.children.map(c => addNode(c, parentId, newNode)) };
  }
  return node;
}

function deleteNode(node: FileNode, id: string): FileNode | null {
  if (node.id === id) return null;
  if (node.children) {
    const newChildren = node.children.map(c => deleteNode(c, id)).filter(Boolean) as FileNode[];
    return { ...node, children: newChildren };
  }
  return node;
}

function editNode(node: FileNode, id: string, newName: string, newExt?: FileExtension): FileNode {
  if (node.id === id) return { ...node, name: newName, extension: newExt ?? node.extension };
  if (node.children) return { ...node, children: node.children.map(c => editNode(c, id, newName, newExt)) };
  return node;
}

function findParentNode(root: FileNode, parentId: string): FileNode | null {
  if (root.id === parentId) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findParentNode(child, parentId);
      if (found) return found;
    }
  }
  return null;
}


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FILE': {
      const { parentId, name, extension } = action;
      const parentNode = findParentNode(state.root, parentId);
      if (!parentNode || parentNode.type !== 'folder') {
        toast.error('Parent folder not found');
        return state;
      }
      const validation = validateNode(name, 'file', parentNode.children || [], extension);
      if (!validation.valid) {
        toast.error(validation.message || 'Validation failed');
        return state;
      }
      const newFile: FileNode = { id: uuidv4(), name, type: 'file', extension };
      toast.success(`File "${name}.${extension}" created successfully!`);
      return { root: addNode(state.root, parentId, newFile) };
    }

    case 'ADD_FOLDER': {
      const { parentId, name } = action;
      const parentNode = findParentNode(state.root, parentId);
      if (!parentNode || parentNode.type !== 'folder') {
        toast.error('Parent folder not found');
        return state;
      }
      const validation = validateNode(name, 'folder', parentNode.children || []);
      if (!validation.valid) {
        toast.error(validation.message || 'Validation failed');
        return state;
      }
      const newFolder: FileNode = { id: uuidv4(), name, type: 'folder', children: [] };
      toast.success(`Folder "${name}" created successfully!`);
      return { root: addNode(state.root, parentId, newFolder) };
    }

    case 'DELETE_NODE': {
      const { id } = action;
      if (state.root.id === id) {
        toast.error('Cannot delete root folder');
        return state;
      }
      return { root: deleteNode(state.root, id)! };
    }

    case 'EDIT_NODE': {
      const { id, name, extension } = action;
      const validation = validateNode(name, 'file', state.root.children || [], extension);
      if (!validation.valid) {
        toast.error(validation.message || 'Validation failed');
        return state;
      }
      toast.success(`Node renamed to "${name}${extension ? `.${extension}` : ''}"`);
      return { root: editNode(state.root, id, name, extension) };
    }

    default:
      return state;
  }
}

// --- Context ---
const FileManagerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export function FileManagerProvider({ children }: { children: ReactNode }) {
  const [storedRoot, setStoredRoot] = useLocalStorage('file-manager-tree', initialState.root);
  const [state, dispatch] = useReducer(reducer, { root: storedRoot });

  useEffect(() => {
    setStoredRoot(state.root);
  }, [state.root, setStoredRoot]);

  return (
    <FileManagerContext.Provider value={{ state, dispatch }}>
      {children}
    </FileManagerContext.Provider>
  );
}

export function useFileManager() {
  return useContext(FileManagerContext);
}
