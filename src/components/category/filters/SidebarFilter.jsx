import Accordion from "../filters/Accordion";
import SelectedList from "../filters/SelectedFilter";

export default function SidebarFilter({
    aggregations,
    setFilter,
    setSelectedFilters,
    selectedFilters,
    resetFilter,
    removeFilter
}) {
    const handleFilterChange = (attributeCode, value, label) => {
        if (attributeCode) {
            setSelectedFilters((prev) => {
                const currentSelections = prev[attributeCode] || [];
                const isSelected = currentSelections.includes(value);

                // Update the selected filters for checkboxes
                const newSelections = attributeCode === "price"
                    ? [value] // Only one selection for price
                    : isSelected
                    ? currentSelections.filter((v) => v !== value) // Remove if already selected
                    : [...currentSelections, value, label]; // Add if not selected

                return {
                    ...prev,
                    [attributeCode]: newSelections,
                };
            });
            // Update the filter state
            setFilter((prev) => ({
                ...prev,
                [attributeCode]:
                    attributeCode === "price" ? { from: value.split("_")?.[0], to: value?.split("_")?.[1] } : { eq: value }, // Use 'in' for selected price range
            }));
        }
    };

    return (
        <div>
            {Object.entries(selectedFilters)?.length > 0 && (
                <div className="hidden lg:flex">
                    <SelectedList removeFilter={removeFilter} 
                                  resetFilter={resetFilter}
                                  selectedFilters={selectedFilters}
                                  />
                </div>
            )}
            <p className="flex p-2 text-2xl font-light border-b lg:text-base lg:font-medium">
                Filters
            </p>
            {aggregations?.map((aggregations, index) => (
                <Accordion key={index} title={aggregations.label}>
                    <div className="flex flex-col gap-2 p-2">
                        {aggregations.options.map((option) => (
                            <div key={option.value}>
                                <label className="text-sm cursor-pointer">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        value={option.value}
                                        checked={selectedFilters.price === option.value} // one price selection
                                        onChange={() => handleFilterChange(
                                            aggregations.attribute_code,
                                            option.value,
                                            option?.label
                                        )}
                                    />
                                    <span dangerouslySetInnerHTML={{__html: option?.label}}></span>({option.count})
                                </label>
                            </div>
                        ))}
                    </div>
                </Accordion>
            ))}
        </div>
    )
}