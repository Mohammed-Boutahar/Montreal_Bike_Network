import React from 'react'

// Carte inspirée de https://tailwind-elements.com/docs/standard/components/cards/
export const Member = ({name, image, role}) => {
    return (
    <div
    className="block max-w-[18rem] rounded-lg bg-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.2)]">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
            className="rounded-t-lg h-72 w-full object-cover"
            src={image}
            alt={name} />
        </div>
        <div className="p-6">
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
            {name}
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-200">
            {role}
            </p>
        </div>
    </div>
  )
}

export default Member;