import toast from "react-hot-toast";
import styles from "./confirmation-dialog.module.scss";

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: 'danger' | 'primary' | 'success';
}

export function showConfirmToast({
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonStyle = "danger"
}: ConfirmationDialogProps) {
  toast.custom(
    (t) => (
      <div className={styles.confirmationDialog}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles[confirmButtonStyle]}`}
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
            }}
          >
            {confirmText}
          </button>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={() => toast.dismiss(t.id)}
          >
            {cancelText}
          </button>
        </div>
      </div>
    ),
    { duration: 0, position: "top-center" }
  );
}


export function showFolderDeleteConfirmToast(folderName: string, onConfirm: () => void) {
  showConfirmToast({
    message: `Delete folder "${folderName}" and all its contents?`,
    onConfirm,
    confirmText: "Delete",
    confirmButtonStyle: "danger"
  });
}


