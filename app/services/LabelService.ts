export const initializeLabels = () => {
    const defaultLabels = ['urgent', 'low priority'];

    if (typeof window !== 'undefined') {
        const savedLabels = localStorage.getItem('labels');
        if (!savedLabels) {
            localStorage.setItem('labels', JSON.stringify(defaultLabels));
        }
    }
};

export const loadLabels = () => {
    if (typeof window !== 'undefined') {
        const savedLabels = localStorage.getItem('labels');
        return savedLabels ? JSON.parse(savedLabels) : [];
    }
    return [];
};

export const saveLabels = (labels: string[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('labels', JSON.stringify(labels));
    }
};
