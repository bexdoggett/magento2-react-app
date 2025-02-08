import { XMarkIcon } from "@heroicons/react/24/solid";

const SelectedList = ({ removeFilter, resetFilter, selectedFilters }) => {
    return (
        <div className="flex flex-col px-2">
            <p className="hidden pb-5 text-base font-medium lg:flex">Now Shopping by</p>
            <ul>
                {Object.entries(SelectedFIlters).map(([attributeCode, options]) => (
                    <li key={attributeCode} className="flex items-center text-sm gap-0.5">
                        <button onClick={() => options.forEach((option) => 
                            removeFilter(attributeCode, option))} >
                            <XMarkIcon className="w-6 h-6 text-slate-500" />
                        </button>
                        <span className="font-semibold cursor-pointer">  
                            {attributeCode.replace("_","")}
                        </span>:{" "}
                        {options.length > 1 ? options[1] : options[0].replace("_", " - ")}{" "}
                    </li>
                ))}
                <li className="mt-5 text-sm cursor-pointer mb-7 text-blue-500"
                    onClick={resetFilter}>
                        Clear All
                </li>
            </ul>
        </div>
    );
};
export default SelectedList;