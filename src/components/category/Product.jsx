import { ChartBarIcon, HeartIcon } from "@heroicons/react/24/solid";

const Product = ({ product, productView }) => {
    const priceData = product?.price_range?.maximum_price?.final_price;
    const currency = "USD";
    const value = priceData?.value;
    const price = value?.toLocaleString("en-US", {
        style: "currency",
        currency,
    });
    const listType = productView !== "grid";

    return (
        <div className="group">
            <div className={`relative flex ${listType ? "flex-row" : "flex-col"} w-full overflow-hidden bg-white rounded-lg`}>
                <div className="relative grid object-cover mx-3 mt-3 overflow-hidden aspect-square h-60 rounded-xl">
                    <img className="object-cover aspect-square"
                         src={product.small_image?.url}
                         alt={product.name}
                    />
                </div>
                <div className="px-5 pb-5 mt-4">
                    <p className="text-xl tracking-tight text-slate-900">
                        {" "}
                        <span dangerouslySetInnerHTML={{ __html: product?.name }}></span>
                    </p>
                    <div className="flex items-center justify-between mt-2 mb-5">
                        <p>
                            <span className="font-bold text-md text-slate-800">{price}</span>
                        </p>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Product;