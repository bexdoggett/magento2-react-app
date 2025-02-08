import React, {useEffect, useState} from "react";
import Product from "./Product";
import SidebarFilter from "./filters/SidebarFilter";
import SelectedList from "./filters/SelectedFilter";
import Accordion from "./filters/Accordion";
import Pagination from "./Pagination";

import { GET_PRODUCT_COLLECTION } from "../../graphql/product_collection";
import { fetchGraphQl } from "../../FetchGraphQlHandler";

import { ArrowDownIcon, ArrowUpIcon, XMarkIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

export default function Category() {
    const [product, setProduct] = useState();
    const [data, setData] = useState({});
    const [productView, setProductView] = useState("grid");
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(data?.products?.sort_fields.default);
    const [sort, setSort] = useState({});
    const [order, setOrder] = useState("DESC");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [openSideBar, setSideBar] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(data?.products?.applied_filters || []);
    
    const fetchProduct = async () => {
        fetchGraphQl(GET_PRODUCT_COLLECTION, {
            filter,
            sort,
            currentPage,
            page_size: parseInt(pageSize)
        })
        .then((res) => {
            setData(res);
            const fetchedProduct = res.products.items || null;
            setProduct(fetchedProduct);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.error("Error fetchin category data:", error.message);
        });
    };

    const ascendDescend = () => {
        if (order === "DESC") {
            setOrder("ASC");
        } else {
            setOrder("DESC");
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
    };

    useEffect(() => {
        if (openSideBar) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup to rmeove class on unmount
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [openSideBar]);

    useEffect(() => {
        fetchProduct();
    }, [filter, sort, order, currentPage, pageSize]);

    useEffect(() => {
        if (selectedOption) {
            setSort({ [selectedOption]: order });
        }
    }, [order, selectedOption]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>No product found.</div>
    }

    const removeFilter = (attributeCode) => {
        setSelectedFilters((prev) => {
            const { [attributeCode]: _, ...rest } = prev; // Remove the specified attribute
            return rest;
        });

        setFilter((prev) => {
            const updatedFilter = { ...prev};
            delete updatedFilter[attributeCode]; // Remove the attribute if its empty
            return updatedFilter;
        });
    };

    const resetFilter = () => {
        setFilter({});
        setSelectedFilters([])
    };

    return (
        <>
            <div className={`fixed inset-y-0 lg:hidden right-0 z-10 bg-white w-[99vw] transform
                ${ openSideBar ? "translate-x-0" : "translate-x-full" }
            transition-transform overflow-y-auto duration-300 pt-5 ease-in-out`}
            >
                <SidebarFilter
                selectedFilters={selectedFilters}
                resetFilter={resetFilter}
                removeFilter={removeFilter}
                aggregations={data?.products?.aggregations}
                setFilter={setFilter}
                setSelectedFilters={setSelectedFilters}
                />
                <button onClick={() => setSideBar(false)} className="absolute right-0 p-2 rounded top-7">
                    <XMarkIcon className="w-6 h-6 text-slate-500" />
                </button>
            </div>
            <div className="pb-10">
                <div className="container grid w-full px-4 mx-auto">
                    <div className="grid lg:gap-5 lg:grid-cols-4">
                        <div className="hidden lg:flex lg:flex-col lg:col-span-1">
                            <SidebarFilter
                                selectedFilters={selectedFilters}
                                resetFilter={resetFilter}
                                removeFilter={removeFilter}
                                aggregations={data?.products?.aggregations}
                                setFilter={setFilter}
                                setSelectedFilters={setSelectedFilters}
                            />
                        </div>
                        <div className="flex flex-col lg:col-span-3">
                            <div className="flex justify-between px-2 mt-6 md:px-4">
                                <div className="items-center hidden gap-2 lg:flex">
                                    <div className="flex w-[70px] border border-black">
                                        <div
                                        onClick={() => setProductView("grid")}
                                        className=" rounded-l-sm border-r border-0 hover:bg-gray-300 cursor-pointer border-x-gray-400 w-10 p-2 px-2  shadow shadow-gray-300/80 bg-[#efefef] text-gray-600"
                                        >
                                            <GridView />
                                        </div>
                                        <div
                                        className="rounded-r-sm w-10 border-0 p-2 px-2 shadow cursor-pointer hover:bg-gray-300 shadow-gray-300/80 bg-[#efefef] text-gray-600
                    "
                                        onClick={() => setProductView("list")}
                                        >
                                            <ListView />
                                        </div>
                                    </div>
                                    <p className="text-xs">{data?.products?.total_count} items</p>
                                </div>
                                <button
                                className="flex px-4 py-1 text-sm border border-black lg:hidden bg-neutral-100 max-w-fit"
                                onClick={() => setSideBar(true)}
                                >
                                    Filters
                                </button>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        className="outline-none py-[6px] text-sm border-black bg-gray-50 placeholder:text-gray-600 placeholder:px-2 border text-gray-900 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-1 px-2 rounded-sm dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-[0_0_3px_1px_#00699d]"
                                    >
                                        <option disabled>{data?.products?.sort_fields.default}</option>
                                        {data?.products?.sort_fields.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                        ))}
                                    </select>
                                    <button onClick={asscendDescend}>
                                        {order === "DESC" ? (
                                        <ArrowDownIcon className="w-5 h-5 stroke-2 stroke-slate-500" />
                                        ) : (
                                        <ArrowUpIcon className="w-5 h-5 stroke-2 stroke-slate-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-5 lg:hidden">
                                {Object.entries(filter)?.length > 0 && (
                                <div className="border-t">
                                    <Accordion title={`Now Shopping by : (${Object.entries(filter)?.length})`}>
                                    <div className="pt-3 -ml-3">
                                        <SelectedList
                                        removeFilter={removeFilter}
                                        resetFilter={resetFilter}
                                        selectedFilters={selectedFilters}
                                        />
                                    </div>
                                    </Accordion>
                                </div>
                                )}
                                <p className="mx-2 my-4 text-xs">{data?.products?.total_count} items</p>
                            </div>
                            {/*  */}
                            <div
                                className={`gap-4 ${
                                productView !== "grid" ? "flex flex-col" : "grid-cols-2 md:grid-cols-3 grid lg:grid-cols-4"
                                }`}
                            >
                                {product?.map((i, index) => (
                                <Product productView={productView} key={index} product={i} />
                                ))}
                            </div>
                            <Pagination
                                data={data}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setPageSize={setPageSize}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}