import React, { useContext } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { formcontext } from "../Context/CreateContext";

// Sortable item component
function SortableItem({ id, field }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
    const { setSelectedFieldId } = useContext(formcontext);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
    };

    // Select field on click to update context
    const handleSelect = () => {
        console.log("Selected field:", field.id);
        setSelectedFieldId(field.id);
    };

    // Handle select change with alert (optional)
    const handleSelectChange = (e) => {
        alert(`You selected: ${e.target.value} in "${field.label}"`);
    };

    return ( <
        div ref = { setNodeRef }
        style = { style } {...attributes } {...listeners }
        className = "p-4 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-800 mb-4"
        onClick = { handleSelect } // added click handler here
        >
        <
        label className = "block font-medium text-gray-700 dark:text-gray-200 mb-2" > { field.label } {
            field.required && < span className = "text-red-500" > * < /span>} < /
                label >

                {
                    (field.type === "text" ||
                        field.type === "email" ||
                        field.type === "tel" ||
                        field.type === "password") && ( <
                        input type = { field.type }
                        placeholder = { field.placeholder }
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        disabled /
                        >
                    )
                }

            {
                field.type === "textarea" && ( <
                    textarea placeholder = { field.placeholder }
                    className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled /
                    >
                )
            }

            {
                field.type === "select" && ( <
                        select className = "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        defaultValue = ""
                        onChange = { handleSelectChange }
                        disabled >
                        <
                        option value = ""
                        disabled >
                        Select an option <
                        /option> {
                        field.options &&
                        field.options.map((option) => ( <
                            option key = { option.value }
                            value = { option.value } > { option.label } <
                            /option>
                        ))
                    } <
                    /select>
            )
        }

        {
            field.type === "checkbox" && < input type = "checkbox"
            className = "h-4 w-4"
            disabled / >
        }

        {
            field.type === "radio" && ( <
                input type = "radio"
                name = "radioGroup"
                className = "h-4 w-4"
                disabled / >
            )
        }

        {
            field.type === "date" && ( <
                input type = "date"
                className = "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                disabled /
                >
            )
        } <
        /div>
    );
}

const DragAndDrop = () => {
    const { fields, setFields } = useContext(formcontext);

    // Sensors for pointer events
    const sensors = useSensors(useSensor(PointerSensor));

    // Handle drag end to reorder fields
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);

            const newItems = arrayMove(fields, oldIndex, newIndex);
            setFields(newItems);

            alert(`Moved "${fields[oldIndex].label}" to position ${newIndex + 1}`);
        }
    };

    return ( <
        DndContext sensors = { sensors }
        collisionDetection = { closestCenter }
        onDragEnd = { handleDragEnd } >
        <
        SortableContext items = { fields.map((f) => f.id) }
        strategy = { verticalListSortingStrategy } > {
            fields.map((field) => ( <
                SortableItem key = { field.id }
                id = { field.id }
                field = { field }
                />
            ))
        } <
        /SortableContext> < /
        DndContext >
    );
};

export default DragAndDrop;