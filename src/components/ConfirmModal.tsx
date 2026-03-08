import '../styles/ConfirmModal.css'

type Props = {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}
export default function ConfirmModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className='delete-modal-header'>Delete Todo</h3>
        <p className='delete-modal-subheader'>Are you sure you want to delete this todo?</p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div >
      </div >
    </div >
  )
}