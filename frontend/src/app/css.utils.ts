
declare var $: any

export function openModal(name: string) {
    var name = '#' + name
    $(name).modal({
        keyboard: false,
        backdrop: 'static'
    })
    $(name).modal('show')
}

export function closeModal(name: string) {
    var name = '#' + name
    $(name).modal('hide')
}

