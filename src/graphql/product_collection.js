export const GET_PRODUCT_COLLECTION = `
    query(
        $filter: ProductAttributeFilterInput
        $pageSize: Int = 24
        $currentPage: Int = 1
        $sort: ProductAttributeSortInput
    ) {
        products(
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
            sort: $sort
        ) {
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
            aggregations {
                attribute_Code
                label
                count
                options {
                    count
                    label
                    value
                }
            }
            items {
                uid
                name
                sku
                url_key
                small_image {
                    url
                    label
                }
                price_range {
                    maximum_price {
                        final_price {
                            currency
                            value
                        }
                    }
                }
            }
            suggestions {
                search
            }
        }
    }
`;