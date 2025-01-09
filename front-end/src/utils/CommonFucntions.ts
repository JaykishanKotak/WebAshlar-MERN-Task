import Swal from 'sweetalert2'

export const confirmMessagePopUp = (
  message: string,
  callback: () => void
): void => {
  Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      callback()
    }
  })
}
