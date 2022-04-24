export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeInitials(name) {
    const names = name.split(' ');
    const initials = names.map(n => capitalizeFirst(n));
    return initials.join(' ');
}

export function initials(name) {
    const names = name.split(' ');
    const initials = names.map(n => `${capitalizeFirst(n.charAt(0))}.`);
    return initials
}