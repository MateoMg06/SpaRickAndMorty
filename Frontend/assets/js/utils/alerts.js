import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import "../../css/alerts.css"

const toastConfig = {
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    customClass: {
        popup: "rm-toast",
        title: "rm-toast-title",
        timerProgressBar: "rm-toast-progress"
    },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
    }
}


export function alertaExitosa(mensaje) {
    Swal.mixin({
        ...toastConfig,
        timer: 3000,
    }).fire({
        icon: "success",
        title: mensaje
    })
}

export function alertaError(mensaje) {
    Swal.mixin({
        ...toastConfig,
        timer: 4000,
    }).fire({
        icon: "error",
        title: mensaje
    })
}

export async function alertaConfirmacion(titulo = '¿Estás seguro?', texto = 'No podrás revertir esta acción') {
    const result = await Swal.fire({
        title: titulo,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        background: '#020f10',
        color: '#f1fff4',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
            popup: 'rm-alert',
            title: 'rm-alert-title',
            htmlContainer: 'rm-alert-text',
            icon: 'rm-alert-icon',
            actions: 'rm-alert-actions',
            confirmButton: 'rm-alert-confirm',
            cancelButton: 'rm-alert-cancel'
        }
    })
    return result.isConfirmed
}
