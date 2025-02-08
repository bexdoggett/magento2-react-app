import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Pagination({ data, currentPage, setCurrentPage, setPageSize, pageSize}) {
    const productCounts = Array.from(
        { length: Math.floor(data?.products?.total_count / 24) + 1},
        (_, index) => index * 12
    );

    const handleChangePageSize = (event) => {
        const value = event.target.value;
        setPageSize(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        // Determine the range of pages to display
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(data?.products?.page_info?.total_pages, startPage + maxVisiblePages - 1);

        // Adjust start page if there are not enough pages before
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Build the array of page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        data?.products?.page_info?.total_pages > 1 && (
            <div className="flex items-center justify-between w-full">
                <div className="flex justify-center space-x-2">
                    {/* Previous button */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="p-2 text-black bg-grey-200 rounded"
                        >
                            <ChevronDownIcon className="w-6 h-6 rotate-90 text-slate-400" />
                        </button>
                    )}
                    
                    {/* Page Links */}
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`p-1 rounded text-center text-xs ${
                                currentPage === page ? "bg-neutral-300 text-black" : "text-blue-200"
                            }`}
                            >
                            {page}
                        </button>
                    ))}

                    {/* Next button */}
                    {currentPage < data?.products?.page_info?.total_pages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="p-2 text-black bg-grey-200 rounded"
                        >
                            <ChevronDownIcon className="w-6 h-6 rotate-90 text-slate-400" />
                        </button>
                    )}
                </div>
            </div>
        )
    );
}