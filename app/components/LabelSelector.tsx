"use client";
import { useEffect, useState } from 'react';
import { initializeLabels, loadLabels, saveLabels } from '../services/LabelService';

const LabelSelector = ({ onSelect }) => {
    const [search, setSearch] = useState('');
    const [availableLabels, setAvailableLabels] = useState<string[]>([]);

    useEffect(() => {
        // Initialize default labels if they don't exist
        initializeLabels();
        setAvailableLabels(loadLabels());
    }, []);

    const filteredLabels = availableLabels.filter(label =>
        label.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddLabel = () => {
        const newLabel = prompt('Enter new label');
        if (newLabel) {
            const updatedLabels = [...availableLabels, newLabel];
            setAvailableLabels(updatedLabels);
            saveLabels(updatedLabels);
        }
    };

    return (
        <div className='labels'>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search labels"
            />
            <ul>
                {filteredLabels.map(label => (
                    <li key={label}>
                        <input
                            type="checkbox"
                            onChange={() => onSelect(label)}
                        />
                        {label}
                    </li>
                ))}
                <li>
                    <button onClick={handleAddLabel}>
                        Create New Label
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default LabelSelector;
