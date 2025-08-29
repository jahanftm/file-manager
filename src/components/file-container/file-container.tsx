import { useFileManager } from "../../context/file-manager-context";
import NodeTree from "../node-tree/node-tree";
import NodeDialog from "../node-dialog/node-dialog.tsx";
import { useState, useCallback } from "react";
import { findNodeById } from "../../utils/find-node.ts";
import { showFolderDeleteConfirmToast } from "../confiramation-dialog/confirmation-dialog.tsx";
import type { FileExtension } from "../../types/file-item.types.ts";

function FileContainer() {
  const { state, dispatch } = useFileManager();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"file" | "folder">("file");
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<{ id: string; name: string; extension?: FileExtension } | null>(null);

  const openCreateModal = useCallback((type: "file" | "folder", parentId: string) => {
    setModalType(type);
    setModalMode("create");
    setCurrentParentId(parentId);
    setEditingNode(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((nodeId: string) => {
    const node = findNodeById(state.root, nodeId);
    if (!node) return;

    setModalType(node.type);
    setModalMode("edit");
    setCurrentParentId(null);
    setEditingNode({ id: nodeId, name: node.name, extension: node.extension as FileExtension | undefined });
    setModalOpen(true);
  }, [state.root]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setCurrentParentId(null);
    setEditingNode(null);
  }, []);

  const handleConfirm = useCallback((name: string, extension?: FileExtension) => {
    if (modalMode === "create" && currentParentId) {
      // Creating new file/folder
      if (modalType === "file" && extension) {
        dispatch({ type: "ADD_FILE", parentId: currentParentId, name, extension });
      }
      if (modalType === "folder") {
        dispatch({ type: "ADD_FOLDER", parentId: currentParentId, name });
      }
    } else if (modalMode === "edit" && editingNode) {
      // Editing existing file/folder
      dispatch({ type: 'EDIT_NODE', id: editingNode.id, name, extension });
    }

    closeModal();
  }, [modalMode, currentParentId, modalType, editingNode, dispatch, closeModal]);

  const handleDelete = useCallback((id: string) => {
    const node = findNodeById(state.root, id);
    if (!node) return;

    if (node.type === "file") {
      // delete promptly
      dispatch({ type: "DELETE_NODE", id });
    }

    if (node.type === "folder") {
      // delete by confirmation using toast
      showFolderDeleteConfirmToast(node.name, () => dispatch({ type: "DELETE_NODE", id }));
    }
  }, [state.root, dispatch]);

  const handleEdit = useCallback((nodeId: string) => {
    openEditModal(nodeId);
  }, [openEditModal]);

  return (
    <div>
      <NodeTree
        node={state.root}
        rootId={state.root.id}
        onAddFile={(parentId) => openCreateModal("file", parentId)}
        onAddFolder={(parentId) => openCreateModal("folder", parentId)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <NodeDialog
        isOpen={modalOpen}
        type={modalType}
        mode={modalMode}
        onClose={closeModal}
        onConfirm={handleConfirm}
        initialData={editingNode || undefined}
      />
    </div>
  );
}

export default FileContainer;
