import { createContext, useReducer, useContext, type ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { FileNode, State, Action } from "../types/context.type.ts";
import { validateNode } from "../utils/validation.ts";
import toast from "react-hot-toast";
import { initialState } from "./file-manager-context.consts.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FILE': {
      const addFileAction = action as Extract<Action, { type: 'ADD_FILE' }>;
      function addFileRecursively(node: FileNode): FileNode {
        if (node.id === addFileAction.parentId && node.type === 'folder') {
          const validation = validateNode(addFileAction.name, 'file', node.children || [], addFileAction.extension);
          if (!validation.valid) {
            toast.error(validation.message || 'Validation failed');
            return node;
          }
          const newFile: FileNode = {
            id: uuidv4(),
            name: addFileAction.name,
            type: 'file',
            extension: addFileAction.extension,
          };
          return { ...node, children: [...(node.children || []), newFile] };
        }
        if (node.children) {
          return { ...node, children: node.children.map(addFileRecursively) };
        }
        return node;
      }
      return { root: addFileRecursively(state.root) };
    }

    case 'ADD_FOLDER': {
      const addFolderAction = action as Extract<Action, { type: 'ADD_FOLDER' }>;
      function addFolderRecursively(node: FileNode): FileNode {
        if (node.id === addFolderAction.parentId && node.type === 'folder') {
          const validation = validateNode(addFolderAction.name, 'folder', node.children || []);
          if (!validation.valid) {
            toast.error(validation.message || 'Validation failed');
            return node;
          }
          const newFolder: FileNode = {
            id: uuidv4(),
            name: addFolderAction.name,
            type: 'folder',
            children: [],
          };
          return { ...node, children: [...(node.children || []), newFolder] };
        }
        if (node.children) {
          return { ...node, children: node.children.map(addFolderRecursively) };
        }
        return node;
      }
      return { root: addFolderRecursively(state.root) };
    }

    case 'DELETE_NODE': {
      const deleteAction = action as Extract<Action, { type: 'DELETE_NODE' }>;
      function deleteRecursively(node: FileNode): FileNode | null {
        if (node.id === deleteAction.id) {
          if (node.name === 'Root') {
            toast.error('Cannot delete root folder');
            return node;
          }
          return null;
        }
        if (node.children) {
          const newChildren = node.children
            .map(deleteRecursively)
            .filter(Boolean) as FileNode[];
          return { ...node, children: newChildren };
        }
        return node;
      }
      return { root: deleteRecursively(state.root)! };
    }

    case 'EDIT_NODE': {
      const editAction = action as Extract<Action, { type: 'EDIT_NODE' }>;
      function editRecursively(node: FileNode): FileNode {
        if (node.id === editAction.id) {
          const validation = validateNode(editAction.name, node.type, node.children || [], editAction.extension);
          if (!validation.valid) {
            toast.error(validation.message || 'Validation failed');
            return node;
          }
          return { ...node, name: editAction.name, extension: editAction.extension ?? node.extension };
        }
        if (node.children) {
          return { ...node, children: node.children.map(editRecursively) };
        }
        return node;
      }
      return { root: editRecursively(state.root) };
    }

    default:
      return state;
  }
}

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
