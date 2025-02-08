import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

const Accordion = ({ children, title }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w-full p-2 border-b">
                <div onClick={() => setOpen(!open)} className="flex items-center justify-between w-full cursor-pointer">
                    <div className="text-base font-medium capitalize">{title}</div>
                    <div className="text-base">
                        {open ? (
                            <span>
                                <ChevronUpIcon className="w-6 h-6 text-slate-500" />
                            </span>
                        ) : (
                            <span>
                                <ChevronDownIcon className="w-6 h-6 text-slate-500" />
                            </span>
                        )}
                    </div>
                </div>
                {open && children}
            </div>
        </>
    );
};
export default Accordion;